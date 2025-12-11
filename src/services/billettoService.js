/**
 * Billetto API Service
 * Handles all API interactions with Billetto platform
 */

// Billetto API uses billetto.se (not api.billetto.com) and requires organizer ID in the path
const API_BASE_URL = 'https://billetto.se/api/v3';
const API_KEY = import.meta.env.VITE_BILLETTO_API_KEY;
const API_SECRET = import.meta.env.VITE_BILLETTO_CLIENT_SECRET;
const ORGANIZER_ID = import.meta.env.VITE_BILLETTO_ORGANIZER_ID || '4429536'; // Default from example

// CORS Proxy - using Heroku cors-anywhere or similar
// Alternative: Use your own PHP proxy on your server
const CORS_PROXY = import.meta.env.VITE_CORS_PROXY || 'https://cors-anywhere.herokuapp.com/';

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
let eventsCache = null;
let cacheTimestamp = null;

/**
 * Make authenticated request to Billetto API through CORS proxy
 */
async function makeRequest(endpoint, options = {}) {
    // Construct the full URL with proxy
    const targetUrl = `${API_BASE_URL}${endpoint}`;
    const proxiedUrl = `${CORS_PROXY}${targetUrl}`;

    // Billetto uses Api-Keypair header with format "keyId:secretKey"
    const keypair = `${API_KEY}:${API_SECRET}`;

    const headers = {
        'accept': 'application/json',
        'Api-Keypair': keypair,
        'X-Requested-With': 'XMLHttpRequest', // Required by some CORS proxies
        ...options.headers,
    };

    try {
        console.log(`Making request to: ${endpoint}`);
        const response = await fetch(proxiedUrl, {
            ...options,
            headers,
        });

        if (!response.ok) {
            throw new Error(`Billetto API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Billetto API request failed:', error);
        throw error;
    }
}

/**
 * Fetch past/completed events from Billetto API
 * @returns {Promise<Array>} Array of past events
 */
export async function fetchPastEvents() {
    // Check cache first
    if (eventsCache && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION)) {
        console.log('Returning cached past events');
        return eventsCache;
    }

    try {
        console.log('Fetching past events from Billetto API...');
        // Fetch completed events from organiser endpoint
        const data = await makeRequest('/organiser/events?state=completed&starts_after=2021-02-10T23%3A00%3A00.000Z', {
            method: 'GET',
        });

        console.log('Billetto API raw response (past events):');
        console.log(JSON.stringify(data, null, 2));
        console.log('Type:', typeof data);
        console.log('Keys:', Object.keys(data));

        // Public events endpoint returns: {object: "list", data: [...], has_more: bool, total: number}
        // Extract the events array from the data property
        eventsCache = data?.data || [];
        cacheTimestamp = Date.now();

        console.log(`Successfully loaded ${eventsCache.length} past events from Billetto`);
        return eventsCache;
    } catch (error) {
        console.error('Failed to fetch past events from Billetto:', error);

        // Return null on failure - component will use fallback
        return null;
    }
}

/**
 * Fetch upcoming/active events from Billetto API
 * @returns {Promise<Array>} Array of upcoming events
 */
export async function fetchUpcomingEvents() {
    try {
        console.log('Fetching upcoming events from Billetto API...');
        // Fetch active/upcoming public events
        const data = await makeRequest('/organiser/events?state=active', {
            method: 'GET',
        });

        console.log('Billetto API response (upcoming events):');
        console.log(`Loaded ${data?.data?.length || 0} upcoming events`);

        // Extract the events array from the data property
        return data?.data || [];
    } catch (error) {
        console.error('Failed to fetch upcoming events from Billetto:', error);
        return null;
    }
}

/**
 * Fetch all events (both past and upcoming) - for backward compatibility
 * @returns {Promise<Array>} Array of all events
 */
export async function fetchBillettoEvents() {
    try {
        const [pastEvents, upcomingEvents] = await Promise.all([
            fetchPastEvents(),
            fetchUpcomingEvents()
        ]);

        // Return upcoming first, then past
        return [...(upcomingEvents || []), ...(pastEvents || [])];
    } catch (error) {
        console.error('Failed to fetch events:', error);
        return null;
    }
}

/**
 * Fetch a single event by ID
 * @param {string} eventId - Billetto event ID
 * @returns {Promise<Object>} Event details
 */
export async function fetchBillettoEventById(eventId) {
    try {
        // Use public events endpoint to fetch individual event
        const data = await makeRequest(`/public/events/${eventId}`, {
            method: 'GET',
        });

        return data?.data || data;
    } catch (error) {
        console.error(`Failed to fetch event ${eventId} from Billetto:`, error);
        return null;
    }
}

/**
 * Get ticket widget URL for an event
 * @param {string} eventId - Billetto event ID
 * @returns {string} Widget URL
 */
export function getBillettoWidgetUrl(eventId) {
    return `https://billetto.com/en/events/${eventId}`;
}

/**
 * Clear the events cache (useful for manual refresh)
 */
export function clearCache() {
    eventsCache = null;
    cacheTimestamp = null;
}

/**
 * Check if API credentials are configured
 */
export function isConfigured() {
    return !!(API_KEY && API_SECRET && ORGANIZER_ID);
}

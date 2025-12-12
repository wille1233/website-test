import { fetchBillettoEvents, fetchPastEvents, fetchUpcomingEvents, fetchBillettoEventById, isConfigured } from '../services/billettoService';
import { mapBillettoEvents, filterActiveEvents } from '../utils/eventMapper';

// Static fallback events (used if API fails or is not configured)
const staticEvents = [];

/**
 * Fetch events from Billetto API
 * @returns {Promise<Array>} Array of events
 */
export async function getEvents() {
    // If API is not configured, return empty
    if (!isConfigured()) {
        console.log('Billetto API not configured');
        return [];
    }

    try {
        // Try to fetch from Billetto API
        const billettoEvents = await fetchBillettoEvents();

        if (billettoEvents && billettoEvents.length > 0) {
            // Map and filter active events
            const mappedEvents = mapBillettoEvents(billettoEvents);
            const activeEvents = filterActiveEvents(mappedEvents);

            console.log(`Loaded ${activeEvents.length} events from Billetto API`);
            return activeEvents;
        }

        // If no events returned
        console.log('No events from Billetto API');
        return [];
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
}

/**
 * Get upcoming/active events from API
 * @returns {Promise<Array>} Array of upcoming events
 */
export async function getUpcomingEvents() {
    if (!isConfigured()) {
        console.log('Billetto API not configured');
        return [];
    }

    try {
        const billettoEvents = await fetchUpcomingEvents();

        if (billettoEvents && billettoEvents.length > 0) {
            const mappedEvents = mapBillettoEvents(billettoEvents);
            console.log(`Loaded ${mappedEvents.length} upcoming events from Billetto API`);
            return mappedEvents;
        }

        console.log('No upcoming events from Billetto API');
        return [];
    } catch (error) {
        console.error('Error fetching upcoming events:', error);
        return [];
    }
}

/**
 * Get past/completed events from API
 * @returns {Promise<Array>} Array of past events
 */
export async function getPastEvents() {
    if (!isConfigured()) {
        console.log('Billetto API not configured');
        return [];
    }

    try {
        const billettoEvents = await fetchPastEvents();

        if (billettoEvents && billettoEvents.length > 0) {
            const mappedEvents = mapBillettoEvents(billettoEvents);
            console.log(`Loaded ${mappedEvents.length} past events from Billetto API`);
            return mappedEvents;
        }

        console.log('No past events from Billetto API');
        return [];
    } catch (error) {
        console.error('Error fetching past events:', error);
        return [];
    }
}

/**
 * Get event by ID (checks both API and static data)
 * @param {string} id - Event ID
 * @returns {Promise<Object|null>} Event object or null
 */
export async function getEventById(id) {
    // First try to get from API
    if (isConfigured()) {
        try {
            const billettoEvent = await fetchBillettoEventById(id);
            if (billettoEvent) {
                return mapBillettoEvents([billettoEvent])[0];
            }
        } catch (error) {
            console.error('Error fetching event by ID:', error);
        }
    }

    // Fall back to static events
    return staticEvents.find(event => event.id === id) || null;
}

// Export static events for backward compatibility
export const events = staticEvents;

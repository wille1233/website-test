import { fetchBillettoEvents, fetchPastEvents, fetchUpcomingEvents, fetchBillettoEventById, isConfigured } from '../services/billettoService';
import { mapBillettoEvents, filterActiveEvents } from '../utils/eventMapper';

// Static fallback events (used if API fails or is not configured)
const staticEvents = [
    {
        id: 'techno-bunker',
        title: "Techno Bunker",
        date: "Nov 29, 2025",
        time: "23:00 - 06:00",
        price: "300 SEK",
        location: "Secret Location",
        address: "Revealed 24h before event",
        city: "Stockholm",
        image: "https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2079&auto=format&fit=crop",
        description: "Deep underground techno experience in an industrial bunker. Raw sound, raw energy.",
        venue: {
            name: "The Bunker",
            capacity: "500",
            facilities: ["Bar", "Cloakroom", "Smoking Area"],
            accessibility: "18+ only, ID required"
        },
        lineup: [
            { name: "DJ Obscura", link: "https://soundcloud.com/djobscura" },
            { name: "Techno Militia", link: "https://soundcloud.com/technomilitia" },
            { name: "Bass Architect", link: "https://soundcloud.com/bassarchitect" },
            { name: "Dark Matter", link: "https://soundcloud.com/darkmatter" }
        ],
        ticketLink: "#"
    },
    {
        id: 'deep-space',
        title: "Deep Space",
        date: "Dec 12, 2025",
        time: "22:00 - 05:00",
        price: "350 SEK",
        location: "Warehouse District",
        address: "Revealed 48h before event",
        city: "Stockholm",
        image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=2076&auto=format&fit=crop",
        description: "Journey through cosmic soundscapes. Ambient, deep house, and progressive techno.",
        venue: {
            name: "Warehouse 7",
            capacity: "800",
            facilities: ["Bar", "Cloakroom", "Outdoor Area", "Food Trucks"],
            accessibility: "20+ only, ID required"
        },
        lineup: [
            { name: "Stellar Drift", link: "https://soundcloud.com/stellardrift" },
            { name: "Cosmic Ray", link: "https://soundcloud.com/cosmicray" },
            { name: "Nebula Sound", link: "https://soundcloud.com/nebulasound" },
            { name: "Void Walker", link: "https://soundcloud.com/voidwalker" },
            { name: "Astral Plane", link: "https://soundcloud.com/astralplane" }
        ],
        ticketLink: "#"
    },
    {
        id: 'new-years-eve',
        title: "New Year's Eve",
        date: "Dec 31, 2025",
        time: "23:00 - 08:00",
        price: "500 SEK",
        location: "The Vault",
        address: "Revealed 72h before event",
        city: "Stockholm",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
        description: "Ring in the new year with the best underground electronic music. Multiple rooms, multiple vibes.",
        venue: {
            name: "The Vault",
            capacity: "1200",
            facilities: ["Multiple Bars", "Cloakroom", "VIP Area", "Food Court", "Chill Zone"],
            accessibility: "21+ only, ID required, Dress code: Dark & Stylish"
        },
        lineup: [
            { name: "Midnight Ritual", link: "https://soundcloud.com/midnightritual" },
            { name: "New Dawn", link: "https://soundcloud.com/newdawn" },
            { name: "Time Keeper", link: "https://soundcloud.com/timekeeper" },
            { name: "Echo Chamber", link: "https://soundcloud.com/echochamber" },
            { name: "Future Past", link: "https://soundcloud.com/futurepast" },
            { name: "Frequency Shift", link: "https://soundcloud.com/frequencyshift" }
        ],
        ticketLink: "#"
    }
];

/**
 * Fetch events from Billetto API with fallback to static data
 * @returns {Promise<Array>} Array of events
 */
export async function getEvents() {
    // If API is not configured, return static events
    if (!isConfigured()) {
        console.log('Billetto API not configured, using static events');
        return staticEvents;
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

        // If no events returned, fall back to static
        console.log('No events from Billetto API, using static events');
        return staticEvents;
    } catch (error) {
        console.error('Error fetching events:', error);
        // Fall back to static events on error
        return staticEvents;
    }
}

/**
 * Get upcoming/active events from API
 * @returns {Promise<Array>} Array of upcoming events
 */
export async function getUpcomingEvents() {
    if (!isConfigured()) {
        console.log('Billetto API not configured, using static events');
        return staticEvents;
    }

    try {
        const billettoEvents = await fetchUpcomingEvents();

        if (billettoEvents && billettoEvents.length > 0) {
            const mappedEvents = mapBillettoEvents(billettoEvents);
            console.log(`Loaded ${mappedEvents.length} upcoming events from Billetto API`);
            return mappedEvents;
        }

        console.log('No upcoming events from Billetto API, using static events');
        return staticEvents;
    } catch (error) {
        console.error('Error fetching upcoming events:', error);
        return staticEvents;
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

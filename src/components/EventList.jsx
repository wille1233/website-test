import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getUpcomingEvents, getPastEvents } from '../data/events';


const EventList = () => {
    const [hoveredId, setHoveredId] = useState(null);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const isMobile = window.innerWidth <= 768; // Simple check, ideally use a hook

    // Fetch events on component mount
    useEffect(() => {
        async function loadEvents() {
            setLoading(true);
            try {
                const [upcoming, past] = await Promise.all([
                    getUpcomingEvents(),
                    getPastEvents()
                ]);
                setUpcomingEvents(upcoming);
                setPastEvents(past);
            } catch (error) {
                console.error('Error loading events:', error);
                setUpcomingEvents([]);
                setPastEvents([]);
            } finally {
                setLoading(false);
            }
        }

        loadEvents();
    }, []);

    // Show loading state
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px',
                color: 'var(--text-muted)'
            }}>
                <div style={{
                    textAlign: 'center',
                    fontFamily: 'var(--font-primary)'
                }}>
                    <div style={{
                        fontSize: '1.2rem',
                        marginBottom: '1rem'
                    }}>
                        Loading events...
                    </div>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '3px solid rgba(255, 107, 53, 0.2)',
                        borderTop: '3px solid var(--accent-color)',
                        borderRadius: '50%',
                        margin: '0 auto',
                        animation: 'spin 1s linear infinite'
                    }} />
                </div>
            </div>
        );
    }

    // Show message if no events at all
    if (!upcomingEvents || upcomingEvents.length === 0 && !pastEvents || pastEvents.length === 0) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                color: 'var(--text-muted)'
            }}>
                <p style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '1.2rem'
                }}>
                    No events available at the moment. Check back soon!
                </p>
            </div>
        );
    }

    return (
        <div style={{ position: 'relative' }}>
            {/* Background Image Display (Desktop Only) */}
            <div className="event-bg-display" style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: '50vw',
                height: '100vh',
                zIndex: -1,
                opacity: hoveredId ? 0.3 : 0,
                transition: 'opacity 0.6s ease',
                pointerEvents: 'none'
            }}>
                {[...upcomingEvents, ...pastEvents].map(event => (
                    <motion.div
                        key={event.id}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: hoveredId === event.id ? 1 : 0,
                            transition: 'opacity 0.4s ease',
                            clipPath: 'polygon(20% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%, 0% 20%)'
                        }}
                    >
                        <img
                            src={event.image}
                            alt={event.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                filter: 'grayscale(50%) brightness(0.7)'
                            }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Upcoming Events Section */}
            {upcomingEvents && upcomingEvents.length > 0 && (
                <div style={{ marginBottom: '4rem' }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        marginBottom: '2rem',
                        color: 'var(--accent-color)',
                        fontFamily: 'var(--font-heading)',
                        textTransform: 'uppercase',
                        letterSpacing: '2px'
                    }}>
                        Upcoming Events
                    </h2>

                    <div className="event-container" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        {upcomingEvents.map((event, index) => renderEventCard(event, index))}
                    </div>
                </div>
            )}

            {/* Past Events Section */}
            {pastEvents && pastEvents.length > 0 && (
                <div>
                    <h2 style={{
                        fontSize: '2.5rem',
                        marginBottom: '2rem',
                        marginTop: '4rem',
                        color: 'rgba(0, 0, 0, 0.6)',
                        fontFamily: 'var(--font-heading)',
                        textTransform: 'uppercase',
                        letterSpacing: '2px'
                    }}>
                        Past Events
                    </h2>

                    <div className="event-container" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        {pastEvents.map((event, index) => renderEventCard(event, index))}
                    </div>
                </div>
            )}
        </div>
    );

    // Helper function to render event cards
    function renderEventCard(event, index) {
        return (
            <Link
                key={event.id}
                to={`/event/${event.id}`}
                style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block',
                    height: '100%'
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    onMouseEnter={() => setHoveredId(event.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="event-card"
                    style={{
                        padding: '2rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(10px)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        height: '100%', // Ensure card fills the Link/Grid cell
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        ...(hoveredId === event.id && {
                            transform: 'scale(1.02)',
                            borderColor: 'var(--accent-color)',
                            background: 'rgba(255, 107, 53, 0.05)'
                        })
                    }}
                >
                    {/* Event Image */}
                    <div style={{
                        width: '100%',
                        aspectRatio: '3/4', // Poster aspect ratio
                        borderRadius: '8px',
                        overflow: 'hidden',
                        marginBottom: '1rem',
                        backgroundColor: 'rgba(0,0,0,0.2)'
                    }}>
                        <img
                            src={event.image}
                            alt={event.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                filter: hoveredId === event.id ? 'brightness(1.1)' : 'brightness(0.9)',
                                transition: 'filter 0.3s ease'
                            }}
                        />
                    </div>

                    {/* Event Title */}
                    <h3 style={{
                        fontSize: '1.5rem',
                        margin: 0,
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-heading)'
                    }}>
                        {event.title}
                    </h3>

                    {/* Event Details - Date, Time, Location */}
                    <div style={{
                        marginTop: 'auto', // Push details to bottom to align with other cards
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        color: 'var(--text-muted)',
                        fontFamily: 'var(--font-primary)'
                    }}>
                        {event.date && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontWeight: 'bold', color: 'var(--accent-color)' }}>Date:</span>
                                <span>{event.date}</span>
                            </div>
                        )}
                        {event.time && event.time !== 'Time TBA' && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontWeight: 'bold', color: 'var(--accent-color)' }}>Time:</span>
                                <span>{event.time}</span>
                            </div>
                        )}
                        {event.location && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontWeight: 'bold', color: 'var(--accent-color)' }}>Location:</span>
                                <span>{event.location}</span>
                            </div>
                        )}
                    </div>

                    {/* Event Price */}
                    <div style={{
                        paddingTop: '1rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        color: 'var(--accent-color)'
                    }}>
                        {event.price}
                    </div>
                </motion.div>
            </Link>
        );
    }
};

export default EventList;


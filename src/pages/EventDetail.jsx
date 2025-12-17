import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getEventById } from '../data/events';

const EventDetail = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadEvent() {
            setLoading(true);
            try {
                const fetchedEvent = await getEventById(eventId);
                setEvent(fetchedEvent);
            } catch (error) {
                console.error('Error loading event:', error);
                setEvent(null);
            } finally {
                setLoading(false);
            }
        }

        loadEvent();
    }, [eventId]);

    if (loading) {
        return (
            <div style={{ paddingTop: '120px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={{
                        fontSize: '1.2rem',
                        marginBottom: '1rem',
                        color: 'var(--text-muted)'
                    }}>
                        Loading event...
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


    if (!event) {
        return (
            <div style={{ paddingTop: '120px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', marginBottom: '2rem' }}>Event Not Found</h1>
                    <Link to="/events" className="btn">Back to Events</Link>
                </div>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: 'var(--nav-height)', minHeight: '100vh' }}>
            {/* Hero Section */}
            <div style={{
                height: '70vh',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'flex-end'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0
                }}>
                    <img
                        src={event.image}
                        alt={event.title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            filter: 'brightness(0.4)'
                        }}
                    />
                </div>

                <div className="container" style={{ position: 'relative', zIndex: 1, paddingBottom: '4rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(3rem, 10vw, 8rem)',
                            textTransform: 'uppercase',
                            marginBottom: '1rem',
                            letterSpacing: '0.02em'
                        }}>
                            {event.title}
                        </h1>
                        <div style={{
                            display: 'flex',
                            gap: '3rem',
                            flexWrap: 'wrap',
                            fontFamily: 'var(--font-body)',
                            fontSize: '1.1rem',
                            color: 'var(--accent-color)'
                        }}>
                            <span>{event.date}</span>
                            <span>{event.time}</span>
                            <span>{event.location}</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="container" style={{ paddingTop: '8vh', paddingBottom: '8vh' }}>
                <div className="event-detail-grid">
                    {/* Main Content */}
                    <div>
                        {/* Description */}
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            style={{ marginBottom: '6rem' }}
                        >
                            <h2 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '2.5rem',
                                marginBottom: '2rem',
                                textTransform: 'uppercase'
                            }}>
                                About
                            </h2>
                            <p style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '1.2rem',
                                lineHeight: 1.8,
                                color: '#aaa'
                            }}>
                                {event.description}
                            </p>
                        </motion.section>

                        {/* Lineup */}
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            style={{ marginBottom: '6rem' }}
                        >
                            <h2 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '2.5rem',
                                marginBottom: '3rem',
                                textTransform: 'uppercase'
                            }}>
                                Lineup
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {event.lineup.map((artist, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        style={{
                                            padding: '1.5rem 0',
                                            borderBottom: '1px solid rgba(197, 160, 89, 0.1)',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <span style={{
                                            fontFamily: 'var(--font-body)',
                                            fontSize: '1.3rem',
                                            fontWeight: 600
                                        }}>
                                            {artist.name}
                                        </span>
                                        <a
                                            href={artist.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                color: 'var(--accent-color)',
                                                fontSize: '0.9rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.1em',
                                                transition: 'opacity 0.3s ease'
                                            }}
                                            onMouseOver={(e) => e.target.style.opacity = '0.7'}
                                            onMouseOut={(e) => e.target.style.opacity = '1'}
                                        >
                                            Listen →
                                        </a>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Venue */}
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '2.5rem',
                                marginBottom: '2rem',
                                textTransform: 'uppercase'
                            }}>
                                Venue
                            </h2>
                            <div style={{
                                fontFamily: 'var(--font-body)',
                                color: '#aaa',
                                lineHeight: 1.8
                            }}>
                                <p style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'white' }}>{event.venue.name}</p>
                                <p>Capacity: {event.venue.capacity}</p>
                                <p style={{ marginTop: '1rem' }}>Facilities: {event.venue.facilities.join(', ')}</p>
                                <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>{event.venue.accessibility}</p>
                            </div>
                        </motion.section>
                    </div>

                    {/* Sidebar */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            style={{
                                position: 'sticky',
                                top: 'calc(var(--nav-height) + 2rem)',
                                background: 'rgba(255, 255, 255, 0.02)',
                                border: '1px solid rgba(197, 160, 89, 0.1)',
                                padding: '3rem',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            <h3 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '1.5rem',
                                marginBottom: '2rem',
                                textTransform: 'uppercase'
                            }}>
                                Event Info
                            </h3>

                            <div style={{
                                fontFamily: 'var(--font-body)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.5rem',
                                marginBottom: '3rem'
                            }}>
                                <div>
                                    <p style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Date</p>
                                    <p style={{ fontSize: '1.1rem' }}>{event.date}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Time</p>
                                    <p style={{ fontSize: '1.1rem' }}>{event.time}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Location</p>
                                    <p style={{ fontSize: '1.1rem' }}>{event.address}</p>
                                    <p style={{ fontSize: '0.9rem', color: '#888' }}>{event.city}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Price</p>
                                    <p style={{ fontSize: '1.5rem', color: 'var(--accent-color)', fontWeight: 600 }}>{event.price}</p>
                                </div>
                            </div>

                            <a href={event.ticketLink} className="btn" style={{ width: '100%', textAlign: 'center' }}>
                                Get Tickets
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetail;

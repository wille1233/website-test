import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { events } from '../data/events';

const EventList = () => {
    const [hoveredId, setHoveredId] = useState(null);
    const isMobile = window.innerWidth <= 768; // Simple check, ideally use a hook

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
                pointerEvents: 'none',
                display: isMobile ? 'none' : 'block'
            }}>
                {events.map(event => (
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

            {/* Event List / Grid */}
            <div className="event-container" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                marginTop: '2rem'
            }}>
                {events.map((event, index) => (
                    <Link
                        key={event.id}
                        to={`/event/${event.id}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
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
                                gap: '1.5rem',
                                height: '100%',
                                transition: 'transform 0.3s ease, border-color 0.3s ease'
                            }}
                            whileHover={{
                                y: -10,
                                borderColor: 'var(--accent-color)',
                                backgroundColor: 'rgba(255, 255, 255, 0.05)'
                            }}
                        >
                            {/* Mobile Image (Visible only on mobile/grid view if desired, or always for cards) */}
                            <div style={{
                                width: '100%',
                                height: '200px',
                                overflow: 'hidden',
                                borderRadius: '8px',
                                marginBottom: '0.5rem'
                            }}>
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <span style={{
                                        fontFamily: 'var(--font-body)',
                                        fontSize: '0.9rem',
                                        color: 'var(--accent-color)',
                                        display: 'block',
                                        marginBottom: '0.5rem'
                                    }}>
                                        {event.date}
                                    </span>
                                    <h3 style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: '1.8rem',
                                        lineHeight: 1.1,
                                        marginBottom: '0.5rem'
                                    }}>
                                        {event.title}
                                    </h3>
                                    <p style={{
                                        fontFamily: 'var(--font-body)',
                                        fontSize: '0.9rem',
                                        color: 'var(--text-muted)'
                                    }}>
                                        {event.location}
                                    </p>
                                </div>

                                <motion.div
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        border: '1px solid var(--text-muted)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--text-muted)'
                                    }}
                                    whileHover={{
                                        borderColor: 'var(--accent-color)',
                                        color: 'var(--accent-color)',
                                        rotate: -45
                                    }}
                                >
                                    →
                                </motion.div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default EventList;

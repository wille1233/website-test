import React from 'react';
import EventList from '../components/EventList';
import { motion } from 'framer-motion';

const Events = () => {
    return (
        <div style={{ paddingTop: '120px', minHeight: '100vh', paddingBottom: '8vh' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: '4rem' }}
                >
                    <h1 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(3rem, 8vw, 7rem)',
                        textTransform: 'uppercase',
                        marginBottom: '1rem',
                        letterSpacing: '-0.02em',
                        lineHeight: 0.9,
                        color: 'var(--text-color)'
                    }}>
                        All Events
                    </h1>
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1.1rem',
                        color: 'var(--text-muted)',
                        maxWidth: '600px',
                        lineHeight: 1.6
                    }}>
                        A curated selection of underground electronic music experiences.
                        Join us for nights that define the scene.
                    </p>
                </motion.div>

                <EventList />
            </div>
        </div>
    );
};

export default Events;

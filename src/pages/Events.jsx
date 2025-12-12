import React, { useRef } from 'react';
import EventList from '../components/EventList';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Events.css';
import Scene from '../components/Scene';

const Events = () => {
    const { scrollY } = useScroll();
    // Parallax for Hero Text
    const yParallax = useTransform(scrollY, [0, 500], [0, 200]); // Move text down slower than scroll
    const opacityParallax = useTransform(scrollY, [0, 400], [1, 0]); // Fade out text

    return (
        <div className="events-page">
            {/* Hero Section - Fixed Behind */}
            <section className="events-hero">
                {/* Background Scene (Optional) */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.8 }}>
                    <Scene />
                </div>

                {/* Hero Content */}
                <motion.div
                    style={{
                        zIndex: 1,
                        textAlign: 'center',
                        y: yParallax,
                        opacity: opacityParallax,
                        mixBlendMode: 'difference'
                    }}
                >
                    <h1 style={{
                        color: '#ffffff',
                        fontSize: 'clamp(4rem, 12vw, 15rem)', // Even larger for impact
                        fontFamily: '"Oswald", sans-serif',
                        textTransform: 'uppercase',
                        fontWeight: '700',
                        lineHeight: 0.9,
                        margin: 0,
                        letterSpacing: '-0.02em',
                        // textShadow: '0 20px 50px rgba(0,0,0,0.5)'
                    }}>
                        Events
                    </h1>
                </motion.div>
            </section>

            {/* Content Section - Scrolls Over */}
            <div className="events-content-wrapper" style={{
                '--text-color': '#ffffff',
                '--text-primary': '#ffffff',
                '--text-muted': 'rgba(255, 255, 255, 0.6)',
                '--bg-color': 'transparent'
            }}>
                <div className="events-content">
                    <EventList />
                </div>
            </div>
        </div>
    );
};

export default Events;

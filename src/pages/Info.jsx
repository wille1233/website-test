import React from 'react';
import { motion } from 'framer-motion';

const Info = () => {
    const sections = [
        {
            title: "What does it mean to become a member?",
            content: (
                <>
                    <p>There are two types of membership:</p>
                    <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                        <li><strong>Regular Membership (required)</strong> – A must to attend our events, access to location drops, tickets etc. This makes you a member in Kulturföreningen Musikbopp.</li>
                        <li><strong>Selective Membership</strong> – A curated, limited tier for those who are deeply connected to what we do. Selective members get access to our most private parties and internal spaces. You're in the loop and one step ahead.</li>
                    </ul>
                    <p>It’s free, always will be, and lasts for one year at a time.</p>
                    <p style={{ marginTop: '1rem' }}>Becoming a member means you're aligned with our culture and values. Membership gives you access to a space beyond the ordinary – a nightlife built on sound, trust, and something real.</p>
                    <p style={{ marginTop: '1rem' }}>The reason we use membership is simple: our events are private. This keeps the vibe intact. Personal, intentional, and far from the mainstream.</p>
                </>
            )
        },
        {
            title: "When is the next event?",
            content: "We announce our events on Instagram. Stay tuned!"
        },
        {
            title: "How often do you throw Events?",
            content: "We don’t do quantity, we do quality. We aim for just enough to keep it rare, memorable and worth the wait. Every event is built from scratch, and we don’t throw parties just for the sake of it."
        },
        {
            title: "What's your stance on drugs?",
            content: "We’re against drug use at our events. Not for moral panic but because it breaks the energy. It creates an environment we’re not here for. While we can't control everything, we ask you to speak up if you see behavior that goes against our values."
        },
        {
            title: "Our Collective",
            content: "We’re a nonprofit that curates nightlife experiences with one goal: connection through sound and setting. We host outdoor parties to support DJs, underground music, and the community that surrounds it. Not quite club, not quite rave."
        },
        {
            title: "The Club Didn’t Hold Up",
            content: "We felt it. Same music. Same faces. Overpriced drinks. We wanted something new. We found sounds hidden in corners of the internet. Hard techno. Tech house. Subgenres that moved us more than anything on the radio."
        },
        {
            title: "Unique Events",
            content: "So we started throwing our own. Events with real DJs, serious sound, and a crowd that actually listens. A real alternative to the nightlife scene. We’re not trying to fix the club. We’re building what comes after."
        }
    ];

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
                        Info
                    </h1>
                </motion.div>

                <div style={{ maxWidth: '800px' }}>
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            style={{ marginBottom: '4rem' }}
                        >
                            <h2 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '2rem',
                                marginBottom: '1.5rem',
                                color: 'var(--accent-color)',
                                textTransform: 'uppercase'
                            }}>
                                {section.title}
                            </h2>
                            <div style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '1.1rem',
                                lineHeight: 1.8,
                                color: 'var(--text-muted)'
                            }}>
                                {section.content}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Info;

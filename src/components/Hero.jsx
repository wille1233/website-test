import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Scene from './Scene';

const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={ref} style={{
            height: '100vh',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-color)'
        }}>
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    y
                }}
            >
                <Scene />
            </motion.div>

            <motion.div
                style={{
                    zIndex: 1,
                    textAlign: 'center',
                    opacity,
                    pointerEvents: 'none'
                }}
            >
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        fontSize: 'clamp(4rem, 12vw, 10rem)',
                        fontFamily: 'var(--font-display)',
                        textTransform: 'uppercase',
                        letterSpacing: '-0.02em',
                        lineHeight: 0.9,
                        marginBottom: '2rem',
                        color: 'var(--text-color)'
                    }}
                >

                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    style={{
                        fontSize: '1rem',
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                        fontFamily: 'var(--font-primary)',
                        fontWeight: 300,
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >

                </motion.p>
            </motion.div>

            <div style={{
                position: 'absolute',
                bottom: '2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 2
            }}>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{
                        width: '1px',
                        height: '60px',
                        background: 'var(--accent-color)'
                    }}
                />
            </div>
        </div>
    );
};

export default Hero;

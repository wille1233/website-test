import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';

const Loader = () => (
    <Html center>
        <div style={{ color: 'white', fontSize: '20px' }}>Loading 3D Model...</div>
    </Html>
);

const Model = () => {
    try {
        const { scene } = useGLTF('/models/Studio.gltf');
        console.log('Model loaded:', scene);
        return <primitive object={scene} scale={0.5} />;
    } catch (error) {
        console.error('Error loading model:', error);
        return (
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="orange" />
            </mesh>
        );
    }
};

const Studio = () => {
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Studio page mounted');
    }, []);

    return (
        <div style={{ width: '100%', height: '100vh', background: '#050505' }}>
            <Canvas
                camera={{ position: [5, 5, 5], fov: 50 }}
                style={{ background: '#050505' }}
                onCreated={({ gl }) => {
                    console.log('Canvas created');
                    gl.setClearColor('#050505');
                }}
            >
                <Suspense fallback={<Loader />}>
                    <color attach="background" args={['#050505']} />
                    <Environment preset="warehouse" />
                    <ambientLight intensity={1} />
                    <directionalLight position={[10, 10, 5]} intensity={2} />
                    <directionalLight position={[-10, -10, -5]} intensity={0.5} />
                    <pointLight position={[0, 5, 0]} intensity={1} />

                    <Model />

                    <gridHelper args={[10, 10]} />
                    <axesHelper args={[5]} />

                    <ContactShadows
                        position={[0, -0.5, 0]}
                        opacity={0.4}
                        scale={10}
                        blur={1.5}
                        far={2}
                    />
                    <OrbitControls makeDefault />
                </Suspense>
            </Canvas>

            <div style={{
                position: 'absolute',
                top: '120px',
                left: '50%',
                transform: 'translateX(-50%)',
                pointerEvents: 'none',
                textAlign: 'center',
                zIndex: 10
            }}>
                <h1 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 5vw, 4rem)',
                    textTransform: 'uppercase',
                    color: 'white',
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                }}>
                    The Studio
                </h1>
                {error && (
                    <p style={{ color: 'red', marginTop: '1rem' }}>
                        Error: {error}
                    </p>
                )}
            </div>

            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                color: 'white',
                fontSize: '14px',
                fontFamily: 'monospace',
                background: 'rgba(0,0,0,0.5)',
                padding: '10px',
                borderRadius: '5px'
            }}>
                <p>Camera: [5, 5, 5]</p>
                <p>Use mouse to orbit, zoom, and pan</p>
            </div>
        </div>
    );
};

export default Studio;

import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Float, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import symbolTexture from '../assets/symbol_texture.png';

const Symbol = () => {
    const groupRef = useRef();

    // Load texture for material
    const texture = useLoader(TextureLoader, symbolTexture);

    // Create the actual S logo shape from SVG path (split into 3 separate shapes)
    const extrudedGeometries = useMemo(() => {
        const scale = 0.0008;
        const offsetX = -2000;
        const offsetY = -2000;
        const s = (val, offset) => (val + offset) * scale;

        const extrudeSettings = {
            depth: 0.20,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.03,
            bevelSegments: 10,
            curveSegments: 64
        };

        // SHAPE 1: First S curve (M 1984.16 887.685 ...)
        const shape1 = new THREE.Shape();
        let currentX = 1984.16;
        let currentY = 887.685;
        shape1.moveTo(s(currentX, offsetX), s(currentY, offsetY));

        // c 3.17 -3.129 -235.78 391.685 208.22 604.325
        shape1.bezierCurveTo(
            s(currentX + 3.17, offsetX), s(currentY + (-3.129), offsetY),
            s(currentX + (-235.78), offsetX), s(currentY + 391.685, offsetY),
            s(currentX + 208.22, offsetX), s(currentY + 604.325, offsetY)
        );
        currentX += 208.22; currentY += 604.325;

        // c 143.97 68.95 225.97 -44.3 213.29 -116.8
        shape1.bezierCurveTo(
            s(currentX + 143.97, offsetX), s(currentY + 68.95, offsetY),
            s(currentX + 225.97, offsetX), s(currentY + (-44.3), offsetY),
            s(currentX + 213.29, offsetX), s(currentY + (-116.8), offsetY)
        );
        currentX += 213.29; currentY += -116.8;

        // c -36.97 -211.31 -268.76 -287.47 -266.62 -286.93
        shape1.bezierCurveTo(
            s(currentX + (-36.97), offsetX), s(currentY + (-211.31), offsetY),
            s(currentX + (-268.76), offsetX), s(currentY + (-287.47), offsetY),
            s(currentX + (-266.62), offsetX), s(currentY + (-286.93), offsetY)
        );
        currentX += -266.62; currentY += -286.93;

        // c 784.37 195.94 579.98 753.73 259 815.07
        shape1.bezierCurveTo(
            s(currentX + 784.37, offsetX), s(currentY + 195.94, offsetY),
            s(currentX + 579.98, offsetX), s(currentY + 753.73, offsetY),
            s(currentX + 259, offsetX), s(currentY + 815.07, offsetY)
        );
        currentX += 259; currentY += 815.07;

        // C 2047.21 1970.41 1450.33 1415.48 1984.16 887.685 (close path)
        shape1.bezierCurveTo(
            s(2047.21, offsetX), s(1970.41, offsetY),
            s(1450.33, offsetX), s(1415.48, offsetY),
            s(1984.16, offsetX), s(887.685, offsetY)
        );

        // SHAPE 2: Second S curve (M 2015.26 3112 ...)
        const shape2 = new THREE.Shape();
        currentX = 2015.26; currentY = 3112;
        shape2.moveTo(s(currentX, offsetX), s(currentY, offsetY));

        // c -3.16 3.13 235.71 -391.5 -208.14 -604.04
        shape2.bezierCurveTo(
            s(currentX + (-3.16), offsetX), s(currentY + 3.13, offsetY),
            s(currentX + 235.71, offsetX), s(currentY + (-391.5), offsetY),
            s(currentX + (-208.14), offsetX), s(currentY + (-604.04), offsetY)
        );
        currentX += -208.14; currentY += -604.04;

        // c -143.92 -68.92 -225.89 44.28 -213.21 116.75
        shape2.bezierCurveTo(
            s(currentX + (-143.92), offsetX), s(currentY + (-68.92), offsetY),
            s(currentX + (-225.89), offsetX), s(currentY + 44.28, offsetY),
            s(currentX + (-213.21), offsetX), s(currentY + 116.75, offsetY)
        );
        currentX += -213.21; currentY += 116.75;

        // c 36.95 211.21 268.66 287.32 266.52 286.79
        shape2.bezierCurveTo(
            s(currentX + 36.95, offsetX), s(currentY + 211.21, offsetY),
            s(currentX + 268.66, offsetX), s(currentY + 287.32, offsetY),
            s(currentX + 266.52, offsetX), s(currentY + 286.79, offsetY)
        );
        currentX += 266.52; currentY += 286.79;

        // c -784.09 -195.85 -579.78 -753.38 -258.91 -814.7
        shape2.bezierCurveTo(
            s(currentX + (-784.09), offsetX), s(currentY + (-195.85), offsetY),
            s(currentX + (-579.78), offsetX), s(currentY + (-753.38), offsetY),
            s(currentX + (-258.91), offsetX), s(currentY + (-814.7), offsetY)
        );
        currentX += -258.91; currentY += -814.7;

        // C 1952.24 2029.78 2548.91 2584.45 2015.26 3112 (close path)
        shape2.bezierCurveTo(
            s(1952.24, offsetX), s(2029.78, offsetY),
            s(2548.91, offsetX), s(2584.45, offsetY),
            s(2015.26, offsetX), s(3112, offsetY)
        );

        // SHAPE 3: Third element (M 1712.47 1118.75 ...)
        const shape3 = new THREE.Shape();
        currentX = 1712.47; currentY = 1118.75;
        shape3.moveTo(s(currentX, offsetX), s(currentY, offsetY));

        // c -211.68 740.05 572.38 895.4 589.09 901.41
        shape3.bezierCurveTo(
            s(currentX + (-211.68), offsetX), s(currentY + 740.05, offsetY),
            s(currentX + 572.38, offsetX), s(currentY + 895.4, offsetY),
            s(currentX + 589.09, offsetX), s(currentY + 901.41, offsetY)
        );
        currentX += 589.09; currentY += 901.41;

        // c 750.79 269.8 248.77 834.15 -15.23 855.7
        shape3.bezierCurveTo(
            s(currentX + 750.79, offsetX), s(currentY + 269.8, offsetY),
            s(currentX + 248.77, offsetX), s(currentY + 834.15, offsetY),
            s(currentX + (-15.23), offsetX), s(currentY + 855.7, offsetY)
        );
        currentX += -15.23; currentY += 855.7;

        // c -3.73 0.3 207.99 -686.26 -538.31 -870.94
        shape3.bezierCurveTo(
            s(currentX + (-3.73), offsetX), s(currentY + 0.3, offsetY),
            s(currentX + 207.99, offsetX), s(currentY + (-686.26), offsetY),
            s(currentX + (-538.31), offsetX), s(currentY + (-870.94), offsetY)
        );
        currentX += -538.31; currentY += -870.94;

        // C 1084.61 1840.76 1242.6 1241.9 1712.47 1118.75 (close path)
        shape3.bezierCurveTo(
            s(1084.61, offsetX), s(1840.76, offsetY),
            s(1242.6, offsetX), s(1241.9, offsetY),
            s(1712.47, offsetX), s(1118.75, offsetY)
        );

        // Create geometries for each shape
        const geo1 = new THREE.ExtrudeGeometry(shape1, extrudeSettings);
        const geo2 = new THREE.ExtrudeGeometry(shape2, extrudeSettings);
        const geo3 = new THREE.ExtrudeGeometry(shape3, extrudeSettings);

        // Compute normals for smooth shading
        geo1.computeVertexNormals();
        geo2.computeVertexNormals();
        geo3.computeVertexNormals();

        return [geo1, geo2, geo3];
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // Rotate the entire group
        groupRef.current.rotation.y = t * 0.5;
        groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.1;

        // Gentle floating
        groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
    });

    return (
        <group ref={groupRef}>
            {/* Outer Gold Ring */}
            <mesh>
                <torusGeometry args={[1.8, 0.15, 16, 100]} />
                <meshPhysicalMaterial
                    color="#cfcfcfff"
                    metalness={0.5}
                    roughness={0.1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    reflectivity={1}
                    emissive="#cfcfcfff"
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* True 3D Extruded S Symbol - Three separate pieces to avoid connection lines */}
            <group position={[0, 0, -0.15]} scale={[1.5, 1.5, 1.5]}>
                <mesh geometry={extrudedGeometries[0]}>
                    <meshStandardMaterial
                        color="#cfcfcfff"
                        roughness={0.6}
                        metalness={0.5}
                        flatShading={false}
                    />
                </mesh>
                <mesh geometry={extrudedGeometries[1]}>
                    <meshStandardMaterial
                        color="#cfcfcfff"
                        roughness={0.6}
                        metalness={0.5}
                        flatShading={false}
                    />
                </mesh>
                <mesh geometry={extrudedGeometries[2]}>
                    <meshStandardMaterial
                        color="#cfcfcfff"
                        roughness={0.6}
                        metalness={0.5}
                        flatShading={false}
                    />
                </mesh>
            </group>
        </group>
    );
};

const Scene = () => {
    return (
        <div style={{ width: '100%', height: '100vh', background: '#e6e1e1ff' }}>
            <Canvas>
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 0, 6]} />
                    <Environment preset="studio" />

                    {/* Lighting for the metallic and displaced materials */}
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#C5A059" />

                    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
                        <Symbol />
                    </Float>
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Scene;
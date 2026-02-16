import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';



const Hero3D = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 7], fov: 40 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                <pointLight position={[-10, 0, -5]} intensity={1} color="#D4AF37" />

                {/* Background Particles */}
                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} enablePan={false} />
            </Canvas>
        </div>
    );
};

export default Hero3D;

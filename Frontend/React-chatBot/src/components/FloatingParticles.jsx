// components/FloatingParticles.jsx
import { motion } from "framer-motion";

export default function FloatingParticles() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#ff3f17]/10"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 20 + 10}px`,
            height: `${Math.random() * 20 + 10}px`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -5, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: Math.random() * 4 + 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

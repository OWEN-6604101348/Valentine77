import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const generateRosePetals = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100, // Random horizontal position
    duration: Math.random() * 5 + 5, // Random fall duration
    delay: Math.random() * 5, // Random delay
    size: Math.random() * 20 + 10, // Random petal size
  }));
};

export default function FallingRoses() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    setPetals(generateRosePetals(15)); // Generate 15 petals
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{ y: "-10%", opacity: 0 }}
          animate={{ y: "50%", opacity: 1 }} // Stop at the middle of the screen
          transition={{ duration: petal.duration, delay: petal.delay, repeat: Infinity }}
          className="absolute text-red-500"
          style={{
            left: `${petal.left}%`,
            fontSize: `${petal.size}px`,
          }}
        >
          🌹 {/* Unicode for a rose emoji */}
        </motion.div>
      ))}
    </div>
  );
}

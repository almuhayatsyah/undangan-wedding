"use client";

import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  symbol: string;
}

export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const symbols = ["🌿", "🍃", "✿"];
    const generated: Petal[] = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 12 + Math.random() * 10,
      duration: 18 + Math.random() * 10,
      delay: Math.random() * 10,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.left}%`,
            fontSize: `${petal.size}px`,
            animationName: "float-down",
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
            opacity: 0.4,
            willChange: "transform",
          }}
        >
          {petal.symbol}
        </span>
      ))}
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

const QUOTES = [
  "Your body is not a project. It's a partner.",
  "Wellness isn't a destination. It's how you travel.",
  "Breathe in the forest. Let it breathe through you.",
  "Small steps, done daily, become the path.",
  "Nature doesn't rush. Yet everything gets done.",
  "Rest is not a reward. It's the foundation.",
  "You are not falling behind. You are on your own path.",
  "The most important conversation is the one you have with yourself.",
  "Listen to your body before it has to raise its voice.",
  "Movement is a celebration of what your body can do.",
  "Healing happens in the quiet moments between efforts.",
  "You don't need to fix yourself. You need to nourish yourself.",
  "Strength isn't how much you can lift. It's how often you get back up.",
  "The body achieves what the mind believes.",
  "Let go of perfect. Embrace consistent.",
  "Your only competition is the person you were yesterday.",
  "Eat like you love yourself. Move like you enjoy it. Rest like you deserve it.",
  "The best time to start was yesterday. The next best time is now.",
  "Sunlight, water, movement, rest — the four pillars of every living thing.",
  "A calm mind is the strongest foundation for a healthy body.",
];

type QuoteBubble = {
  id: number;
  text: string;
  x: number;
  y: number;
  size: "text-xs" | "text-sm" | "text-[11px]";
  delay: number;
  duration: number;
};

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const SIZES: QuoteBubble["size"][] = ["text-xs", "text-[11px]", "text-sm"];

export default function FloatingQuotes() {
  const [bubbles, setBubbles] = useState<QuoteBubble[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    // Initialize with 10 bubbles at random positions
    const initial: QuoteBubble[] = Array.from({ length: 10 }, () => ({
      id: idRef.current++,
      text: pick(QUOTES),
      x: randomBetween(2, 90),
      y: randomBetween(5, 95),
      size: pick(SIZES),
      delay: randomBetween(0, 20),
      duration: randomBetween(40, 60),
    }));
    setBubbles(initial);

    // Recycle bubbles — replace one every few seconds
    const interval = setInterval(() => {
      setBubbles((prev) => {
        const next = [...prev];
        // Replace the oldest bubble (first in array)
        next.shift();
        next.push({
          id: idRef.current++,
          text: pick(QUOTES),
          x: randomBetween(2, 90),
          y: randomBetween(10, 100),
          size: pick(SIZES),
          delay: 0,
          duration: randomBetween(40, 60),
        });
        return next;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
      {bubbles.map((b) => (
        <span
          key={b.id}
          className={`absolute ${b.size} font-body italic leading-tight text-white`}
          style={{
            left: `${b.x}%`,
            bottom: `${b.y}%`,
            opacity: 0,
            animation: `quoteFloat ${b.duration}s ${b.delay}s ease-in-out infinite`,
            maxWidth: "280px",
            textShadow: "0 0 4px rgba(0,0,0,0.15)",
          }}
        >
          &ldquo;{b.text}&rdquo;
        </span>
      ))}
    </div>
  );
}

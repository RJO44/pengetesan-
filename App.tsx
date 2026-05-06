import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";

const MESSAGES = [
  "Hai...",
  "Lagi sibuk enggaa?",
  "Dena cuma mau bilang sesuatuuu.",
  "Maybe kedengerannya aga alay sikitt,",
  "Tapi semenjak kenal sama kamu...",
  "Hari-hariku jadi jauh lebih seru dan berwarna.",
  "Makasih ya, udah jadi orang yang selalu sabar ngadepin aku.",
  "Makasih udah jadi alasan senyumku belakangan ini.",
  "You are my favorite plot twist.",
  "I love you, Allen.",
];

const InteractiveBackground = () => {
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty("--mouse-x", `${x}%`);
    document.documentElement.style.setProperty("--mouse-y", `${y}%`);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="atmosphere" />
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="bokeh opacity-20 bg-white/30"
          initial={{ x: `${p.x}%`, y: `${p.y}%` }}
          animate={{
            y: ["-10%", "110%"],
            x: [`${p.x}%`, `${p.x + (Math.random() * 10 - 5)}%`],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: -p.delay,
          }}
          style={{
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
};

export default function App() {
  const [index, setIndex] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (index < MESSAGES.length - 1) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 3800);
      return () => clearTimeout(timer);
    } else {
      setComplete(true);
    }
  }, [index]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0a0c10] text-[#f1f1f1] px-6 text-center select-none overflow-hidden font-sans">
      <InteractiveBackground />

      <main className="relative z-10 w-full max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: {
                y: { type: "spring", stiffness: 100, damping: 20 },
                opacity: { duration: 1 }
              }
            }}
            exit={{ 
              opacity: 0, 
              y: -30, 
              scale: 1.05,
              transition: { duration: 0.8, ease: "easeInOut" } 
            }}
            className="flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <h1 className="text-4xl md:text-6xl font-serif italic font-medium tracking-tight leading-snug text-white drop-shadow-sm">
                {MESSAGES[index]}
              </h1>
            </motion.div>

            {complete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-16 flex flex-col items-center gap-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 20,
                    delay: 1.5 
                  }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.15, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  >
                    <Heart className="w-16 h-16 text-[#ff4d6d] fill-[#ff4d6d] drop-shadow-[0_0_25px_rgba(255,77,109,0.6)]" />
                  </motion.div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ delay: 4, duration: 2 }}
                  className="space-y-2"
                >
                  <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto" />
                  <p className="text-[10px] uppercase tracking-[0.6em] font-light text-white/80">
                    With all my heart
                  </p>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <div className="fixed inset-0 border-[20px] border-white/5 pointer-events-none z-20" />
      <div className="fixed top-12 left-1/2 -translate-x-1/2 text-[10px] tracking-[1em] uppercase opacity-20 hidden md:block">
        Personal Note
      </div>
    </div>
  );
}

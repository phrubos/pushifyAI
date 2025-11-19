"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React, { useMemo, useState, useEffect } from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const meteors = new Array(number || 20).fill(true);
  
  // Generate random values only on client side after mount
  const meteorStyles = useMemo(() => {
    if (!mounted) {
      // Return consistent values for SSR
      return meteors.map((_, idx) => ({
        delay: (idx * 0.5) % 5,
        duration: 5 + (idx % 5),
      }));
    }
    
    // Generate random values on client
    return meteors.map(() => ({
      delay: Math.random() * 5,
      duration: Math.floor(Math.random() * (10 - 5) + 5),
    }));
  }, [mounted, meteors.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {meteors.map((el, idx) => {
        const meteorCount = number || 20;
        // Calculate position to evenly distribute meteors across container width
        const position = idx * (800 / meteorCount) - 400; // Spread across 800px range, centered

        return (
          <span
            key={"meteor" + idx}
            className={cn(
              "animate-meteor-effect absolute h-0.5 w-0.5 rotate-[45deg] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
              "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
              className,
            )}
            style={{
              top: "-40px",
              left: position + "px",
              animationDelay: meteorStyles[idx].delay + "s",
              animationDuration: meteorStyles[idx].duration + "s",
            }}
          ></span>
        );
      })}
    </motion.div>
  );
};

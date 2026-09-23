"use client";

import { motion, type Variants } from "framer-motion";
import React from "react";

// ─── Shared Variant Definitions ───────────────────────────────────────────────

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const fastStaggerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.055, delayChildren: 0.02 },
  },
};

// ─── Reusable Animated Components ─────────────────────────────────────────────

type MotionDivProps = React.ComponentPropsWithoutRef<typeof motion.div> & {
  children: React.ReactNode;
  delay?: number;
  once?: boolean;
};

/**
 * FadeUp — general section / content reveal
 * Fires once as element enters the viewport
 */
export function FadeUp({
  children,
  delay = 0,
  once = true,
  className,
  ...rest
}: MotionDivProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-60px" }}
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.52,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScaleIn — cards, modals, badges
 */
export function ScaleIn({
  children,
  delay = 0,
  once = true,
  className,
  ...rest
}: MotionDivProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-60px" }}
      variants={{
        hidden: { opacity: 0, scale: 0.94 },
        show: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.48,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * SlideIn — slide from left or right
 */
export function SlideIn({
  children,
  delay = 0,
  once = true,
  className,
  direction = "left",
  ...rest
}: MotionDivProps & { direction?: "left" | "right" }) {
  const x = direction === "left" ? -28 : 28;
  return (
    <motion.div
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.48, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerGrid — wraps a grid so children stagger in
 */
export function StaggerGrid({
  children,
  className,
  once = true,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-60px" }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.09, delayChildren: delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem — child inside a StaggerGrid
 */
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={fadeUpVariants} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * CardHover — adds hover tilt + scale + shadow lift
 */
export function CardHover({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.01,
        transition: { duration: 0.22, ease: "easeOut" },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * MagneticButton — subtle magnetic hover transform on any button/link
 * Wraps children and applies a smooth translate on mouse proximity
 */
export function MagneticButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * FloatLoop — subtle perpetual floating animation (hero badges, decorative elements)
 */
export function FloatLoop({
  children,
  className,
  amplitude = 8,
  duration = 3.5,
}: {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -amplitude, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * PageTransition — wraps page content with a smooth fade+slide-up entrance
 */
export function PageTransition({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * HeroText — stagger-reveals each word of a headline
 */
export function HeroText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.07, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.22em]"
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

/**
 * CountUp — animates a number from 0 to target value when in viewport
 */
export function CountUp({
  value,
  suffix = "",
  className,
  duration = 1.2,
}: {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);
  const started = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const step = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            // Ease out
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
}

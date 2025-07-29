// components/AnimatedBadge.jsx
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect, PropsWithChildren } from "react";

export default function AnimatedBadge({ children }) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 25 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, type: "spring", stiffness: 110 },
        },
      }}
      className="inline-flex items-center gap-2 rounded-[18px] border border-black/10 bg-white px-4 py-2 text-lg font-medium shadow-lg dark:border-white/5 dark:bg-neutral-800/5"
    >
      {children}
    </motion.div>
  );
}

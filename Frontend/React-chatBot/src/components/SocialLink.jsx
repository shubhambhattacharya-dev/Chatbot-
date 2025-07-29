// components/SocialLink.jsx
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import FlipLink from "./FlipLink";           // make sure FlipLink lives here
                                             // or adjust this import

export default function SocialLink({
  icon,
  label,
  href,
  align = "left",
  ariaLabel,
}) {
  /* fade-in when scrolled into view */
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const variants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, type: "spring", stiffness: 90 },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="group flex items-center justify-center gap-8"
    >
      {align === "left" && (
        <motion.div
          className="transition-transform duration-300 group-hover:scale-110"
          whileHover={{ rotate: 5 }}
          role="img"
          aria-label={`${label} icon`}
        >
          {icon}
        </motion.div>
      )}

      <FlipLink href={href} aria-label={ariaLabel || `Visit my ${label} profile`}>
        {label}
      </FlipLink>

      {align === "right" && (
        <motion.div
          className="transition-transform duration-300 group-hover:scale-110"
          whileHover={{ rotate: -5 }}
          role="img"
          aria-label={`${label} icon`}
        >
          {icon}
        </motion.div>
      )}
    </motion.div>
  );
}

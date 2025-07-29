// components/Icons.jsx
import { motion } from "framer-motion";

/* Animation helpers */
const hoverProps = {
  linkedin: { rotate: -5, scale: 1.08 },
  github:   { rotate:  4, scale: 1.08 },
};

const baseRect =
  "fill-neutral-100 dark:fill-neutral-700 transition-colors duration-300 group-hover:fill-[#ff3f17]";
const basePath =
  "fill-black dark:fill-white transition-colors duration-300 group-hover:fill-white";

const Icons = {
  linkedin: (props) => (
    <motion.svg
      width="96"
      height="96"
      viewBox="0 0 86 86"
      whileHover={hoverProps.linkedin}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <rect width="86" height="86" rx="18" className={baseRect} />
      <path
        className={basePath}
        d="M27.7 69.5V33.4H15.7V69.5h12zm-6-41c4.2 0 6.8-2.8 6.8-6.3C28.4 18.7 25.9 16 21.8 16s-6.8 2.7-6.8 6.2c0 3.5 2.7 6.3 6.7 6.3zM34.4 69.5s.2-32.7 0-36.1h12v5.2h-.1c1.6-2.5 4.5-6 11-6 7.9 0 13.9 5.2 13.9 16v20H59V50.2c0-4.9-1.7-8.2-6.1-8.2-3.3 0-5.3 2.2-6.2 4.4-.3.8-.4 2-.4 3.1v20h-12z"
      />
    </motion.svg>
  ),

  github: (props) => (
    <motion.svg
      width="96"
      height="96"
      viewBox="0 0 86 86"
      whileHover={hoverProps.github}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <rect width="86" height="86" rx="18" className={baseRect} />
      <path
        className={basePath}
        d="M43.3 13C60 13 73.6 26.9 73.6 44c0 13.7-8.7 25.3-20.7 29.5-.6.1-1-.5-1-.9 0-.5.1-3.4.1-6.6 0-2.3-.8-3.7-1.7-4.5 12.5-1.4 25.6-6.1 25.6-28 0-6.2-2.2-11.3-5.9-15.3.6-1.5 2.6-7.6-1.1-15.8 0 0-4.8-1.5-15.7 5.9-4.6-1.3-9.6-2-14.5-2s-9.9.7-14.5 2C24 15.3 19.2 16.8 19.2 16.8c-3.6 8.2-1.6 14.3-1.1 15.8-3.7 4-5.9 9.1-5.9 15.3 0 21.9 13 26.5 25.5 28-1 .9-1.9 2.5-1.9 5.1 0 3.7.1 6.7.1 7.6 0 .4-.4 1-1 .9C21.4 69.3 13 57.7 13 44 13 26.9 26.6 13 43.3 13z"
      />
    </motion.svg>
  ),
};

export default Icons;

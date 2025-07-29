// components/FlipLink.jsx
import { motion } from "framer-motion";

export default function FlipLink({ href, children, className = "" }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative overflow-hidden group ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative flex h-10 items-center">
        {/* top word */}
        <span className="block text-xl font-medium transition-transform duration-300 group-hover:-translate-y-full">
          {children}
        </span>
        {/* bottom word (slides up) */}
        <span className="absolute inset-0 block translate-y-full text-xl font-medium text-[#ff3f17] transition-transform duration-300 group-hover:translate-y-0">
          {children}
        </span>
      </div>

      {/* underline that grows left→right */}
      <div className="absolute bottom-0 h-0.5 w-0 bg-gradient-to-r from-[#ff3f17] to-[#ff6a00] transition-all duration-500 group-hover:w-full" />
    </motion.a>
  );
}

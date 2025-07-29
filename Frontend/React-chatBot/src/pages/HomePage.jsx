import React, { useEffect, useRef } from "react";

import FloatingParticles from "../components/FloatingParticles";
import AnimatedBadge from "../components/AnimatedBadge";
import SocialLink from "../components/SocialLink"; 
import FlipLink from "../components/FlipLink"; 
// HomePage.jsx
import Icons from "../components/Icons";   // adjust the path if needed

 // adjust the path


import { SparklesIcon, BotIcon, ArrowRight } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  All helper components (FloatingParticles, AnimatedBadge, SocialLink,      */
/*  Icons, FlipLink, etc.) should already exist exactly as in your previous   */
/*  files.  No changes are needed there, so they are not repeated below.      */
/* -------------------------------------------------------------------------- */

export default function HomePage() {
  /* ––– master fade-in for the whole page ––– */
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <motion.main
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.8, staggerChildren: 0.25 },
        },
      }}
      className="relative mx-auto my-24 w-full max-w-7xl px-6 lg:px-12"
    >
      {/* ---------------------------------------------------------------- */}
      {/*                               HERO                               */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden rounded-[36px] border border-black/5 bg-gradient-to-br from-white/50 to-[#fafafa] shadow-2xl shadow-[#ff3f17]/10 dark:border-white/5 dark:from-gray-900/50 dark:to-[#0a0a0a] dark:shadow-[#ff3f17]/5">
        <FloatingParticles />

        {/* soft radial glow */}
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-r from-[#ff3f17]/30 to-[#ff6a00]/20 blur-[80px] dark:from-[#ff3f17]/20 dark:to-[#ff6a00]/15" />

        <div className="relative z-10 flex flex-col items-center py-20 text-center">
          <AnimatedBadge>
            <SparklesIcon className="h-5 w-5 text-[#ff3f17] animate-pulse" />
            <span className="bg-gradient-to-r from-[#ff3f17] to-[#ff6a00] bg-clip-text text-transparent">
              Hello, I’m
            </span>
          </AnimatedBadge>

          <motion.h1
            className="mt-6 text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Shubham Bhattacharya
          </motion.h1>

          <motion.p
            className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 md:text-2xl"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            Crafting exceptional web experiences with React + Javascript — and
            building intelligent interfaces powered by AI.
          </motion.p>

          <motion.a
            href="/chatbot"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff3f17] to-[#ff6a00] px-8 py-3 text-lg font-semibold text-white shadow-lg shadow-[#ff3f17]/40 transition-all hover:shadow-[#ff6a00]/40"
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </motion.a>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*                        CHATBOT SHOWCASE                           */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="chatbot"
        className="mt-28 rounded-[32px] border border-black/5 bg-white/50 p-12 shadow-xl shadow-[#ff3f17]/5 backdrop-blur-sm dark:border-white/5 dark:bg-neutral-900/60"
      >
        <div className="flex flex-col items-center gap-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            whileInView={{
              scale: 1,
              opacity: 1,
              rotate: 0,
              transition: { type: "spring", stiffness: 300, damping: 15 },
            }}
            className="rounded-2xl bg-gradient-to-br from-[#ff3f17]/10 to-[#ff6a00]/10 p-4"
          >
            <BotIcon className="h-14 w-14 text-[#ff3f17]" />
          </motion.div>

          <h2 className="text-4xl font-bold bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Meet the React Chatbot
          </h2>
          <p className="max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            An intelligent, conversational assistant built with React, powered
            by a robust API layer and Framer-Motion UI polish. Seamlessly
            integrates into any app, adapts to your brand, and boosts user
            engagement.
          </p>

          {/* ---------- demo mock-up ---------- */}
          <div className="relative mt-6 w-full max-w-4xl">
            <div className="aspect-video w-full overflow-hidden rounded-xl border border-black/10 bg-gradient-to-br from-white to-neutral-100 dark:border-white/10 dark:from-neutral-900 dark:to-neutral-800">
              <div className="absolute inset-0 flex flex-col p-4">
                {/* window chrome */}
                <div className="flex items-center gap-3 border-b border-black/10 pb-3 dark:border-white/10">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                  <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#ff3f17] to-[#ff6a00]">
                    <BotIcon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">AI Assistant</span>
                </div>

                {/* bubbles */}
                <div className="flex flex-1 flex-col gap-3 overflow-hidden py-4">
                  <motion.div
                    className="max-w-xs self-start rounded-2xl rounded-tl-none bg-neutral-200 px-4 py-2 dark:bg-neutral-800"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Hi there! How can I help you today?
                  </motion.div>

                  <motion.div
                    className="max-w-xs self-end rounded-2xl rounded-tr-none bg-gradient-to-r from-[#ff3f17] to-[#ff6a00] px-4 py-2 text-white"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Show me cool React components!
                  </motion.div>

                  <motion.div
                    className="max-w-md self-start rounded-2xl rounded-tl-none bg-neutral-200 px-4 py-2 dark:bg-neutral-800"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    Absolutely! I can show animated cards, 3D interactions and
                    AI-powered interfaces. What would you like to see first?
                  </motion.div>

                  <motion.div
                    className="flex gap-2 self-end"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <span className="rounded-full bg-gradient-to-r from-[#ff3f17] to-[#ff6a00] px-4 py-1.5 text-sm text-white">
                      Animations
                    </span>
                    <span className="rounded-full bg-neutral-200 px-4 py-1.5 text-sm dark:bg-neutral-800">
                      AI Features
                    </span>
                  </motion.div>
                </div>

                {/* input */}
                <div className="flex gap-2 border-t border-black/10 pt-2 dark:border-white/10">
                  <div className="flex-1 rounded-full bg-neutral-200 px-4 py-2 text-sm dark:bg-neutral-800">
                    Type your message…
                  </div>
                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#ff3f17] to-[#ff6a00]"
                  >
                    <ArrowRight className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* sticker */}
            <motion.span
              className="absolute -bottom-4 -right-4 rounded-full bg-gradient-to-r from-[#ff3f17] to-[#ff6a00] px-4 py-1 text-sm font-medium text-white shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: "spring" }}
            >
              Interactive demo
            </motion.span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*                           SOCIAL LINKS                            */}
      {/* ---------------------------------------------------------------- */}
      <section className="mt-28 grid gap-12">
        <SocialLink
          icon={<Icons.linkedin />}
          label="LinkedIn"
          href="www.linkedin.com/in/shubhambhattadev"
          align="left"
        />
        <SocialLink
          icon={<Icons.github />}
          label="GitHub"
          href="https://github.com/shubhambhattacharya-dev"
          align="right"
        />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*                               FOOTER                              */}
      {/* ---------------------------------------------------------------- */}
  <motion.footer
  className="mt-24 px-4 py-8 text-center text-sm bg-gray-100 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
  <p className="text-base text-gray-700 dark:text-gray-200 tracking-wide mb-2">
    Crafted with <span className="text-red-600">❤️</span> using
    <span className="font-semibold text-blue-600"> React</span>,
    <span className="font-semibold text-pink-600"> Framer Motion</span>, and
    <span className="font-semibold text-teal-600"> Tailwind CSS</span>.
  </p>
  <p className="text-gray-600 dark:text-gray-400">
    &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
  </p>
</motion.footer>



    </motion.main>
  );
}

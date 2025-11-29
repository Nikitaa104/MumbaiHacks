"use client";

import { motion } from "motion/react";
import React from "react";
import { AuroraBackground } from "./ui/aurora-background";
import { Button } from "./ui/button";

export function AuroraBackgroundDemo() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl text-slate-900 dark:text-white text-center">
          Background lights are cool you know.
        </div>
        <div className="text-base md:text-4xl text-slate-600 dark:text-neutral-200 py-4">
          And this, is chemical burn.
        </div>
        <Button className="bg-black dark:bg-white text-white dark:text-black">
          Debug now
        </Button>
      </motion.div>
    </AuroraBackground>
  );
}

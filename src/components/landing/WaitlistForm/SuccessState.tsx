"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

/**
 * Success state component for waitlist form
 * Displays confirmation message with animated checkmark
 */
export function SuccessState() {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
      className="flex items-center justify-center px-4 py-4 sm:px-8 sm:py-6 w-full"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
          className="bg-green-500/20 rounded-full p-2 sm:p-3"
        >
          <Check className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
        </motion.div>
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white font-semibold text-base sm:text-lg"
          >
            You're on the list!
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/70 text-xs sm:text-sm"
          >
            We'll notify you when we launch
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

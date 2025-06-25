"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  errorMessage: string;
  onReset: () => void;
}

/**
 * Error state component for waitlist form
 * Displays error message with retry functionality
 */
export function ErrorState({ errorMessage, onReset }: ErrorStateProps) {
  return (
    <motion.div
      key="error"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
      className="flex items-center justify-between px-3 py-3 sm:px-6 sm:py-4"
    >
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
          className="bg-red-500/20 rounded-full p-1.5 sm:p-2 flex-shrink-0"
        >
          <X className="w-4 h-4 sm:w-6 sm:h-6 text-red-400" />
        </motion.div>
        <div className="min-w-0 flex-1">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white font-medium text-sm sm:text-base"
          >
            Something went wrong
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/70 text-xs sm:text-sm truncate"
          >
            {errorMessage}
          </motion.p>
        </div>
      </div>
      <Button
        onClick={onReset}
        size="sm"
        className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300 rounded-lg px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm ml-2 flex-shrink-0"
      >
        Try Again
      </Button>
    </motion.div>
  );
}

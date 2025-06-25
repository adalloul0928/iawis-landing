"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNewsletterSubscription } from "@/hooks/use-newsletter";
import { type NewsletterData, newsletterSchema } from "@/lib/validations";
import { ErrorState } from "./ErrorState";
import { SuccessState } from "./SuccessState";
import type { SubmissionState, WaitlistFormProps } from "./types";

/**
 * Waitlist form component with expandable input and glass morphism styling
 * Features smooth animations and form validation
 * Responsive design with mobile-optimized dimensions
 */
export function WaitlistForm({ className }: WaitlistFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("input");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm<NewsletterData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const subscription = useNewsletterSubscription();

  const handleSubmit = (values: NewsletterData) => {
    setSubmissionState("loading");
    subscription.mutate(values.email, {
      onSuccess: () => {
        setSubmissionState("success");
      },
      onError: (error) => {
        setSubmissionState("error");
        setErrorMessage(
          error.message || "Something went wrong. Please try again.",
        );
      },
    });
  };

  const resetForm = () => {
    setSubmissionState("input");
    setErrorMessage("");
    form.reset();
  };

  return (
    <div className={`flex justify-center ${className}`}>
      <motion.div
        animate={{
          width: isExpanded || submissionState !== "input" ? "400px" : "auto",
        }}
        style={{
          minWidth:
            isExpanded || submissionState !== "input" ? "400px" : "auto",
        }}
        transition={{
          type: "spring",
          bounce: 0.3,
          duration: 0.5,
        }}
        className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full shadow-lg flex items-center overflow-hidden h-[56px] sm:h-[72px]"
      >
        <AnimatePresence mode="wait">
          {!isExpanded && submissionState === "input" ? (
            <motion.div
              key="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                onClick={() => setIsExpanded(true)}
                className="bg-transparent border-none text-white hover:bg-white/10 transition-all duration-300 rounded-full px-8 py-4 sm:px-12 sm:py-6 text-lg sm:text-xl font-semibold shadow-none hover:scale-105 active:scale-95 h-full w-full"
              >
                Join the Waitlist
              </Button>
            </motion.div>
          ) : submissionState === "input" || submissionState === "loading" ? (
            <motion.form
              key="form"
              onSubmit={form.handleSubmit(handleSubmit)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0, duration: 0.3 }}
              className="flex items-center w-full px-3 py-2 sm:px-4 sm:py-3"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="flex-1 mr-3"
              >
                <Input
                  {...form.register("email")}
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent border-none text-white placeholder:text-white/60 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-transparent text-lg sm:text-xl px-4 py-4 sm:px-6 sm:py-6 w-full h-full"
                  autoFocus
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.3,
                }}
                className="flex-shrink-0"
              >
                <Button
                  type="submit"
                  disabled={submissionState === "loading"}
                  className="bg-transparent border-none text-white hover:bg-white/10 transition-all duration-300 rounded-full px-6 py-4 sm:px-8 sm:py-6 text-lg sm:text-xl font-semibold shadow-none hover:scale-105 active:scale-95 whitespace-nowrap h-full"
                >
                  {submissionState === "loading" ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      <span className="hidden sm:inline">Joining...</span>
                    </div>
                  ) : (
                    "Join the Waitlist"
                  )}
                </Button>
              </motion.div>
            </motion.form>
          ) : submissionState === "success" ? (
            <SuccessState />
          ) : submissionState === "error" ? (
            <ErrorState errorMessage={errorMessage} onReset={resetForm} />
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

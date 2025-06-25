"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNewsletterSubscription } from "@/hooks/use-newsletter";
import { type NewsletterData, newsletterSchema } from "@/lib/validations";
import { SuccessState } from "./SuccessState";
import { ErrorState } from "./ErrorState";
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
    <div className={`w-full max-w-[320px] sm:max-w-[450px] ${className}`}>
      <motion.div
        animate={{
          width: isExpanded || submissionState !== "input" ? "100%" : "auto",
          height: isExpanded || submissionState !== "input" ? "auto" : "auto",
        }}
        transition={{
          type: "spring",
          bounce: 0.3,
          duration: 0.5,
        }}
        className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full shadow-lg flex items-center overflow-hidden min-h-[56px] sm:min-h-[72px]"
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
                size="lg"
                className="bg-transparent border-none text-white hover:bg-white/10 transition-all duration-300 rounded-full px-6 py-4 sm:px-12 sm:py-8 text-lg sm:text-xl font-semibold shadow-none hover:scale-105 active:scale-95"
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
              className="flex items-center w-full pl-3 pr-2 py-2 sm:pl-4"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="flex-1"
              >
                <Input
                  {...form.register("email")}
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent border-none text-white placeholder:text-white/60 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-transparent text-lg sm:text-xl px-3 py-4 sm:px-6 sm:py-8 w-full"
                  autoFocus
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.2,
                  duration: 0.3,
                  type: "spring",
                  bounce: 0.4,
                }}
              >
                <Button
                  type="submit"
                  size="sm"
                  disabled={submissionState === "loading"}
                  className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300 rounded-full w-12 h-12 sm:w-16 sm:h-16 p-0 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  {submissionState === "loading" ? (
                    <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin" />
                  ) : (
                    <ArrowRight className="w-7 h-7 sm:w-10 sm:h-10" />
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

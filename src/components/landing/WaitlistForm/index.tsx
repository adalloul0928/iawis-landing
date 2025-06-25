"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
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
      <span className="relative inline-block overflow-hidden rounded-full p-[1px]">
        <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,rgba(255,255,255,0.4)_0deg,rgba(255,255,255,0.4)_15deg,transparent_16deg,transparent_344deg,rgba(255,255,255,0.4)_345deg)]" />
        <motion.div
          animate={{
            width: isExpanded || submissionState !== "input" ? "400px" : "auto",
          }}
          style={{
            minWidth:
              isExpanded || submissionState !== "input" ? "400px" : "auto",
            transformOrigin: "right",
          }}
          transition={{
            type: "spring",
            bounce: 0.1,
            duration: 0.5,
          }}
          className="relative bg-white/10 backdrop-blur-md text-white rounded-full shadow-lg flex items-center overflow-hidden h-[56px] sm:h-[72px]"
        >
          {submissionState === "success" ? (
            <SuccessState />
          ) : submissionState === "error" ? (
            <ErrorState errorMessage={errorMessage} onReset={resetForm} />
          ) : (
            <motion.form
              layout
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex items-center w-full h-full"
            >
              <motion.div
                layout
                animate={{
                  width: isExpanded ? "240px" : "0px",
                }}
                transition={{
                  type: "spring",
                  bounce: 0.1,
                  duration: 0.5,
                }}
                className="overflow-hidden"
              >
                {isExpanded && (
                  <Input
                    {...form.register("email")}
                    type="email"
                    placeholder="Enter your email"
                    className="bg-transparent border-none text-white placeholder:text-white/60 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-transparent text-xl sm:text-xl font-normal px-4 py-0 w-full h-full"
                    autoFocus={isExpanded}
                  />
                )}
              </motion.div>
              <motion.div layout className="flex-shrink-0">
                <Button
                  type={isExpanded ? "submit" : "button"}
                  onClick={!isExpanded ? () => setIsExpanded(true) : undefined}
                  disabled={submissionState === "loading"}
                  className="bg-white/20 border-none text-white hover:bg-white/30 transition-all duration-300 rounded-full px-6 py-4 sm:px-8 sm:py-6 text-md sm:text-base font-medium shadow-none hover:scale-105 active:scale-95 whitespace-nowrap h-full cursor-pointer"
                >
                  <div className="flex items-center justify-center min-w-[120px]">
                    {submissionState === "loading" ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Join the Waitlist"
                    )}
                  </div>
                </Button>
              </motion.div>
            </motion.form>
          )}
        </motion.div>
      </span>
    </div>
  );
}

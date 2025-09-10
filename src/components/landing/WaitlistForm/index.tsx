"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNewsletterSubscription } from "@/hooks/use-newsletter";
import { useNewsletterStorage } from "@/hooks/use-newsletter-storage";
import { type NewsletterData, newsletterSchema } from "@/lib/validations";
import { ErrorState } from "./ErrorState";
import { SuccessState } from "./SuccessState";
import type { SubmissionState, WaitlistFormProps } from "./types";

/**
 * Waitlist form component with expandable input and glass morphism styling
 * Features smooth animations and form validation
 * Responsive design with mobile-optimized dimensions
 */
export function WaitlistForm({
  className,
  onUnlockClothes,
}: WaitlistFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("input");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mobileExpandedWidth, setMobileExpandedWidth] = useState("400px");
  const wasExpandedRef = useRef(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const isDesktopSize = window.innerWidth >= 640;
      setIsDesktop(isDesktopSize);

      if (!isDesktopSize) {
        // Calculate mobile width: viewport width minus padding (32px total: 16px each side)
        const calculatedWidth = `${window.innerWidth - 32}px`;
        setMobileExpandedWidth(calculatedWidth);
      }
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const newsletterStorage = useNewsletterStorage();

  const form = useForm<NewsletterData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
  });

  const subscription = useNewsletterSubscription();

  const handleSubmit = (values: NewsletterData) => {
    setHasAttemptedSubmit(true);
    setSubmissionState("loading");
    subscription.mutate(values.email, {
      onSuccess: () => {
        newsletterStorage.markAsSubscribed(values.email, "waitlist");

        // Immediately trigger the fade-to-black transition to carousel
        onUnlockClothes?.();
      },
      onError: (error) => {
        setSubmissionState("error");
        setErrorMessage(
          error.message || "Something went wrong. Please try again.",
        );
      },
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Only process submission if the form was already expanded before this event
    // This prevents submission when the button click is just expanding the form
    if (wasExpandedRef.current) {
      setHasAttemptedSubmit(true);
      form.handleSubmit(handleSubmit)(e);
    }
  };

  const resetForm = () => {
    setSubmissionState("input");
    setErrorMessage("");
    setHasAttemptedSubmit(false);
    wasExpandedRef.current = false;
    form.reset();
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <span
        className="relative inline-block overflow-hidden rounded-full p-[1px]"
        style={{
          boxShadow:
            "0 0 20px rgba(255,255,255,0.3), inset 0 0 20px rgba(255,255,255,0.1)",
        }}
      >
        <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,rgba(255,255,255,0.4)_0deg,rgba(255,255,255,0.4)_15deg,transparent_16deg,transparent_344deg,rgba(255,255,255,0.4)_345deg)]" />
        <motion.div
          animate={{
            width:
              isExpanded || submissionState !== "input"
                ? isDesktop
                  ? "480px"
                  : mobileExpandedWidth
                : "auto",
          }}
          style={{
            minWidth:
              isExpanded || submissionState !== "input"
                ? isDesktop
                  ? "480px"
                  : mobileExpandedWidth
                : "auto",
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
              onSubmit={handleFormSubmit}
              className="flex items-center w-full h-full"
              noValidate
            >
              <motion.div
                layout
                animate={{
                  width: isExpanded
                    ? isDesktop
                      ? "320px"
                      : `${parseInt(mobileExpandedWidth) - 160}px`
                    : "0px",
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
                    className="bg-transparent border-none text-white placeholder:text-white/60 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-transparent text-lg sm:text-3xl font-normal px-4 py-0 w-full h-full"
                    autoFocus={isExpanded}
                  />
                )}
              </motion.div>
              <motion.div layout className="flex-shrink-0">
                <Button
                  type={isExpanded ? "submit" : "button"}
                  onClick={
                    !isExpanded
                      ? () => {
                          wasExpandedRef.current = false;
                          setIsExpanded(true);
                        }
                      : () => {
                          wasExpandedRef.current = true;
                        }
                  }
                  disabled={submissionState === "loading"}
                  className="bg-white/20 border-none text-white hover:bg-white/30 transition-all duration-300 rounded-full px-6 py-4 sm:px-8 sm:py-6 text-md sm:text-base font-medium shadow-none hover:scale-105 active:scale-95 whitespace-nowrap h-full cursor-pointer"
                >
                  <div className="flex items-center justify-center min-w-[120px]">
                    {submissionState === "loading" ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : isExpanded ? (
                      "Unlock Clothes"
                    ) : (
                      "Join The Wet List"
                    )}
                  </div>
                </Button>
              </motion.div>
            </motion.form>
          )}
        </motion.div>
      </span>

      {/* Custom validation error display */}
      {hasAttemptedSubmit && form.formState.errors.email && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-3 px-4 py-2 bg-white/10 backdrop-blur-md border border-red-400/30 rounded-lg text-white/90 text-sm max-w-sm text-center"
          style={{
            boxShadow:
              "0 0 15px rgba(239, 68, 68, 0.2), inset 0 0 15px rgba(255,255,255,0.1)",
          }}
        >
          {form.formState.errors.email.message}
        </motion.div>
      )}
    </div>
  );
}

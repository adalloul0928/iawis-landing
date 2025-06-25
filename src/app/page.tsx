"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check, X, Loader2 } from "lucide-react";
import { useNewsletterSubscription } from "@/hooks/use-newsletter";
import { type NewsletterData, newsletterSchema } from "@/lib/validations";

type SubmissionState = 'input' | 'loading' | 'success' | 'error';

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>('input');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const form = useForm<NewsletterData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const subscription = useNewsletterSubscription();

  const handleSubmit = (values: NewsletterData) => {
    setSubmissionState('loading');
    subscription.mutate(values.email, {
      onSuccess: () => {
        setSubmissionState('success');
      },
      onError: (error) => {
        setSubmissionState('error');
        setErrorMessage(error.message || 'Something went wrong. Please try again.');
      },
    });
  };

  const resetForm = () => {
    setSubmissionState('input');
    setErrorMessage('');
    form.reset();
  };

  // Success Component
  const SuccessState = () => (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
      className="flex items-center justify-center px-8 py-6"
    >
      <div className="flex items-center gap-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
          className="bg-green-500/20 rounded-full p-3"
        >
          <Check className="w-8 h-8 text-green-400" />
        </motion.div>
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white font-semibold text-lg"
          >
            You're on the list!
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/70 text-sm"
          >
            We'll notify you when we launch
          </motion.p>
        </div>
      </div>
    </motion.div>
  );

  // Error Component
  const ErrorState = () => (
    <motion.div
      key="error"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
      className="flex items-center justify-between px-6 py-4"
    >
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
          className="bg-red-500/20 rounded-full p-2"
        >
          <X className="w-6 h-6 text-red-400" />
        </motion.div>
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white font-medium text-base"
          >
            Oops, something went wrong
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/70 text-sm"
          >
            {errorMessage}
          </motion.p>
        </div>
      </div>
      <Button
        onClick={resetForm}
        size="sm"
        className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300 rounded-lg px-4 py-2 text-sm"
      >
        Try Again
      </Button>
    </motion.div>
  );

  return (
    <div className="relative h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/seattle.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Expandable Waitlist Input */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div 
          animate={{ 
            width: isExpanded || submissionState !== 'input' ? 450 : "auto",
            height: isExpanded || submissionState !== 'input' ? 72 : "auto"
          }}
          transition={{ 
            type: "spring", 
            bounce: 0.3, 
            duration: 0.6 
          }}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full shadow-lg flex items-center overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {!isExpanded && submissionState === 'input' ? (
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
                  className="bg-transparent border-none text-white hover:bg-white/10 transition-all duration-300 rounded-full px-12 py-8 text-xl font-semibold shadow-none hover:scale-105 active:scale-95"
                >
                  Join the Waitlist
                </Button>
              </motion.div>
            ) : submissionState === 'input' || submissionState === 'loading' ? (
              <motion.form 
                key="form"
                onSubmit={form.handleSubmit(handleSubmit)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="flex items-center w-full pl-4 pr-2 py-2"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="flex-1"
                >
                  <Input
                    {...form.register('email')}
                    type="email"
                    placeholder="Enter your email"
                    className="bg-transparent border-none text-white placeholder:text-white/60 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-transparent text-xl px-6 py-8 w-full"
                    autoFocus
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.3, type: "spring", bounce: 0.4 }}
                >
                  <Button
                    type="submit"
                    size="sm"
                    disabled={submissionState === 'loading'}
                    className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300 rounded-full w-16 h-16 p-0 shadow-lg hover:shadow-xl flex items-center justify-center"
                  >
                    {submissionState === 'loading' ? (
                      <Loader2 className="w-8 h-8 animate-spin" />
                    ) : (
                      <ArrowRight className="w-10 h-10" />
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            ) : submissionState === 'success' ? (
              <SuccessState />
            ) : submissionState === 'error' ? (
              <ErrorState />
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
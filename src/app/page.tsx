"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check, X, Loader2, Twitter, Instagram } from "lucide-react";
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

  // Custom TikTok Icon Component
  const TikTokIcon = ({ className }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M19.321 5.562a5.122 5.122 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.944-1.316-2.17-1.316-3.456 0-.085-.003-.17-.009-.254h3.3v3.934zM9.372 18.385c-1.813 0-3.291-1.478-3.291-3.291s1.478-3.291 3.291-3.291 3.291 1.478 3.291 3.291-1.478 3.291-3.291 3.291zm7.943-8.82v2.616c-1.18 0-2.315-.377-3.252-1.08v5.087c0 2.617-2.122 4.74-4.74 4.74s-4.74-2.123-4.74-4.74 2.123-4.74 4.74-4.74c.308 0 .607.03.893.087v2.713a2.042 2.042 0 0 0-.893-.202c-1.188 0-2.154.966-2.154 2.154s.966 2.154 2.154 2.154 2.154-.966 2.154-2.154V.388h2.586c.202 1.725.995 3.278 2.252 4.39z"/>
    </svg>
  );

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
      
      {/* Social Media Icons - Top Right */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        className="absolute top-6 right-6 flex gap-4"
      >
        {[
          { 
            icon: Twitter, 
            href: "https://twitter.com/alwayswetseattle",
            label: "Twitter"
          },
          { 
            icon: Instagram, 
            href: "https://instagram.com/alwayswetseattle",
            label: "Instagram"
          },
          { 
            icon: TikTokIcon, 
            href: "https://tiktok.com/@alwayswetseattle",
            label: "TikTok"
          }
        ].map((social, index) => (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.4, 
              delay: 0.7 + index * 0.1,
              type: "spring",
              bounce: 0.4
            }}
            whileHover={{ 
              scale: 1.1,
              backgroundColor: "rgba(255, 255, 255, 0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 hover:shadow-lg"
            aria-label={social.label}
          >
            <social.icon className="w-5 h-5" />
          </motion.a>
        ))}
      </motion.div>
      
      {/* Centered Logo */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <Image
          src="/alwayswet.png"
          alt="It's Always Wet In Seattle"
          width={400}
          height={400}
          className="drop-shadow-2xl"
          priority
        />
      </motion.div>
      
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
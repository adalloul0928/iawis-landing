"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNewsletterSubscription } from "@/hooks/use-newsletter";
import { useNewsletterStorage } from "@/hooks/use-newsletter-storage";
import { type NewsletterData, newsletterSchema } from "@/lib/validations";

interface NewsletterFormProps {
  compact?: boolean;
}

export function NewsletterForm({ compact = false }: NewsletterFormProps) {
  const [showAlreadySubscribed, setShowAlreadySubscribed] = useState(false);
  
  const form = useForm<NewsletterData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const subscription = useNewsletterSubscription();
  const newsletterStorage = useNewsletterStorage();

  useEffect(() => {
    if (newsletterStorage.isSubscribed) {
      setShowAlreadySubscribed(true);
    }
  }, [newsletterStorage.isSubscribed]);

  function onSubmit(values: NewsletterData) {
    subscription.mutate(values.email, {
      onSuccess: () => {
        newsletterStorage.markAsSubscribed(values.email, 'newsletter');
        toast.success(
          "Thanks for subscribing! Please check your email to confirm your subscription.",
        );
        form.reset();
        setShowAlreadySubscribed(true);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  }
  
  const handleSubscribeWithDifferentEmail = () => {
    newsletterStorage.clearSubscription();
    setShowAlreadySubscribed(false);
  };

  if (showAlreadySubscribed) {
    return (
      <div className="text-center space-y-3">
        <p className="text-green-600 font-medium">
          ✓ You're already subscribed! ({newsletterStorage.subscribedEmail})
        </p>
        <button
          type="button"
          onClick={handleSubscribeWithDifferentEmail}
          className="text-sm text-gray-600 hover:text-gray-800 underline"
        >
          Subscribe with a different email?
        </button>
      </div>
    );
  }

  if (compact) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={subscription.isPending}>
            {subscription.isPending ? "..." : "Subscribe"}
          </Button>
        </form>
      </Form>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={subscription.isPending}
          className="w-full"
        >
          {subscription.isPending
            ? "Subscribing..."
            : "Subscribe to Newsletter"}
        </Button>
      </form>
    </Form>
  );
}

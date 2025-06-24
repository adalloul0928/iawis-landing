"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { type NewsletterData, newsletterSchema } from "@/lib/validations";

interface NewsletterFormProps {
  compact?: boolean;
}

export function NewsletterForm({ compact = false }: NewsletterFormProps) {
  const form = useForm<NewsletterData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const subscription = useNewsletterSubscription();

  function onSubmit(values: NewsletterData) {
    subscription.mutate(values.email, {
      onSuccess: () => {
        toast.success(
          "Thanks for subscribing! Please check your email to confirm your subscription.",
        );
        form.reset();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
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

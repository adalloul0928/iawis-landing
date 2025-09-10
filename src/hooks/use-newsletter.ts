import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleSupabaseError } from "@/lib/errors";
import { createClient } from "@/lib/supabase/client";
import type { NewsletterSubscriber } from "@/lib/supabase/types";

// Query keys factory
export const newsletterKeys = {
  all: ["newsletter"] as const,
  subscribers: () => [...newsletterKeys.all, "subscribers"] as const,
  subscriber: (email: string) =>
    [...newsletterKeys.all, "subscriber", email] as const,
  verification: (token: string) =>
    [...newsletterKeys.all, "verification", token] as const,
};

// Newsletter subscription functions
export async function subscribeToNewsletter(
  email: string,
): Promise<NewsletterSubscriber> {
  const supabase = createClient();

  // First, check if the email already exists
  const { data: existingSubscriber } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .eq("email", email)
    .single();

  // If email already exists, return the existing subscriber
  if (existingSubscriber) {
    return existingSubscriber;
  }

  // Generate tokens
  const verificationToken = crypto.randomUUID();
  const unsubscribeToken = crypto.randomUUID();

  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .insert({
      email,
      verified: false,
      verification_token: verificationToken,
      unsubscribe_token: unsubscribeToken,
    })
    .select()
    .single();

  if (error) {
    handleSupabaseError(error);
  }

  return data;
}

export async function verifySubscription(
  token: string,
): Promise<NewsletterSubscriber> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .update({ verified: true, verification_token: null })
    .eq("verification_token", token)
    .select()
    .single();

  if (error) {
    handleSupabaseError(error);
  }

  if (!data) {
    throw new Error("Verification token not found or already used.");
  }

  return data;
}

export async function unsubscribeFromNewsletter(token: string): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase
    .from("newsletter_subscribers")
    .delete()
    .eq("unsubscribe_token", token);

  if (error) {
    handleSupabaseError(error);
  }
}

export async function checkSubscriptionStatus(
  email: string,
): Promise<NewsletterSubscriber | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .eq("email", email)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 = "The result contains 0 rows"
    handleSupabaseError(error);
  }

  return data || null;
}

export async function getAllSubscribers(): Promise<NewsletterSubscriber[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    handleSupabaseError(error);
  }

  return data || [];
}

// React Query Hooks
export function useNewsletterSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: subscribeToNewsletter,
    onSuccess: (data) => {
      // Invalidate and refetch subscribers list
      queryClient.invalidateQueries({ queryKey: newsletterKeys.subscribers() });

      // Update the specific subscriber in cache
      queryClient.setQueryData(newsletterKeys.subscriber(data.email), data);
    },
    onError: (error: Error) => {
      console.error("Newsletter subscription failed:", error);
    },
  });
}

export function useVerifySubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifySubscription,
    onSuccess: (data) => {
      // Invalidate and refetch subscribers list
      queryClient.invalidateQueries({ queryKey: newsletterKeys.subscribers() });

      // Update the specific subscriber in cache
      queryClient.setQueryData(newsletterKeys.subscriber(data.email), data);

      // Remove verification query from cache
      if (data.verification_token) {
        queryClient.removeQueries({
          queryKey: newsletterKeys.verification(data.verification_token),
        });
      }
    },
    onError: (error: Error) => {
      console.error("Email verification failed:", error);
    },
  });
}

export function useUnsubscribe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unsubscribeFromNewsletter,
    onSuccess: () => {
      // Invalidate and refetch subscribers list
      queryClient.invalidateQueries({ queryKey: newsletterKeys.subscribers() });
    },
    onError: (error: Error) => {
      console.error("Unsubscribe failed:", error);
    },
  });
}

export function useSubscriptionStatus(email: string, enabled = true) {
  return useQuery({
    queryKey: newsletterKeys.subscriber(email),
    queryFn: () => checkSubscriptionStatus(email),
    enabled: enabled && !!email,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}

export function useNewsletterSubscribers() {
  return useQuery({
    queryKey: newsletterKeys.subscribers(),
    queryFn: getAllSubscribers,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

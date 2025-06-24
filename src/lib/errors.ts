// Error handling utilities for Supabase operations

export class NewsletterError extends Error {
  public readonly code: string;
  public readonly details?: unknown;

  constructor(message: string, code: string, details?: unknown) {
    super(message);
    this.name = "NewsletterError";
    this.code = code;
    this.details = details;
  }
}

export function handleSupabaseError(error: unknown): never {
  console.error("Supabase error:", error);

  // Handle specific Supabase error codes
  const errorObj = error as { code?: string; message?: string };
  switch (errorObj.code) {
    case "23505": // Unique constraint violation
      throw new NewsletterError(
        "This email is already subscribed to our newsletter.",
        "DUPLICATE_EMAIL",
        error,
      );

    case "PGRST116": // No rows returned
      throw new NewsletterError("Subscription not found.", "NOT_FOUND", error);

    case "PGRST103": // Insufficient privilege
      throw new NewsletterError(
        "Access denied. Please contact support.",
        "ACCESS_DENIED",
        error,
      );

    case "22001": // String data right truncation
      throw new NewsletterError(
        "Email address is too long.",
        "INVALID_INPUT",
        error,
      );

    case "23502": // Not null violation
      throw new NewsletterError(
        "Required information is missing.",
        "MISSING_REQUIRED_FIELD",
        error,
      );

    default: {
      // Generic error handling
      const message = errorObj.message || "An unexpected error occurred.";
      throw new NewsletterError(message, "UNKNOWN_ERROR", error);
    }
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof NewsletterError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "An unexpected error occurred. Please try again.";
}

export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.message.includes("fetch") ||
      error.message.includes("network") ||
      error.message.includes("connection") ||
      error.message.toLowerCase().includes("offline")
    );
  }
  return false;
}

export function getRetryMessage(error: unknown): string {
  if (isNetworkError(error)) {
    return "Connection issue detected. Please check your internet connection and try again.";
  }

  if (error instanceof NewsletterError) {
    switch (error.code) {
      case "DUPLICATE_EMAIL":
        return "You're already subscribed! Check your email for confirmation.";
      case "NOT_FOUND":
        return "This link may have expired. Please try subscribing again.";
      case "ACCESS_DENIED":
        return "Permission error. Please contact our support team.";
      default:
        return "Please try again or contact support if the issue persists.";
    }
  }

  return "Please try again. If the problem continues, contact our support team.";
}

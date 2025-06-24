"use client";

import { CheckCircleIcon, LoaderIcon, XCircleIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useVerifySubscription } from "@/hooks/use-newsletter";

export function VerificationPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const verification = useVerifySubscription();

  useEffect(() => {
    if (token && !verification.data && !verification.isError) {
      verification.mutate(token);
    }
  }, [token, verification]);

  if (!token) {
    return (
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <XCircleIcon className="size-5 text-destructive" />
            Invalid Link
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This verification link is invalid or has expired. Please try
            subscribing again.
          </p>
          <Button asChild className="mt-4 w-full">
            <a href="/">Return to Homepage</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (verification.isPending) {
    return (
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LoaderIcon className="size-5 animate-spin" />
            Verifying Your Subscription
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Please wait while we verify your email address...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (verification.isError) {
    return (
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <XCircleIcon className="size-5 text-destructive" />
            Verification Failed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            {verification.error?.message ||
              "We couldn't verify your email address. The link may have expired or been used already."}
          </p>
          <Button asChild className="w-full">
            <a href="/">Return to Homepage</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (verification.data) {
    return (
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircleIcon className="size-5 text-green-600" />
            Email Verified!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Thank you for confirming your email address. You're now successfully
            subscribed to our newsletter and will receive updates at{" "}
            <strong>{verification.data.email}</strong>.
          </p>
          <Button asChild className="w-full">
            <a href="/">Return to Homepage</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return null;
}

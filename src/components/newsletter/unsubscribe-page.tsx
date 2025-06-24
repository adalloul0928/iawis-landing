"use client";

import { CheckCircleIcon, LoaderIcon, XCircleIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUnsubscribe } from "@/hooks/use-newsletter";

export function UnsubscribePage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const unsubscribe = useUnsubscribe();
  const [hasAttempted, setHasAttempted] = useState(false);

  const handleUnsubscribe = () => {
    if (token) {
      setHasAttempted(true);
      unsubscribe.mutate(token, {
        onSuccess: () => {
          toast.success("You have been successfully unsubscribed.");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    }
  };

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
            This unsubscribe link is invalid or has expired. Please contact
            support if you need help unsubscribing.
          </p>
          <Button asChild className="mt-4 w-full">
            <a href="/">Return to Homepage</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (unsubscribe.isPending) {
    return (
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LoaderIcon className="size-5 animate-spin" />
            Unsubscribing...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Please wait while we process your unsubscribe request...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (unsubscribe.isSuccess) {
    return (
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircleIcon className="size-5 text-green-600" />
            Successfully Unsubscribed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            You have been successfully removed from our newsletter list. You
            will no longer receive emails from us.
          </p>
          <p className="text-muted-foreground mb-4">
            We're sorry to see you go! If you change your mind, you can always
            subscribe again from our homepage.
          </p>
          <Button asChild className="w-full">
            <a href="/">Return to Homepage</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (unsubscribe.isError && hasAttempted) {
    return (
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <XCircleIcon className="size-5 text-destructive" />
            Unsubscribe Failed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            {unsubscribe.error?.message ||
              "We couldn't process your unsubscribe request. Please try again or contact support."}
          </p>
          <div className="flex gap-2">
            <Button
              onClick={handleUnsubscribe}
              variant="outline"
              className="flex-1"
            >
              Try Again
            </Button>
            <Button asChild className="flex-1">
              <a href="/">Homepage</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Initial state - show confirmation
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Unsubscribe from Newsletter</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Are you sure you want to unsubscribe from our newsletter? You will no
          longer receive updates and announcements from us.
        </p>
        <div className="flex gap-2">
          <Button
            onClick={handleUnsubscribe}
            variant="destructive"
            className="flex-1"
          >
            Yes, Unsubscribe
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <a href="/">Cancel</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

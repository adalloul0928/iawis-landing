"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircleIcon, XCircleIcon, DatabaseIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { createClient } from "@/lib/supabase/client";

function ConnectionStatus({ 
  status, 
  errorMessage 
}: { 
  status: "checking" | "connected" | "error"; 
  errorMessage: string; 
}) {
  switch (status) {
    case "checking":
      return (
        <div className="flex items-center gap-2 text-blue-600">
          <DatabaseIcon className="size-5 animate-pulse" />
          <span>Testing Supabase connection...</span>
        </div>
      );
    case "connected":
      return (
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircleIcon className="size-5" />
          <span>✅ Supabase connected successfully!</span>
        </div>
      );
    case "error":
      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-red-600">
            <XCircleIcon className="size-5" />
            <span>❌ Connection failed</span>
          </div>
          <p className="text-sm text-red-500 ml-7">
            {errorMessage}
          </p>
        </div>
      );
  }
}

export default function TestNewsletterPage() {
  const [connectionStatus, setConnectionStatus] = useState<"checking" | "connected" | "error">("checking");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    async function testConnection() {
      try {
        const supabase = createClient();
        
        // Simple test query to check connection
        const { error } = await supabase
          .from("newsletter_subscribers")
          .select("count", { count: "exact", head: true });

        if (error) {
          throw error;
        }

        setConnectionStatus("connected");
      } catch (error) {
        setConnectionStatus("error");
        setErrorMessage(error instanceof Error ? error.message : "Unknown error");
      }
    }

    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Newsletter Test Page</h1>
          <p className="text-muted-foreground">
            Test your Supabase connection and newsletter signup functionality
          </p>
          <Button asChild variant="outline">
            <Link href="/">← Back to Homepage</Link>
          </Button>
        </div>

        {/* Connection Status */}
        <Card>
          <CardHeader>
            <CardTitle>Database Connection</CardTitle>
          </CardHeader>
          <CardContent>
            <ConnectionStatus status={connectionStatus} errorMessage={errorMessage} />
          </CardContent>
        </Card>

        {/* Newsletter Test Form */}
        <Card>
          <CardHeader>
            <CardTitle>Test Newsletter Signup</CardTitle>
            <p className="text-sm text-muted-foreground">
              Try subscribing with a test email to verify the form works
            </p>
          </CardHeader>
          <CardContent>
            <NewsletterForm />
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>How to Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">1. Check Connection Status</h4>
              <p className="text-sm text-muted-foreground">
                Make sure the "Database Connection" shows as connected above.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">2. Test Newsletter Signup</h4>
              <p className="text-sm text-muted-foreground">
                Enter a test email and click subscribe. You should see a success message.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">3. Verify in Supabase</h4>
              <p className="text-sm text-muted-foreground">
                Go to your Supabase dashboard → Table Editor → newsletter_subscribers 
                and check if your test email appears.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">4. Test Error Handling</h4>
              <p className="text-sm text-muted-foreground">
                Try subscribing with the same email twice to test duplicate email handling.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Debug Info */}
        <Card>
          <CardHeader>
            <CardTitle>Debug Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm space-y-1">
              <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
              <p><strong>Supabase URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing"}</p>
              <p><strong>Supabase Key:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing"}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
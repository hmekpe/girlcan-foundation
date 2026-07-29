"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream-50 px-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600">
        <Heart className="h-6 w-6" aria-hidden />
      </span>
      <h1 className="mt-6 font-display text-4xl font-bold text-ink-900">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-ink-600">
        We hit an unexpected bump. Please try again, or head back home while we
        sort things out.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button onClick={reset}>Try again</Button>
        <Button asChild variant="secondary">
          <Link href="/">Return home</Link>
        </Button>
      </div>
    </div>
  );
}

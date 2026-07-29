import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream-50 px-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600">
        <Heart className="h-6 w-6" aria-hidden />
      </span>
      <h1 className="mt-6 font-display text-4xl font-bold text-ink-900">Page not found</h1>
      <p className="mt-4 max-w-md text-ink-600">
        The page you are looking for may have moved or no longer exists. She is
        still strong. She is still capable. She can — and so can you, by finding
        your way back.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button asChild>
          <Link href="/">Return home</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/contact">Contact us</Link>
        </Button>
      </div>
    </div>
  );
}

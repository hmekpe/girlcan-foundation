"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { newsletterSchema, type NewsletterInput } from "@/lib/validations";
import { submitNewsletter } from "@/app/actions/forms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type NewsletterFormProps = {
  compact?: boolean;
};

export function NewsletterForm({ compact }: NewsletterFormProps) {
  const [pending, setPending] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
  });

  async function onSubmit(data: NewsletterInput) {
    setPending(true);
    const result = await submitNewsletter(data);
    setPending(false);

    if (result.success) {
      toast.success("You're subscribed. Welcome to the community.");
      reset();
    } else {
      toast.error(result.error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={compact ? "flex flex-col gap-3 sm:flex-row" : "space-y-4"}
    >
      <div className={compact ? "flex-1 space-y-1" : "space-y-2"}>
        {!compact && <Label htmlFor="newsletter-email">Email address</Label>}
        <Input
          id="newsletter-email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          autoComplete="email"
          aria-label="Email address"
        />
        {errors.email && (
          <p className="text-sm text-state-error">{errors.email.message}</p>
        )}
      </div>
      <Button type="submit" disabled={pending} className={compact ? "shrink-0" : ""}>
        {pending ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  );
}

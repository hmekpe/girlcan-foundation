"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { eventRegistrationSchema, type EventRegistrationInput } from "@/lib/validations";
import { submitEventRegistration } from "@/app/actions/forms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type EventRsvpFormProps = {
  eventId: string;
  registrationOpen: boolean;
};

export function EventRsvpForm({ eventId, registrationOpen }: EventRsvpFormProps) {
  const [pending, setPending] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventRegistrationInput>({
    resolver: zodResolver(eventRegistrationSchema),
    defaultValues: { eventId },
  });

  async function onSubmit(data: EventRegistrationInput) {
    setPending(true);
    const result = await submitEventRegistration(data);
    setPending(false);

    if (result.success) {
      toast.success("You're registered. We look forward to seeing you there.");
      reset({ eventId });
    } else {
      toast.error(result.error);
    }
  }

  if (!registrationOpen) {
    return (
      <p className="rounded-2xl border border-cream-300 bg-cream-100 px-4 py-3 text-sm text-ink-600">
        Registration for this event is currently closed.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <input type="hidden" {...register("eventId")} />
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="rsvp-name">Full name</Label>
          <Input id="rsvp-name" {...register("name")} autoComplete="name" />
          {errors.name && (
            <p className="text-sm text-state-error">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="rsvp-email">Email</Label>
          <Input
            id="rsvp-email"
            type="email"
            {...register("email")}
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-sm text-state-error">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="rsvp-phone">Phone (optional)</Label>
        <Input id="rsvp-phone" type="tel" {...register("phone")} autoComplete="tel" />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Registering..." : "Register for this event"}
      </Button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { volunteerSchema, type VolunteerInput } from "@/lib/validations";
import { submitVolunteer } from "@/app/actions/forms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function VolunteerForm() {
  const [pending, setPending] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VolunteerInput>({
    resolver: zodResolver(volunteerSchema),
  });

  async function onSubmit(data: VolunteerInput) {
    setPending(true);
    const result = await submitVolunteer(data);
    setPending(false);

    if (result.success) {
      toast.success("Thank you for offering your time. We'll be in touch soon.");
      reset();
    } else {
      toast.error(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="volunteer-name">Full name</Label>
          <Input id="volunteer-name" {...register("name")} autoComplete="name" />
          {errors.name && (
            <p className="text-sm text-state-error">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="volunteer-email">Email</Label>
          <Input
            id="volunteer-email"
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
        <Label htmlFor="volunteer-phone">Phone (optional)</Label>
        <Input id="volunteer-phone" type="tel" {...register("phone")} autoComplete="tel" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="volunteer-message">How would you like to help?</Label>
        <Textarea
          id="volunteer-message"
          rows={5}
          placeholder="Tell us about your skills, availability, and what draws you to this work."
          {...register("message")}
        />
        {errors.message && (
          <p className="text-sm text-state-error">{errors.message.message}</p>
        )}
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Apply to volunteer"}
      </Button>
    </form>
  );
}

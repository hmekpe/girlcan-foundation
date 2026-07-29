"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { partnerSchema, type PartnerInput } from "@/lib/validations";
import { submitPartner } from "@/app/actions/forms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function PartnerForm() {
  const [pending, setPending] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PartnerInput>({
    resolver: zodResolver(partnerSchema),
  });

  async function onSubmit(data: PartnerInput) {
    setPending(true);
    const result = await submitPartner(data);
    setPending(false);

    if (result.success) {
      toast.success("Thank you for reaching out. Our team will follow up shortly.");
      reset();
    } else {
      toast.error(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="partner-org">Organisation name</Label>
          <Input id="partner-org" {...register("orgName")} />
          {errors.orgName && (
            <p className="text-sm text-state-error">{errors.orgName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="partner-contact">Contact name</Label>
          <Input id="partner-contact" {...register("contactName")} autoComplete="name" />
          {errors.contactName && (
            <p className="text-sm text-state-error">{errors.contactName.message}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="partner-email">Email</Label>
        <Input
          id="partner-email"
          type="email"
          {...register("email")}
          autoComplete="email"
        />
        {errors.email && (
          <p className="text-sm text-state-error">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="partner-message">Tell us about your partnership idea</Label>
        <Textarea id="partner-message" rows={5} {...register("message")} />
        {errors.message && (
          <p className="text-sm text-state-error">{errors.message.message}</p>
        )}
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Send partnership inquiry"}
      </Button>
    </form>
  );
}

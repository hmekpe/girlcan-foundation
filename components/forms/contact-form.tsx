"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { submitContact } from "@/app/actions/forms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type ContactFormProps = {
  defaultSubject?: string;
};

export function ContactForm({ defaultSubject }: ContactFormProps) {
  const [pending, setPending] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: defaultSubject ?? "" },
  });

  async function onSubmit(data: ContactInput) {
    setPending(true);
    const result = await submitContact(data);
    setPending(false);

    if (result.success) {
      toast.success("Message sent. We'll be in touch soon.");
      reset({ subject: defaultSubject ?? "" });
    } else {
      toast.error(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">Name</Label>
          <Input id="contact-name" {...register("name")} autoComplete="name" />
          {errors.name && (
            <p className="text-sm text-state-error">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
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
        <Label htmlFor="contact-subject">Subject</Label>
        <Input id="contact-subject" {...register("subject")} />
        {errors.subject && (
          <p className="text-sm text-state-error">{errors.subject.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea id="contact-message" rows={5} {...register("message")} />
        {errors.message && (
          <p className="text-sm text-state-error">{errors.message.message}</p>
        )}
      </div>
      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}

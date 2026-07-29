"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { donationSchema, type DonationInput } from "@/lib/validations";
import { DONATION_IMPACT, type DonationTier } from "@/lib/constants";
import { startDonation } from "@/app/actions/donate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type DonateFormProps = {
  tiers?: DonationTier[];
};

export function DonateForm({ tiers }: DonateFormProps) {
  const impactMap =
    tiers && tiers.length > 0
      ? Object.fromEntries(tiers.map((t) => [t.amount, t.outcomeText]))
      : DONATION_IMPACT;

  const presets = Object.keys(impactMap).map(Number).sort((a, b) => a - b);

  const [pending, setPending] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(
    presets.includes(100) ? 100 : presets[0] ?? null
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DonationInput>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      currency: "GHS",
      frequency: "MONTHLY",
      provider: "PAYSTACK",
      amount: presets.includes(100) ? 100 : presets[0] ?? 100,
    },
  });

  const currency = watch("currency");
  const frequency = watch("frequency");
  const amount = watch("amount");

  function handleCurrencyChange(next: "GHS" | "USD") {
    setValue("currency", next);
    setValue("provider", next === "GHS" ? "PAYSTACK" : "STRIPE");
  }

  function handlePreset(value: number) {
    setSelectedPreset(value);
    setValue("amount", value, { shouldValidate: true });
  }

  async function onSubmit(data: DonationInput) {
    setPending(true);
    const result = await startDonation(data);
    setPending(false);

    if (result.success) {
      window.location.href = result.url;
    } else {
      toast.error(result.error);
    }
  }

  const impactKey = presets.find((p) => p === Number(amount)) ?? null;
  const impactText =
    currency === "GHS" && impactKey
      ? impactMap[impactKey]
      : amount
        ? `Your gift of ${currency} ${amount} helps girls discover their strength and lead boldly.`
        : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <input type="hidden" {...register("provider")} />

      <div className="space-y-3">
        <Label>Join as a Sustaining Supporter</Label>
        <div className="inline-flex w-full max-w-xs rounded-full bg-rose-pale p-1">
          {(["MONTHLY", "ONE_TIME"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setValue("frequency", f)}
              className={cn(
                "min-h-[44px] flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                frequency === f
                  ? "bg-rose text-white shadow-sm"
                  : "text-muted hover:text-text"
              )}
            >
              {f === "ONE_TIME" ? "One-time" : "Monthly"}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label>Currency</Label>
        <div className="inline-flex w-full max-w-xs rounded-full bg-rose-pale p-1">
          {(["GHS", "USD"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => handleCurrencyChange(c)}
              className={cn(
                "min-h-[44px] flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                currency === c
                  ? "bg-rose text-white shadow-sm"
                  : "text-muted hover:text-text"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {currency === "GHS" && (
        <div className="space-y-3">
          <Label>Choose an amount</Label>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handlePreset(preset)}
                className={cn(
                  "min-h-[44px] rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  selectedPreset === preset
                    ? "border-rose bg-rose-pale text-rose"
                    : "border-rose-pale bg-cream text-text hover:border-rose"
                )}
              >
                GHS {preset}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="donate-amount">
          {currency === "GHS" ? "Amount (GHS)" : "Amount (USD)"}
        </Label>
        <Input
          id="donate-amount"
          type="number"
          min={1}
          step={1}
          className="min-h-[44px]"
          {...register("amount", {
            valueAsNumber: true,
            onChange: () => setSelectedPreset(null),
          })}
        />
        {errors.amount && (
          <p className="text-sm text-state-error">{errors.amount.message}</p>
        )}
      </div>

      {impactText && (
        <p className="rounded-2xl border border-gold-light/50 bg-gold-light/20 px-4 py-3 text-sm text-text">
          {impactText}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="donate-name">Full name</Label>
          <Input id="donate-name" className="min-h-[44px]" {...register("name")} autoComplete="name" />
          {errors.name && (
            <p className="text-sm text-state-error">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="donate-email">Email</Label>
          <Input
            id="donate-email"
            type="email"
            className="min-h-[44px]"
            {...register("email")}
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-sm text-state-error">{errors.email.message}</p>
          )}
        </div>
      </div>

      <p className="text-xs text-muted">
        Card payments are processed securely by{" "}
        {currency === "GHS" ? "Paystack" : "Stripe"}. We never store your card
        details on our servers.
      </p>

      <Button type="submit" disabled={pending} size="lg" className="w-full sm:w-auto">
        {pending ? "Redirecting..." : "Continue to payment"}
      </Button>
    </form>
  );
}

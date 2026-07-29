import { prisma } from "@/lib/prisma";
import { TestimonialsClient } from "@/components/admin/testimonials-client";

export default async function TestimonialsPage() {
  const [testimonials, programs] = await Promise.all([
    prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.program.findMany({ select: { id: true, title: true }, orderBy: { title: "asc" } }),
  ]);

  return <TestimonialsClient testimonials={testimonials} programs={programs} />;
}

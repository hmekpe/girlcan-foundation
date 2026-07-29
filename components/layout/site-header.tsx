"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NAV_LINKS, VISITOR_ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-rose/10 bg-cream/92 py-3 shadow-brand backdrop-blur-md"
          : "border-rose/10 bg-cream/92 py-4 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="logo-teardrop flex h-9 w-9 items-center justify-center bg-rose text-white">
            <Sparkles className="h-4 w-4" aria-hidden />
          </span>
          <span className="font-display text-lg font-extrabold leading-tight sm:text-xl">
            <span className="text-rose">The Girl Can</span>{" "}
            <span className="text-plum">Foundation</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 min-[600px]:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-plum transition-colors hover:text-rose"
            >
              {link.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1 text-sm font-medium text-plum transition-colors hover:text-rose">
              I am a…
              <ChevronDown className="h-4 w-4" aria-hidden />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[200px]">
              {VISITOR_ROUTES.map((route) => (
                <DropdownMenuItem key={route.href} asChild>
                  <Link href={route.href}>{route.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild size="sm">
            <Link href="/donate">Donate</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-2 min-[600px]:hidden">
          <Button asChild size="sm">
            <Link href="/donate">Donate</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-6 pt-12">
              <nav className="flex flex-col gap-4" aria-label="Mobile">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-base font-medium text-plum hover:text-rose"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-2 border-t border-rose-pale pt-4">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-muted">
                    I am a…
                  </p>
                  {VISITOR_ROUTES.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      onClick={() => setOpen(false)}
                      className="block py-2 text-sm font-medium text-plum hover:text-rose"
                    >
                      {route.label}
                    </Link>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

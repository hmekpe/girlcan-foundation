"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, ChevronDown, Home } from "lucide-react";
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
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-rose/10 bg-cream/80 shadow-brand backdrop-blur-xl"
          : "border-b border-transparent bg-transparent py-4"
      )}
    >
      {scrolled && (
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-rose/30 to-transparent" />
      )}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo — visual identity only, not a home link */}
        <div className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="The Girl Can Foundation logo"
            width={40}
            height={40}
            className="rounded-full object-contain transition-transform duration-300 hover:scale-105"
            priority
          />
          <span className="font-display text-lg font-extrabold leading-tight sm:text-xl">
            <span className="text-rose">The Girl Can</span>{" "}
            <span className="text-plum">Foundation</span>
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 min-[600px]:flex" aria-label="Primary">
          {/* Explicit Home button */}
          <Link
            href="/"
            aria-label="Go to homepage"
            className="group relative flex items-center gap-1.5 text-sm font-medium text-plum transition-colors hover:text-rose"
          >
            <Home className="h-4 w-4" aria-hidden />
            Home
            <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-rose transition-transform duration-300 group-hover:scale-x-100" />
          </Link>

          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-plum transition-colors hover:text-rose"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-rose transition-transform duration-300 group-hover:scale-x-100" />
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

        {/* Mobile nav */}
        <div className="flex items-center gap-2 min-[600px]:hidden">
          <Button asChild size="sm">
            <Link href="/donate">Donate</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-6 pt-12">
              <nav className="flex flex-col gap-4" aria-label="Mobile">
                {/* Home link first for discoverability */}
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 text-base font-medium text-plum hover:text-rose"
                >
                  <Home className="h-4 w-4" aria-hidden />
                  Home
                </Link>

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

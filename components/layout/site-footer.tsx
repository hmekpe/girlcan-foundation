import Link from "next/link";
import { FOOTER_LINKS, SITE } from "@/lib/constants";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.5V12H17l-.4 3h-2.7v7A10 10 0 0022 12z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative bg-deep text-white/75">
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-rose via-gold to-rose" />
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz4KPC9zdmc+')] opacity-20 mix-blend-overlay"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 max-[600px]:grid-cols-1 min-[600px]:max-[900px]:grid-cols-2 min-[900px]:grid-cols-4">
          <div className="min-[900px]:col-span-2">
            <Link href="/" className="font-display text-xl font-extrabold">
              <span className="text-rose">The Girl Can</span>{" "}
              <span className="text-rose-light">Foundation</span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-white/60">{SITE.tagline}</p>
            <div className="mt-6 flex gap-3">
              {[
                { href: "#", label: "Instagram", Icon: InstagramIcon },
                { href: "#", label: "Facebook", Icon: FacebookIcon },
                { href: "#", label: "X", Icon: XIcon },
                { href: "#", label: "LinkedIn", Icon: LinkedInIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/80 transition-all duration-300 hover:bg-rose hover:text-white hover:shadow-[0_0_15px_rgba(232,69,90,0.5)] hover:-translate-y-1"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Foundation</h4>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.foundation.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-rose-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Connect</h4>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.connect.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-rose-light">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <span className="text-sm text-white/40">Shop (coming soon)</span>
              </li>
              {FOOTER_LINKS.legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-rose-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-8 text-xs uppercase tracking-wide text-white/50 max-[600px]:items-center max-[600px]:text-center min-[600px]:flex-row min-[600px]:items-center min-[600px]:justify-between">
          <span>
            © {new Date().getFullYear()}{" "}
            <strong className="text-rose-light">{SITE.name}</strong>. All rights
            reserved.
          </span>
          <span>
            She is strong. She is capable.{" "}
            <strong className="text-rose-light">She can.</strong>
          </span>
        </div>
      </div>
    </footer>
  );
}

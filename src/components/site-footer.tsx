import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "#destinations" },
  { label: "My Bookings", href: "#bookings" },
  { label: "My Profile", href: "#profile" },
];

const supportLinks = [
  { label: "Help Center", href: "#help-center" },
  { label: "Terms of Service", href: "#terms-of-service" },
  { label: "Privacy Policy", href: "#privacy-policy" },
];

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const socialLinkClassName =
  "inline-flex text-white/90 transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export function SiteFooter() {
  return (
    <footer className="bg-[#0b0b0b] text-white">
      <div className="mx-auto max-w-[1240px] px-4 pt-20 pb-4 md:px-12 md:pt-28 lg:px-16">
        <Image
          src="/images/Wanderlast-1.png"
          alt="Wanderlast"
          width={542}
          height={80}
          loading="eager"
          className="h-14 w-auto xl:h-20"
        />

        <p className="mt-5 text-[15px] font-light text-white/60">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-16 grid gap-10 md:mt-20 md:grid-cols-2 lg:grid-cols-[1.55fr_1fr_1fr_1fr] lg:gap-8">
          <div>
            <h3 className="text-sm tracking-[0.08em] text-white uppercase">
              Newsletter
            </h3>
            <p className="mt-4 text-[13px] font-light text-white/60">
              Subscribe for exclusive travel deals and inspiration.
            </p>

            <div className="mt-4 flex w-full max-w-[318px] items-center bg-[#2c2c2c] pr-3 pl-4 transition-colors focus-within:bg-[#333]">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                placeholder="Enter email"
                autoComplete="email"
                className="h-[50px] w-full bg-transparent text-sm text-white outline-none placeholder:text-white/50"
              />
              <button
                type="button"
                aria-label="Subscribe"
                className="grid size-8 shrink-0 place-items-center text-white/80 transition-colors hover:text-brand"
              >
                <ArrowUpRight className="size-4" />
              </button>
            </div>
          </div>

          <nav aria-label="Quick links">
            <h3 className="text-sm tracking-[0.08em] text-white uppercase">
              Quick Links
            </h3>
            <ul className="mt-6 flex flex-col gap-5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-white/90 transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Support">
            <h3 className="text-sm tracking-[0.08em] text-white uppercase">
              Support
            </h3>
            <ul className="mt-6 flex flex-col gap-5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-white/90 transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm tracking-[0.08em] text-white uppercase">
              Contact Us
            </h3>
            <ul className="mt-6 flex flex-col gap-5">
              <li>
                <a
                  href="tel:+17869011622"
                  className="text-[15px] text-white/90 transition-colors hover:text-brand"
                >
                  786 901 1622
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wandariand.com"
                  className="text-[15px] text-white/90 transition-colors hover:text-brand"
                >
                  info@wandariand.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between md:mt-20">
          <p className="text-[13px] font-light text-white/70">
            &copy; 2026 Wanderlust. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X (formerly Twitter)"
              className={socialLinkClassName}
            >
              <XIcon className="size-[17px]" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className={socialLinkClassName}
            >
              <LinkedInIcon className="size-[18px]" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className={socialLinkClassName}
            >
              <InstagramIcon className="size-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

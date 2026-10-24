"use client";

import { Menu, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "#destinations" },
  { label: "My Bookings", href: "#bookings" },
  { label: "Admin", href: "#admin" },
];

const accountLinks = [
  { label: "Profile", href: "#profile" },
  { label: "Login", href: "#login" },
  { label: "Sign Up", href: "#signup" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="absolute inset-x-0 top-0 z-30 px-4 pt-4 md:px-10 md:pt-8">
      <nav
        aria-label="Main navigation"
        className="relative mx-auto flex h-14 max-w-[1600px] items-center bg-white px-5 text-zinc-900 md:h-16 md:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr]"
      >
        <ul className="hidden items-center gap-6 text-[15px] lg:flex xl:gap-8">
          {navLinks.map((link) => {
            const isActive = link.href === "/";

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={
                    isActive
                      ? "font-medium text-[#3aaecb] underline decoration-1 underline-offset-[9px]"
                      : "font-medium transition-colors hover:text-[#3aaecb]"
                  }
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/"
          aria-label="Wanderlast home"
          className="absolute left-1/2 -translate-x-1/2 lg:static lg:justify-self-center lg:translate-x-0"
        >
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={162}
            height={24}
            className="h-6 w-auto md:h-7"
          />
        </Link>

        <div className="ml-auto hidden items-center gap-5 text-[15px] lg:flex lg:ml-0 lg:justify-self-end xl:gap-7">
          {accountLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-1.5 font-medium transition-colors hover:text-[#3aaecb]"
            >
              {link.label === "Profile" && (
                <User aria-hidden="true" className="size-4" strokeWidth={1.8} />
              )}
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="ml-auto grid size-10 place-items-center rounded-sm text-zinc-800 transition-colors hover:bg-zinc-100 lg:hidden"
        >
          {menuOpen ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <Menu aria-hidden="true" className="size-5" />
          )}
        </button>

        {menuOpen && (
          <div
            id="mobile-menu"
            className="absolute inset-x-0 top-full mt-2 border-t border-zinc-100 bg-white px-5 py-5 shadow-xl lg:hidden"
          >
            <ul className="flex flex-col gap-4 text-base">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={
                      link.href === "/"
                        ? "font-medium text-[#3aaecb]"
                        : "font-medium"
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-col gap-4 border-t border-zinc-200 pt-5 text-base">
              {accountLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="flex items-center gap-2 font-medium"
                >
                  {link.label === "Profile" && (
                    <User
                      aria-hidden="true"
                      className="size-4"
                      strokeWidth={1.8}
                    />
                  )}
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

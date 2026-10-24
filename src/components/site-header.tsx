import { Menu, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/bookings", label: "My Bookings" },
  { href: "/admin", label: "Admin" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="flex h-[50px] items-center justify-between gap-4 bg-white px-4 md:px-6">
        <div className="flex items-center gap-8">
          <details className="relative lg:hidden">
            <summary
              aria-label="Open menu"
              className="flex size-8 cursor-pointer list-none items-center justify-center rounded-md text-ink transition-colors hover:bg-black/5 [&::-webkit-details-marker]:hidden"
            >
              <Menu className="size-5" />
            </summary>
            <nav className="absolute top-10 left-0 z-40 flex w-52 flex-col border border-black/10 bg-white py-2 shadow-lg">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-base text-ink transition-colors hover:bg-black/5"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </details>

          <nav className="hidden items-center gap-8 pt-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = link.href === "/";

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={
                    isActive
                      ? "text-base font-medium text-brand underline decoration-2 underline-offset-[9px]"
                      : "text-base font-medium text-ink transition-colors hover:text-brand"
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <Link href="/" className="shrink-0">
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={162}
            height={24}
            priority
            className="h-auto w-[156px]"
          />
        </Link>

        <div className="flex items-center gap-5 text-base font-medium text-ink md:gap-8">
          <Link
            href="/profile"
            className="hidden items-center gap-1.5 transition-colors hover:text-brand md:flex"
          >
            <User className="size-4" />
            Profile
          </Link>
          <Link
            href="/login"
            className="hidden transition-colors hover:text-brand md:inline"
          >
            Login
          </Link>
          <Link href="/signup" className="transition-colors hover:text-brand">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}

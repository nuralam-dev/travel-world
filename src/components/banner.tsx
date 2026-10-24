import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const fieldClassName =
  "w-full border-0 bg-transparent p-0 text-sm text-white/90 outline-none placeholder:text-white/90 focus:ring-0";

export function Banner() {
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-neutral-950">
      <Image
        src="/images/Banner.png"
        alt="Sunlit bay surrounded by forested hills"
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="-z-10 absolute inset-0 bg-black/20" />

      <div className="flex flex-1 flex-col items-center justify-center px-4 pb-10 pt-32 text-center sm:px-6 md:pt-40">
        <h1 className="max-w-6xl text-5xl font-light leading-[0.98] tracking-[-0.03em] text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.75rem]">
          <span className="block">Discover Your</span>
          <span className="block">Next Adventure</span>
        </h1>

        <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-9 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <Link
            href="#destinations"
            className="inline-flex w-full items-center justify-center gap-3 bg-[#4bb8d8] px-8 py-4 text-sm font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#3aa8c8] sm:w-auto"
          >
            Explore Now
            <ArrowRight
              aria-hidden="true"
              className="size-4"
              strokeWidth={1.8}
            />
          </Link>
          <Link
            href="#destinations"
            className="inline-flex w-full items-center justify-center bg-white/20 px-8 py-4 text-sm font-medium uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-colors hover:bg-white/30 sm:w-auto"
          >
            View Destination
          </Link>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-[calc(100%-2rem)] max-w-[1600px] sm:w-[calc(100%-5rem)] md:mb-7">
        <search aria-label="Search destinations" className="block">
          <form className="grid grid-cols-1 divide-y divide-white/25 overflow-hidden bg-black/20 text-white backdrop-blur-md sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto] lg:divide-x lg:divide-y-0">
            <div className="px-6 py-4">
              <label htmlFor="location" className="block text-lg font-semibold">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Address, City Or Zip"
                className={fieldClassName}
              />
            </div>

            <div className="px-6 py-4">
              <label
                htmlFor="date-duration"
                className="block text-lg font-semibold"
              >
                Date/Duration
              </label>
              <select
                id="date-duration"
                name="date-duration"
                defaultValue="anytime"
                className={`${fieldClassName} cursor-pointer appearance-none`}
              >
                <option value="anytime" className="text-zinc-900">
                  Anytime/3 Days
                </option>
                <option value="weekend" className="text-zinc-900">
                  Weekend/2 Days
                </option>
                <option value="week" className="text-zinc-900">
                  One Week
                </option>
              </select>
            </div>

            <div className="px-6 py-4">
              <label htmlFor="budget" className="block text-lg font-semibold">
                Budget
              </label>
              <select
                id="budget"
                name="budget"
                defaultValue="0-3000"
                className={`${fieldClassName} cursor-pointer appearance-none`}
              >
                <option value="0-3000" className="text-zinc-900">
                  $0-$3000
                </option>
                <option value="3000-6000" className="text-zinc-900">
                  $3000-$6000
                </option>
                <option value="6000+" className="text-zinc-900">
                  $6000+
                </option>
              </select>
            </div>

            <div className="px-6 py-4">
              <label htmlFor="people" className="block text-lg font-semibold">
                People
              </label>
              <select
                id="people"
                name="people"
                defaultValue="5-10"
                className={`${fieldClassName} cursor-pointer appearance-none`}
              >
                <option value="1-4" className="text-zinc-900">
                  1-4
                </option>
                <option value="5-10" className="text-zinc-900">
                  5-10
                </option>
                <option value="10+" className="text-zinc-900">
                  10+
                </option>
              </select>
            </div>

            <button
              type="button"
              className="bg-[#4bb8d8] px-10 py-5 text-lg font-semibold text-white transition-colors hover:bg-[#3aa8c8]"
            >
              Search
            </button>
          </form>
        </search>
      </div>
    </section>
  );
}

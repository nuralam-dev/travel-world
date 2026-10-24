import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { SearchBar } from "@/components/search-bar";
import { SiteHeader } from "@/components/site-header";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <Image
        src="/images/Banner.png"
        alt="Aerial view of a turquoise bay surrounded by forested hills"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <SiteHeader />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-24 pb-12 text-center md:pt-[8.875rem]">
        <h1 className="max-w-5xl text-[clamp(2.75rem,6.55vw,5.875rem)] leading-none font-light tracking-[-0.02em] text-white">
          <span className="block">Discover Your</span>
          <span className="block">Next Adventure</span>
        </h1>

        <p className="mt-4 max-w-[640px] text-lg leading-[1.55] font-light text-white/95 md:text-[1.22rem]">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            className="group inline-flex h-[52px] w-[200px] items-center justify-center gap-3 bg-brand text-sm font-medium tracking-[0.12em] text-white uppercase transition-colors hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Explore Now
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            type="button"
            className="inline-flex h-[52px] w-[188px] items-center justify-center border border-white/30 bg-white/20 text-sm font-medium tracking-[0.08em] text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            View Destination
          </button>
        </div>
      </div>

      <SearchBar />
    </section>
  );
}

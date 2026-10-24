import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function CtaBanner() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/images/destinations/image6.png"
        alt="Aerial view of an airplane wing over a tropical coastline"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 flex min-h-[340px] flex-col items-center justify-center px-6 py-20 text-center md:min-h-[447px] md:py-24">
        <h2 className="max-w-3xl text-[clamp(2.25rem,3.6vw,3.25rem)] leading-[1.05] font-light tracking-[-0.02em] text-white">
          Ready To Start Your Journey?
        </h2>

        <p className="mt-5 text-[15px] font-light text-white/90 md:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>

        <button
          type="button"
          className="group mt-9 inline-flex h-[56px] w-[280px] items-center justify-center gap-4 bg-white text-sm font-medium tracking-[0.1em] text-ink uppercase transition-colors hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Book Your Trip Today
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}

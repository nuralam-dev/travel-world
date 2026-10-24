import { FeatureCard } from "@/components/feature-card";

const features = [
  {
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChooseUs() {
  return (
    <section
      aria-labelledby="why-choose-title"
      className="bg-[#f4f9fa] py-16 md:py-20 lg:py-24 xl:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        <div className="text-center">
          <h2
            id="why-choose-title"
            className="text-4xl font-light tracking-[-0.02em] text-ink sm:text-5xl lg:text-[3.5rem]"
          >
            Why Choose Wanderlust
          </h2>
          <p className="mt-4 text-base font-light text-muted-foreground">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

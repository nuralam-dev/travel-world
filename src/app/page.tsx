import { CtaBanner } from "@/components/cta-banner";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";
import { Testimonials } from "@/components/testimonials";
import { WhyChooseUs } from "@/components/why-choose-us";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyChooseUs />
      <Testimonials />
      <CtaBanner />
      <SiteFooter />
    </main>
  );
}

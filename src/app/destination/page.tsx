import { DestinationExplorer } from "@/components/destination-explorer";
import { type ApiDestination, toDestination } from "@/lib/destination";

export const metadata = {
  title: "Explore All Destinations | Travel World",
  description:
    "Find your perfect travel experience from our curated collection of destinations.",
};

const DestinationPage = async () => {
  const res = await fetch("http://localhost:4000/destination");
  const data: ApiDestination[] = await res.json();
  const destinations = data.map(toDestination);

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        <h1 className="text-[2.5rem] leading-none font-light tracking-[-0.02em] text-ink md:text-5xl">
          Explore All Destinations
        </h1>
        <p className="mt-4 text-base font-light text-muted-foreground">
          Find your perfect travel experience from our curated collection
        </p>

        <DestinationExplorer destinations={destinations} />
      </div>
    </section>
  );
};

export default DestinationPage;

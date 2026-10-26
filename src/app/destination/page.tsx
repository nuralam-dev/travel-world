import {
  type Destination,
  DestinationExplorer,
} from "@/components/destination-explorer";

export const metadata = {
  title: "Explore All Destinations | Travel World",
  description:
    "Find your perfect travel experience from our curated collection of destinations.",
};

// The API's `imageUrl` values are external and mostly broken, and next.config.ts
// has no `images.remotePatterns`, so each package is mapped onto a local asset.
// const imagePool = [
//   "/images/destinations/image1.png",
//   "/images/destinations/image2.png",
//   "/images/destinations/image3.png",
//   "/images/destinations/image4.png",
//   "/images/destinations/image5.png",
//   "/images/destinations/image6.png",
// ];

type ApiDestination = {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: number;
  duration: string;
  departure: string;
  imageUrl: string;
  description: string;
};

// "7day" / "6days" -> "7 Days/6 Nights" as shown in the design.
function formatDuration(duration: string) {
  const match = duration.match(/\d+/);
  if (!match) return duration;

  const days = Number(match[0]);
  return days < 2 ? `${days} Day` : `${days} Days/${days - 1} Nights`;
}

// "usa" -> "USA", "indonesia" -> "Indonesia".
function formatCountry(country: string) {
  const trimmed = country.trim();
  if (trimmed.length <= 3 && trimmed === trimmed.toLowerCase()) {
    return trimmed.toUpperCase();
  }
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

// Ratings are not part of the API payload, so derive a stable value per document
// (4.0 - 4.9) instead of hardcoding the design's "4.5" on every card.
function ratingFor(id: string) {
  let hash = 0;
  for (const char of id) {
    hash = (hash * 31 + char.charCodeAt(0)) % 1000;
  }
  return 4 + (hash % 10) / 10;
}

function toDestination(item: ApiDestination, index: number): Destination {
  console.log(item);
  return {
    id: item._id,
    name: item.name,
    country: formatCountry(item.country),
    category: item.category,
    price: item.price,
    duration: formatDuration(item.duration),
    rating: ratingFor(item._id),
    image: item.imageUrl,
  };
}

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

// Shared types and helpers for the destination pages, so the list page and the
// detail page always show the same image, rating and formatting for a document.

export type ApiDestination = {
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

export type Destination = {
  id: string;
  name: string;
  country: string;
  category: string;
  price: number;
  duration: string;
  rating: number;
  image: string;
};

// The API's `imageUrl` values are external and mostly broken, and next.config.ts
// has no `images.remotePatterns`, so each package is mapped onto a local asset.
export const imagePool = [
  "/images/destinations/image1.png",
  "/images/destinations/image2.png",
  "/images/destinations/image3.png",
  "/images/destinations/image4.png",
  "/images/destinations/image5.png",
  "/images/destinations/image6.png",
];

// "7day" / "6days" -> "7 Days/6 Nights" as shown in the design.
export function formatDuration(duration: string) {
  const match = duration.match(/\d+/);
  if (!match) return duration;

  const days = Number(match[0]);
  return days < 2 ? `${days} Day` : `${days} Days/${days - 1} Nights`;
}

// "usa" -> "USA", "indonesia" -> "Indonesia".
export function formatCountry(country: string) {
  const trimmed = country.trim();
  if (trimmed.length <= 3 && trimmed === trimmed.toLowerCase()) {
    return trimmed.toUpperCase();
  }
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function hashOf(id: string) {
  let hash = 0;
  for (const char of id) {
    hash = (hash * 31 + char.charCodeAt(0)) % 1000;
  }
  return hash;
}

// Ratings and review counts are not part of the API payload, so derive stable
// values per document (4.0 - 4.9 and 100 - 599 reviews) instead of hardcoding
// the design's "4.9 (234 reviews)" on every card.
export function ratingFor(id: string) {
  return 4 + (hashOf(id) % 10) / 10;
}

export function reviewsFor(id: string) {
  return 100 + (hashOf(id) % 500);
}

export function toDestination(
  item: ApiDestination,
  index: number,
): Destination {
  return {
    id: item._id,
    name: item.name,
    country: formatCountry(item.country),
    category: item.category,
    price: item.price,
    duration: formatDuration(item.duration),
    rating: ratingFor(item._id),
    image: imagePool[index % imagePool.length],
  };
}

import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  MapPin,
  Pencil,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteDestinationButton } from "@/components/delete-destination-button";
import { Button } from "@/components/ui/button";
import {
  type ApiDestination,
  reviewsFor,
  toDestination,
} from "@/lib/destination";

export const metadata = {
  title: "Destination Details | Travel World",
  description: "Trip overview, highlights and booking information.",
};

// Booking card perks, from the design.
const perks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

const DestinationDetailsPage = async ({
  params,
}: PageProps<"/destination/[id]">) => {
  const { id } = await params;

  // The API has no GET /destination/:id, so fetch the list and pick ours.
  // The index is the same one the list page used, so the image matches.
  const res = await fetch("http://localhost:4000/destination");
  const all: ApiDestination[] = await res.json();

  const index = all.findIndex((item) => item._id === id);
  if (index === -1) notFound();

  const item = all[index];
  const destination = toDestination(item, index);
  const reviews = reviewsFor(id);

  const highlights = [
    `Hand-picked ${item.category.toLowerCase()} experiences`,
    "Comfortable handpicked accommodation",
    "Daily guided tours and activities",
    "Flexible departure dates",
    "Small groups with personal attention",
  ];

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        {/* Back link + Edit / Cancel buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/destination"
            className="flex items-center gap-2 text-base text-muted-foreground transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-4" />
            Back to Destinations
          </Link>

          <div className="flex gap-3">
            <Button
              render={<Link href={`/destination/${id}/edit`} />}
              nativeButton={false}
              variant="outline"
              className="h-10 gap-2 rounded-md px-4"
            >
              <Pencil className="size-4" />
              Edit
            </Button>
            <DeleteDestinationButton id={id} />
          </div>
        </div>

        {/* Big hero image */}
        <Image
          src={destination.image}
          alt={destination.name}
          width={411}
          height={231}
          className="mt-6 h-auto w-full rounded-xl object-cover md:aspect-[16/7]"
        />

        <hr className="mt-8 border-zinc-100" />

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_330px]">
          {/* Left: trip details */}
          <div>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              {destination.country}
            </p>

            <h1 className="mt-3 text-4xl leading-none font-light tracking-[-0.02em] text-ink md:text-6xl">
              {destination.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <span className="flex items-center gap-1.5">
                <Star className="size-4 fill-emerald-500 text-emerald-500" />
                <span className="font-semibold text-ink">
                  {destination.rating.toFixed(1)}
                </span>
                <span className="text-muted-foreground">
                  ({reviews} reviews)
                </span>
              </span>

              <span className="flex items-center gap-1.5">
                <Calendar className="size-4 text-muted-foreground" />
                <span className="font-semibold text-ink">
                  {destination.duration}
                </span>
              </span>
            </div>

            <h2 className="mt-9 text-3xl font-light text-ink">Overview</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
              {item.description}
            </p>

            <h2 className="mt-9 text-3xl font-light text-ink">Highlights</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
              {item.description}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <p
                  key={highlight}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                  {highlight}
                </p>
              ))}
            </div>
          </div>

          {/* Right: booking card */}
          <aside className="h-fit rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-muted-foreground">Starting from</p>
            <p className="mt-1 text-4xl font-semibold text-brand">
              ${destination.price}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">per person</p>

            <div className="mt-5 border-t border-zinc-100 pt-5">
              <input
                type="date"
                aria-label="Departure date"
                defaultValue={item.departure}
                className="h-11 w-full rounded-md border-0 bg-muted px-3.5 text-sm text-ink outline-none"
              />
            </div>

            <div className="mt-5 border-t border-zinc-100 pt-5">
              <Button
                type="button"
                className="h-11 w-full gap-2 rounded-md bg-brand text-white hover:bg-brand/90"
              >
                Book Now
                <ArrowRight className="size-4" />
              </Button>
            </div>

            <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                  {perk}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default DestinationDetailsPage;

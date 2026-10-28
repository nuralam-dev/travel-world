import type { Destination } from "@/lib/destination";
import { ArrowUpRight, Calendar, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function DestinationCard({ destination }: { destination: Destination }) {
  const { id, image, name, country, price, duration, rating } = destination;

  return (
    <article className="flex flex-col">
      <Link
        href={`/destination/${id}`}
        className="relative block overflow-hidden rounded-xl bg-muted"
      >
        <Image
          src={image}
          alt={name}
          width={411}
          height={231}
          className="h-auto w-full object-cover"
        />
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-md bg-white px-2 py-1 text-sm font-semibold text-ink shadow-sm">
          {rating.toFixed(1)}
          <Star className="size-3.5 fill-ink text-ink" />
        </div>
      </Link>

      <div className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="size-4 shrink-0" />
        <span>{country}</span>
      </div>

      <div className="mt-2 flex items-baseline justify-between gap-3">
        <h3 className="text-xl font-medium text-ink">
          <Link
            href={`/destination/${id}`}
            className="transition-colors hover:text-brand"
          >
            {name}
          </Link>
        </h3>
        <p className="shrink-0 text-ink">
          <span className="text-xl font-semibold">${price}</span>
          <span className="text-sm text-muted-foreground">/Person</span>
        </p>
      </div>

      <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Calendar className="size-4 shrink-0" />
        <span>{duration}</span>
      </div>

      <Link
        href={`/destination/${id}`}
        className="mt-3 flex w-fit items-center gap-1 text-sm font-semibold tracking-wide text-brand uppercase transition-colors hover:text-brand/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        Book Now
        <ArrowUpRight className="size-4" />
      </Link>
    </article>
  );
}

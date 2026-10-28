"use client";

import { useMemo, useState } from "react";
import { DestinationCard } from "@/components/destination-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Destination } from "@/lib/destination";

const ALL = "all";

const priceBuckets = [
  { value: ALL, label: "Any Price" },
  { value: "under-2000", label: "Under $2000" },
  { value: "2000-5000", label: "$2000 - $5000" },
  { value: "over-5000", label: "Over $5000" },
];

const sortOptions = [
  { value: ALL, label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A to Z" },
];

const triggerClassName =
  "h-14 w-full rounded-none border-zinc-200 px-5 text-base font-normal tracking-wide text-ink/70 uppercase focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40";

function matchesPrice(price: number, bucket: string) {
  switch (bucket) {
    case "under-2000":
      return price < 2000;
    case "2000-5000":
      return price >= 2000 && price <= 5000;
    case "over-5000":
      return price > 5000;
    default:
      return true;
  }
}

export function DestinationExplorer({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [category, setCategory] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [sort, setSort] = useState<string | null>(null);

  const categoryItems = useMemo(
    () => [
      { value: ALL, label: "All Categories" },
      ...[...new Set(destinations.map((item) => item.category))]
        .sort()
        .map((value) => ({ value, label: value })),
    ],
    [destinations],
  );

  const visible = useMemo(() => {
    const filtered = destinations.filter(
      (item) =>
        (category === null || category === ALL || item.category === category) &&
        matchesPrice(item.price, price ?? ALL),
    );

    switch (sort) {
      case "price-asc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "name":
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return filtered;
    }
  }, [destinations, category, price, sort]);

  return (
    <>
      <div className="mt-8 grid gap-3 md:grid-cols-3 ">
        <Select
          items={categoryItems}
          value={category}
          onValueChange={(value) => setCategory(value)}
        >
          <SelectTrigger className={triggerClassName}>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categoryItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select items={priceBuckets} value={price} onValueChange={setPrice}>
          <SelectTrigger className={triggerClassName}>
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            {priceBuckets.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select items={sortOptions} value={sort} onValueChange={setSort}>
          <SelectTrigger className={triggerClassName}>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Showing {visible.length} destination{visible.length === 1 ? "" : "s"}
      </p>

      <div className="mt-6 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-6 text-sm text-muted-foreground">
          No destinations match these filters.
        </p>
      )}
    </>
  );
}

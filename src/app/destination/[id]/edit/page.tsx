import { notFound } from "next/navigation";
import { DestinationForm } from "@/components/destination-form";
import type { ApiDestination } from "@/lib/destination";

export const metadata = {
  title: "Edit Destination | Travel World",
  description: "Update the details of a travel package.",
};

// Server-rendered per request like the details page, so the form always
// starts from the package's current values in the database.
const EditDestinationPage = async ({
  params,
}: PageProps<"/destination/[id]/edit">) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:4000/destination/${id}`);
  const destination = (await res.json()) as ApiDestination | null;

  // Mongo returns null for an unknown id; any missing document is a 404.
  if (!destination?._id) notFound();

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        <h1 className="text-[2.5rem] leading-none font-light tracking-[-0.02em] text-ink md:text-5xl">
          Edit Destination
        </h1>

        <DestinationForm destination={destination} />
      </div>
    </section>
  );
};

export default EditDestinationPage;

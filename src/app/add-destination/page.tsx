import { DestinationForm } from "@/components/destination-form";

export const metadata = {
  title: "Add New Travel Package | Travel World",
  description: "Create a new travel package and share it with travelers.",
};

export default function AddDestinationPage() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        <h1 className="text-[2.5rem] leading-none font-light tracking-[-0.02em] text-ink md:text-5xl">
          Add New Travel Package
        </h1>

        <DestinationForm />
      </div>
    </section>
  );
}

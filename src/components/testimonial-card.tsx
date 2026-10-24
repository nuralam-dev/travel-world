import Image from "next/image";

type TestimonialCardProps = {
  quote: string;
  name: string;
  location: string;
  image: string;
};

export function TestimonialCard({
  quote,
  name,
  location,
  image,
}: TestimonialCardProps) {
  return (
    <article className="flex h-full gap-5 border border-zinc-200 bg-white p-5">
      <div className="flex min-w-0 flex-1 flex-col">
        <blockquote className="text-[17px] leading-[1.45] text-ink xl:text-lg">
          &ldquo;{quote}&rdquo;
        </blockquote>

        <div className="mt-auto pt-6">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="h-px w-5 bg-brand" />
            <cite className="text-[15px] not-italic text-brand">{name}</cite>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{location}</p>
        </div>
      </div>

      <div className="relative w-[38%] shrink-0 overflow-hidden bg-zinc-100">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 220px, 38vw"
          className="object-cover"
        />
      </div>
    </article>
  );
}

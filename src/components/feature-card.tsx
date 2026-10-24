import Image from "next/image";

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <article className="bg-white p-8 lg:p-9 xl:p-10">
      <Image
        src={icon}
        alt=""
        width={48}
        height={48}
        className="size-8 lg:size-9 xl:size-10"
      />
      <h3 className="mt-5 text-2xl font-light text-ink">{title}</h3>
      <p className="mt-3 text-[15px] leading-[1.5] text-muted-foreground">
        {description}
      </p>
    </article>
  );
}

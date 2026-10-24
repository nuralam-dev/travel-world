import { TestimonialCard } from "@/components/testimonial-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person2.png",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person1.png",
  },
  {
    quote:
      "Santorini Was Everything We Dreamed Of. The Sunsets, The Food, And The Warm Hospitality Made This Trip Truly Special.",
    name: "Amara Okafor",
    location: "Lagos, Nigeria",
    image: "/images/person1.png",
  },
  {
    quote:
      "Kyoto Stole Our Hearts. The Temples, The Gardens, And The Local Food Scene Were Beyond Anything We Expected.",
    name: "Daniel Park",
    location: "Seoul, South Korea",
    image: "/images/person2.png",
  },
];

export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-title"
      className="bg-white py-16 md:py-20 lg:py-24 xl:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16">
        <Carousel opts={{ align: "start" }}>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="testimonials-title"
                className="text-4xl font-light tracking-[-0.02em] text-ink sm:text-5xl lg:text-[3.5rem]"
              >
                What Travelers Say
              </h2>
              <p className="mt-3 text-base font-light text-muted-foreground">
                Real experiences from our happy travelers
              </p>
            </div>

            <div className="flex items-center gap-3">
              <CarouselPrevious
                size="icon-lg"
                className="static size-12 border-zinc-300 bg-transparent text-zinc-500 hover:bg-zinc-100 hover:text-ink disabled:opacity-40"
              />
              <CarouselNext
                size="icon-lg"
                className="static size-12 border-zinc-300 bg-transparent text-zinc-500 hover:bg-zinc-100 hover:text-ink disabled:opacity-40"
              />
            </div>
          </div>

          <CarouselContent className="-ml-6 mt-10">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="basis-full pl-6 lg:basis-1/2"
              >
                <TestimonialCard {...testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

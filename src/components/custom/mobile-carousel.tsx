"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React from "react";

const images = [
  "culture.webp",
  "entertainment.webp",
  "explore-jpn.webp",
  "life-style.webp",
  "technology.webp",
];

const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function getPosts() {
  const res = await fetch(`${apiUrl}/posts`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("fetch data failed");
  }
  return res.json();
}

console.log(getPosts());

const MobileCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  return (
    <Carousel plugins={[plugin.current]}>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem className="md:basis-1/2 lg:basis-full" key={index + 1}>
            <Image
              src={`/${image}`}
              alt="fish"
              width={500}
              height={300}
              className="w-full h-1/3 object-cover object-top"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default MobileCarousel;

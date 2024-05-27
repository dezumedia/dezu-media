"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
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

const MobileCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <>
      <Carousel plugins={[plugin.current]}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem
              className="md:basis-1/2 lg:basis-full"
              key={index + 1}
            >
              <Image
                src={`/${image}`}
                alt="fish"
                width={500}
                height={300}
                className="w-full  object-cover object-top"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};

export default MobileCarousel;

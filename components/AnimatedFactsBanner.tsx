"use client"

import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect } from 'react';

interface Fact {
  text: string;
  image: string;
}

interface AnimatedFactsBannerProps {
  facts: Fact[];
}

export function AnimatedFactsBanner({ facts }: AnimatedFactsBannerProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    if (emblaApi) {
      const interval = setInterval(() => {
        emblaApi.scrollNext();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [emblaApi]);

  return (
    <div className="relative overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {facts.map((fact, index) => (
          <div key={index} className="flex-[0_0_100%] min-w-0 relative">
            <div className="relative h-[300px]">
              <Image
                src={fact.image}
                alt={`Fact ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
                <div className="text-white p-8 max-w-2xl">
                  <h2 className="text-2xl font-bold mb-4">Did You Know?</h2>
                  <p className="text-lg">{fact.text}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
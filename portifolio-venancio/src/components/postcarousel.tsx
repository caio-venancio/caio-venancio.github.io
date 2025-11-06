import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export type PostItem = {
  title: string
  slug: string
  type: string
  thumbnail: string
  short_description: string
  tags: string[]
  status?: string
}

export function PostCarousel({ items }: { items: PostItem[] }) {
  return (
    <Carousel className="w-full px-4 sm:px-8 lg:px-24">
        <CarouselContent className="-ml-4">{/* espaço desejado = 1rem (4) */}

          {/* {Array.from({ length: 6 }).map((_, i) => (
            <CarouselItem
              key={i}
              className="pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <div className="h-48 rounded-xl border p-4 flex">
                <span className="text-2xl font-bold">{i + 1}</span>
              </div>
            </CarouselItem>
          ))} */}

          {/* {allProjects.map((project, i) => (
            <CarouselItem
              key={i}
              className="pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <div className="h-48 rounded-xl border p-4 flex">
                <p className="text-2xl font-bold">{i + 1}</p>
                <div>
                  <h1>{project.title}</h1>
                </div>
              </div>
            </CarouselItem>
          ))} */}

          {items.map((item, i) => (
            <CarouselItem
              key={i}
              className="pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <div className="h-48 rounded-xl border p-4 flex">
                <p className="text-2xl font-bold">{i + 1}</p>
                <div>
                  <h1>{item.title}</h1>
                </div>
              </div>
            </CarouselItem>
          ))}

          
        </CarouselContent>
      <CarouselPrevious className="left-4 sm:left-8 lg:left-12 top-1/2 -translate-y-1/2
                                   h-8 w-8 sm:h-10 sm:w-10" />
      <CarouselNext className="right-4 sm:right-8 lg:right-12 top-1/2 -translate-y-1/2
                               h-8 w-8 sm:h-10 sm:w-10" />
    </Carousel>
  )
}

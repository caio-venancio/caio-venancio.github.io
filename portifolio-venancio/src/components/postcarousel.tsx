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

              {/* <div className="h-48 w-[280px] rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-4 flex flex-col justify-between shadow-lg transition hover:scale-105 hover:border-white/40">
                <div className="flex items-start gap-3">
                  <p className="text-3xl font-bold">{i + 1}</p>
                  <h1 className="text-lg font-semibold">{item.title}</h1>
                </div>
                <p className="text-sm line-clamp-2">{item.short_description}</p>
              </div> */}



              <div className="h-48 w-[280px] rounded-xl border border-gray-200 hover:border-gray-300 bg-white p-4 flex flex-col justify-between 
                              transition hover:scale-105
                              active:scale-95 
                              focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:outline-none
                              aria-[pressed=true]:scale-95">
                <div className="flex items-start gap-3">
                  <p className="text-2xl font-bold text-gray-400">{i + 1}</p>
                  <h1 className="text-lg font-semibold text-gray-800">{item.title}</h1>
                </div>
                <p className="text-sm text-gray-500 line-clamp-3">{item.short_description}</p>
                <p className="text-sm text-gray-500 line-clamp-2">{item.slug}</p>
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

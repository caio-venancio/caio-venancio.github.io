import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function PostCarousel() {
  return (
    <Carousel className="w-full px-4 sm:px-8 lg:px-12">
      <CarouselContent>
        {/* {Array.from({ length: 100 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))} */}
        
        {/* <div className="bg-red-400 w-50 h-50"></div> */}
        {Array.from({ length: 4 }).map((_, index) => (
          <CarouselItem key={index} className="pl-5 md:basis-1/2 lg:basis-1/3">
            <div className={`bg-red-400 h-10 w-10`}>
              <span>{index+1}</span>
            </div>
          </CarouselItem>
        ))}
        
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

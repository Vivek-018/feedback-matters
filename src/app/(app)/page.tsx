"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AutoPlay from "embla-carousel-autoplay";
import messages from "@/messages.json";

const Home = () => {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen">
        <section className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight">
            “Feedback Matters—Because Every Opinion Counts.”
          </h1>
          <p className="text-lg sm:text-xl text-slate-700 font-medium max-w-3xl mx-auto">
            Easily gather anonymous feedback and discover what people truly think. Share your link, get honest responses, and use insights to improve, grow, and connect.
          </p>
        </section>

        <Carousel
          plugins={[AutoPlay({ delay: 2000 })]}
          className="w-full max-w-6xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardHeader className="text-center">{message.title}</CardHeader>
                    <CardContent className="flex  items-center justify-center p-6 h-32">
                      <span className="text-4xl font-semibold">
                        {message.content}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </main>
      <footer className="text-center">@ 2025 Feedback Matters. All rights reserverd</footer>
    </>
  );
};

export default Home;

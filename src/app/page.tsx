"use client";
import React, { useState } from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BotIcon } from "lucide-react";
import { useRouter } from "next/navigation";
export default function Page() {
  const [url, setUrl] = useState<string>();
  const router = useRouter();
  return (
    <div className="h-screen px-4 w-full bg-black relative overflow-hidden">
      {/* Background with stars */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,rgba(0,0,0,0)_80%)]" />
        <div className="stars absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-8">
          HyperChat
        </h1>
        <p className="text-sm md:text-xl text-gray-300 max-w-xl mx-auto px-4">
          Turn Any Webpage Into a Conversation—Ask, Explore, and Discover
          Instantly!
        </p>
        <div className="max-w-xl w-full">
          <Input
            className="mt-6 bg-gray-100/20 border-none py-6 px-4 text-white rounded-full placeholder:text-white/60"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
          />
        </div>
        <Button
          className="mt-6 flex items-center gap-2"
          variant="secondary"
          onClick={() => router.push(`/${url}`)}
        >
          Start
          <BotIcon />
        </Button>
      </div>

      {/* Multiple shooting star layers with different colors and speeds */}
      <ShootingStars
        starColor="#9E00FF"
        trailColor="#2EB9DF"
        minSpeed={15}
        maxSpeed={35}
        minDelay={1000}
        maxDelay={3000}
      />
      <ShootingStars
        starColor="#FF0099"
        trailColor="#FFB800"
        minSpeed={10}
        maxSpeed={25}
        minDelay={2000}
        maxDelay={4000}
      />
      <ShootingStars
        starColor="#00FF9E"
        trailColor="#00B8FF"
        minSpeed={20}
        maxSpeed={40}
        minDelay={1500}
        maxDelay={3500}
      />

      <style jsx>{`
        .stars {
          background-image: radial-gradient(
              2px 2px at 20px 30px,
              #eee,
              rgba(0, 0, 0, 0)
            ),
            radial-gradient(2px 2px at 40px 70px, #fff, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 90px 40px, #fff, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 130px 80px, #fff, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0, 0, 0, 0));
          background-repeat: repeat;
          background-size: 200px 200px;
          animation: twinkle 5s ease-in-out infinite;
          opacity: 0.5;
        }

        @keyframes twinkle {
          0% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}

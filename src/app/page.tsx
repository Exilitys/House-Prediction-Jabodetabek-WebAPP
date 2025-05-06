import HeroSection from "@/components/ui/home/heroSection";
import Navbar from "@/components/ui/navbar";
import React from "react";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="relative w-full max-w-6xl mx-auto h-screen items-center justify-center flex">
        <HeroSection />
      </div>
    </div>
  );
}

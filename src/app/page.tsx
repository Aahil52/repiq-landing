"use client";

import Image from "next/image";
import WaitlistForm from "@/components/WaitlistForm";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="hero-content w-full flex flex-col lg:flex-row items-center justify-center text-center lg:text-left gap-8 lg:gap-16 px-4">
        <Image
          src="/arm.svg"
          alt="Arm holding dumbbell"
          width={220}
          height={220}
          style={{ width: "auto", height: "auto" }}
          priority
          className="drop-shadow-2xl flex-shrink-0"
        />
        <div className="flex flex-col items-center lg:items-start gap-4 lg:gap-6">
          <h1 className="text-7xl sm:text-8xl font-bold text-white drop-shadow-[0_4px_32px_rgba(0,0,0,0.7)]">RepIQ</h1>
          <span className="text-3xl sm:text-4xl font-semibold text-[#2abfd7] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">Train with Intelligence</span>
          <span className="text-3xl sm:text-4xl font-semibold text-[#2abfd7] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">Fail with Precision</span>
          <WaitlistForm />
        </div>
      </div>
    </main>
  );
}

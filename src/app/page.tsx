"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Replace this URL with your actual API endpoint
      const response = await fetch("https://api.example.com/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setEmail("");
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative">
      <div className="hero-content w-full flex flex-col lg:flex-row items-center justify-center text-center lg:text-left gap-8 lg:gap-16 px-4">
        <Image
          src="/arm.svg"
          alt="Arm holding dumbbell"
          width={220}
          height={220}
          priority
          className="drop-shadow-2xl flex-shrink-0"
        />
        <div className="flex flex-col items-center lg:items-start gap-4 lg:gap-6">
          <h1 className="text-7xl sm:text-8xl font-bold text-white drop-shadow-[0_4px_32px_rgba(0,0,0,0.7)] mt-2 mb-2 lg:mt-0 lg:mb-1">RepIQ</h1>
          <span className="text-3xl sm:text-4xl font-semibold text-[#2abfd7] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">Train with Intelligence</span>
          <span className="text-3xl sm:text-4xl font-semibold text-[#2abfd7] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">Fail with Precision</span>
          <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col items-center mt-6 gap-3">
            <input
              type="email"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#353739] text-lg shadow-sm bg-white/90"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-3 rounded-lg bg-[#353739] text-white text-lg font-semibold shadow-lg hover:bg-[#232425] transition-colors focus:outline-none focus:ring-2 focus:ring-white/60 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Join the Waitlist"}
            </button>
            {submitStatus === "success" && (
              <div className="w-full p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-medium flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Successfully joined the waitlist!
              </div>
            )}
            {submitStatus === "error" && (
              <div className="w-full p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Something went wrong. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      video.removeAttribute("autoplay");
      video.pause();
    }
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/hero-poster.svg"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src="/video.mp4" type="video/mp4" />
    </video>
  );
}

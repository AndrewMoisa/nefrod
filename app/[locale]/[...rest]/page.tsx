import { notFound } from "next/navigation";

// Catch-all for unmatched paths within a locale segment. Without this, Next.js
// renders its built-in default 404 instead of our localized not-found.tsx,
// because an unmatched URL never resolves into the [locale] segment on its own.
// Calling notFound() here hands off to app/[locale]/not-found.tsx.
export default function CatchAllNotFound() {
  notFound();
}

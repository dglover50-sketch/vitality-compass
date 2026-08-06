import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect } from "react";
import appCss from "~/styles/app.css?url";
import AmbientPlayer from "~/components/AmbientPlayer";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "Vitality Compass",
  description:
    "Science-backed personalized wellness guidance covering nutrition, movement, sleep, and mindset.",
  url: "https://hellovitalitycompass.com",
  offers: [
    { "@type": "Offer", name: "Health Audit", price: "49", priceCurrency: "USD" },
    { "@type": "Offer", name: "Monthly Guidance", price: "19", priceCurrency: "USD" },
    { "@type": "Offer", name: "Annual Commitment", price: "169", priceCurrency: "USD" },
  ],
};

export const Route = createRootRoute({
  head: () => ({
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "apple-touch-icon", href: "/pwa-icon-192.png" },
    ],
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0A6E6A" },
      { title: "Vitality Compass — Science-Backed Wellness Guidance" },
      {
        name: "description",
        content:
          "Personalized wellness guidance that fits your real life. Nutrition, movement, sleep, and mindset — backed by science, tailored to you.",
      },
      {
        property: "og:title",
        content: "Vitality Compass — Science-Backed Wellness Guidance",
      },
      {
        property: "og:description",
        content:
          "Personalized wellness guidance that fits your real life. Nutrition, movement, sleep, and mindset — backed by science, tailored to you.",
      },
      {
        property: "og:image",
        content: "/og-image.png",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(structuredData),
      },
    ],
  }),
  notFoundComponent: () => <div>Page not found</div>,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {
        // Service worker registration failed — app works without it
      });
    }
  }, []);

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <AmbientPlayer />
        <Scripts />
      </body>
    </html>
  );
}
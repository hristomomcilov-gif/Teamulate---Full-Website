"use client";

import Image from "next/image";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

type Category = "All assets" | "Content" | "Campaigns" | "Sales";

type AssetItem = {
  title: string;
  category: Exclude<Category, "All assets">;
  image: string;
  alt: string;
};

const ITEMS: AssetItem[] = [
  { title: "Blog articles", category: "Content", image: "/agents/team-collab.webp", alt: "Robot mascots collaborating around a content dashboard" },
  { title: "Social media", category: "Content", image: "/creative/asset-social.webp", alt: "Phones showing social media posts" },
  { title: "Email campaigns", category: "Campaigns", image: "/creative/asset-email.webp", alt: "Email client wrapped in purple silk" },
  { title: "Landing pages", category: "Campaigns", image: "/creative/asset-landing.webp", alt: "Browser window with a landing page and robot mascot" },
  { title: "Ad creatives", category: "Campaigns", image: "/creative/asset-ads.webp", alt: "Robotic hand holding a phone with an ad" },
  { title: "Case studies", category: "Sales", image: "/creative/asset-casestudy.webp", alt: "Robot mascot next to a case study document" },
  { title: "Reports", category: "Sales", image: "/creative/asset-reports.webp", alt: "Dark analytics dashboard with purple charts" },
  { title: "Sales collateral", category: "Sales", image: "/creative/asset-collateral.webp", alt: "Product brochure wrapped in purple silk" },
];

const CATEGORIES: Category[] = ["All assets", "Content", "Campaigns", "Sales"];

export function AssetGallery() {
  const [active, setActive] = useState<Category>("All assets");
  const visible = active === "All assets" ? ITEMS : ITEMS.filter((i) => i.category === active);

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter asset examples">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={active === category}
            onClick={() => {
              setActive(category);
              trackEvent("nav_item_clicked", { ctaId: `assets-filter-${category}`, route: "/" });
            }}
            className={`min-h-11 rounded-full px-5 text-sm font-semibold transition-colors ${
              active === category
                ? "bg-brand text-white"
                : "border border-line bg-surface text-brand hover:border-brand"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <ul className="grid gap-5 sm:grid-cols-2">
        {visible.map((item) => (
          <li key={item.title} className="flex items-center gap-5 rounded-(--tm-radius-lg) border border-line bg-surface p-5 shadow-card">
            <div className="w-28 shrink-0 text-center sm:w-32">
              <h3 className="text-base font-bold leading-snug text-ink">{item.title}</h3>
            </div>
            <div className="min-w-0 flex-1 overflow-hidden rounded-(--tm-radius-md)">
              <Image src={item.image} alt={item.alt} width={720} height={540} className="h-auto w-full object-cover" />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-center text-sm text-ink-muted">
        Decorative examples of output shapes. Not live Teamulate metrics.
      </p>
    </div>
  );
}

import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/demo/", "/app/", "/admin/", "/api/", "/login/"],
      },
    ],
    sitemap: `${SITE.domain}/sitemap.xml`,
  };
}

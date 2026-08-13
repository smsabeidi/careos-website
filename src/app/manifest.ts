import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Selmou",
    short_name: "Selmou",
    description:
      "Home care operations software for connected, traceable visit workflows.",
    start_url: "/",
    display: "standalone",
    background_color: "#f9f8f5",
    theme_color: "#f9f8f5",
    icons: [
      {
        src: "/seo/favicon-96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/seo/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vidéos | Nourhen",
  description: "Mes vidéos et créations de contenu - communication, marketing et storytelling",
};

export default function VideosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

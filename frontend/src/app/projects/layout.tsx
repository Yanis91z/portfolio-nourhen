import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Réalisations | Nourhen",
  description: "Découvrez mes réalisations en communication et marketing - campagnes, branding, stratégie digitale",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

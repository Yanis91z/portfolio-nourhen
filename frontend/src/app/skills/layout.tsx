import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compétences | Nourhen",
  description: "Mes compétences en communication, marketing digital, création de contenu, réseaux sociaux et stratégie de marque",
};

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

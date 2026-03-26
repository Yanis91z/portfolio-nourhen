import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Nourhen Ghlissi",
  description: "Contactez-moi pour vos projets en communication et marketing - formulaire de contact",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

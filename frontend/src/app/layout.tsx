import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalMouseBlob from "@/components/GlobalMouseBlob";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nourhen Ghlissi | Communication & Marketing",
  description: "Portfolio de Nourhen Ghlissi - Étudiante en L3 Communication et Marketing. Réalisations, compétences et contact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = JSON.parse(localStorage.getItem('theme-settings') || '{}');
                if (t.primaryColor) document.documentElement.style.setProperty('--color-primary', t.primaryColor);
                if (t.secondaryColor) document.documentElement.style.setProperty('--color-secondary', t.secondaryColor);
                if (t.themeMode === 'light') document.documentElement.classList.add('light');
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <GlobalMouseBlob />
          <Navbar />
          <main className="flex-1 pt-20 relative z-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

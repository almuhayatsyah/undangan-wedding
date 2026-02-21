import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Undangan Pernikahan - Herman & Amanda Shinta",
  description:
    "Kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami.",
  openGraph: {
    title: "Undangan Pernikahan - Herman & Amanda Shinta",
    description:
      "Kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/images/jodoh.jpg" type="image/jpeg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              fontFamily: "var(--font-body)",
              borderRadius: "12px",
            },
          }}
        />
      </body>
    </html>
  );
}

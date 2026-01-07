import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gym Profile - Seu Treino Personalizado",
  description: "Aplicativo de checklist para treinos de academia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-theme="light">
      <body>{children}</body>
    </html>
  );
}

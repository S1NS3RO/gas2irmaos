// Nextjs
import type { Metadata } from "next";

// ReactJs
import * as React from "react";

// Hooks
import { AppStateProvider } from "@/hooks/context";

// Styles
import "./globals.css";

// Componentes
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export const metadata: Metadata = {
  title: "Gás 2 Irmãos",
  description: "Peça seu gás",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <AppStateProvider>
      <html lang="PT-BR">
        <body>
          <Header />
          <main
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </AppStateProvider>
  );
}

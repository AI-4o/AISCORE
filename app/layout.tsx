import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "components/custom/theme-provider";
import { Shell } from "components/compositions/shell/shell";
import Image from "next/image";
import "./globals.css";
import { config } from "appConfig";
import Footer from "components/custom/footer/footer";
import StoreProvider from "./context/store-provider/store-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AISCORE360",
  description: "Pronostici e analisi per il calcio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const banner = (
    <Image
      className="banner"
      src={config.banner}
      alt={config.appName + " banner"}
      width={1200}
      height={700}
    />
  );
  const footer = <Footer />;
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Shell
              navbarItems={config.navLinks}
              banner={banner}
              sfondoPath={config.sfondo}
              mainChild={children}
              footer={footer}
            />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

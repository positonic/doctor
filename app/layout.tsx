import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Rainbow from "./rainbow";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";

import { MantineProvider } from "@mantine/core";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tradescape",
  description: "Your Insight, Everyone's Reward",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <ColorSchemeScript /> */}
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark">{children}</MantineProvider>
      </body>
    </html>
  );
}

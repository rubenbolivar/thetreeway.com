import { Source_Serif_4, Inter, JetBrains_Mono } from "next/font/google";

// Display: hero, H1/H2, case titles
export const fontDisplay = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500"], // 400 = italic pull-quote, 500 = headings
  variable: "--font-display",
  display: "swap",
});

// Sans: body, navigation, UI
export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Mono: stack tags, code
export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const fontVariables = `${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`;

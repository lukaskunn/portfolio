import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.scss";
import Header from "@/components/Header";
import CursorFollower from "@/components/CursorFollower";
import { ContactModalProvider } from "@/contexts/ContactModalContext";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_URL } from "@/utils/contants";

const gabarito = localFont({
  variable: "--font-gabarito",
  display: "swap",
  src: [
    { path: "../../public/assets/fonts/Gabarito/gabarito-v9-latin-regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/assets/fonts/Gabarito/gabarito-v9-latin-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/assets/fonts/Gabarito/gabarito-v9-latin-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/assets/fonts/Gabarito/gabarito-v9-latin-700.woff2", weight: "700", style: "normal" },
    { path: "../../public/assets/fonts/Gabarito/gabarito-v9-latin-800.woff2", weight: "800", style: "normal" },
    { path: "../../public/assets/fonts/Gabarito/gabarito-v9-latin-900.woff2", weight: "900", style: "normal" },
  ],
});

const roboto = localFont({
  variable: "--font-roboto",
  display: "swap",
  src: [
    { path: "../../public/assets/fonts/Roboto/roboto-v51-latin-100.woff2", weight: "100", style: "normal" },
    { path: "../../public/assets/fonts/Roboto/roboto-v51-latin-100italic.woff2", weight: "100", style: "italic" },
    { path: "../../public/assets/fonts/Roboto/roboto-v51-latin-200.woff2", weight: "200", style: "normal" },
    { path: "../../public/assets/fonts/Roboto/roboto-v51-latin-200italic.woff2", weight: "200", style: "italic" },
    { path: "../../public/assets/fonts/Roboto/roboto-v51-latin-300.woff2", weight: "300", style: "normal" },
    { path: "../../public/assets/fonts/Roboto/roboto-v51-latin-300italic.woff2", weight: "300", style: "italic" },
    { path: "../../public/assets/fonts/Roboto/roboto-v51-latin-regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/assets/fonts/Roboto/roboto-v51-latin-italic.woff2", weight: "400", style: "italic" },
    { path: "../../public/assets/fonts/Roboto/roboto-v51-latin-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/assets/fonts/Roboto/roboto-v51-latin-500italic.woff2", weight: "500", style: "italic" },
    { path: "../../public/assets/fonts/Roboto/roboto-v51-latin-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/assets/fonts/Roboto/roboto-v51-latin-600italic.woff2", weight: "600", style: "italic" },
    { path: "../../public/assets/fonts/Roboto/roboto-v51-latin-700.woff2", weight: "700", style: "normal" },
    { path: "../../public/assets/fonts/Roboto/roboto-v51-latin-700italic.woff2", weight: "700", style: "italic" },
    { path: "../../public/assets/fonts/Roboto/roboto-v51-latin-800.woff2", weight: "800", style: "normal" },
    { path: "../../public/assets/fonts/Roboto/roboto-v51-latin-800italic.woff2", weight: "800", style: "italic" },
    { path: "../../public/assets/fonts/Roboto/roboto-v51-latin-900.woff2", weight: "900", style: "normal" },
    { path: "../../public/assets/fonts/Roboto/roboto-v51-latin-900italic.woff2", weight: "900", style: "italic" },
  ],
});

const robotoMono = localFont({
  variable: "--font-roboto-mono",
  display: "swap",
  src: [
    { path: "../../public/assets/fonts/RobotoMono/roboto-mono-v31-latin-100.woff2", weight: "100", style: "normal" },
    { path: "../../public/assets/fonts/RobotoMono/roboto-mono-v31-latin-100italic.woff2", weight: "100", style: "italic" },
    { path: "../../public/assets/fonts/RobotoMono/roboto-mono-v31-latin-200.woff2", weight: "200", style: "normal" },
    { path: "../../public/assets/fonts/RobotoMono/roboto-mono-v31-latin-200italic.woff2", weight: "200", style: "italic" },
    { path: "../../public/assets/fonts/RobotoMono/roboto-mono-v31-latin-300.woff2", weight: "300", style: "normal" },
    { path: "../../public/assets/fonts/RobotoMono/roboto-mono-v31-latin-300italic.woff2", weight: "300", style: "italic" },
    { path: "../../public/assets/fonts/RobotoMono/roboto-mono-v31-latin-regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/assets/fonts/RobotoMono/roboto-mono-v31-latin-italic.woff2", weight: "400", style: "italic" },
    { path: "../../public/assets/fonts/RobotoMono/roboto-mono-v31-latin-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/assets/fonts/RobotoMono/roboto-mono-v31-latin-500italic.woff2", weight: "500", style: "italic" },
    { path: "../../public/assets/fonts/RobotoMono/roboto-mono-v31-latin-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/assets/fonts/RobotoMono/roboto-mono-v31-latin-600italic.woff2", weight: "600", style: "italic" },
    { path: "../../public/assets/fonts/RobotoMono/roboto-mono-v31-latin-700.woff2", weight: "700", style: "normal" },
    { path: "../../public/assets/fonts/RobotoMono/roboto-mono-v31-latin-700italic.woff2", weight: "700", style: "italic" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s — Lucas Oliveira",
  },
  description: DEFAULT_DESCRIPTION,
  authors: [{ name: "Lucas Oliveira", url: SITE_URL }],
  creator: "Lucas Oliveira",
  publisher: "Lucas Oliveira",
  referrer: "origin-when-cross-origin",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      "/favicon.ico",
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${gabarito.variable} ${roboto.variable} ${robotoMono.variable}`}
    >
      <body>
        <CursorFollower />
        <ContactModalProvider>
          <Header />
          {children}
        </ContactModalProvider>
      </body>
    </html>
  );
}

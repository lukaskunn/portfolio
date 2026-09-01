import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { LOCALES, HREFLANG, isLang } from "@/utils/locale";
import "@/styles/globals.scss";
import "lenis/dist/lenis.css";
import { ReactLenis } from "lenis/react";
import Header from "@/components/Header";
import CursorFollower from "@/components/CursorFollower";
import RouteTransition from "@/components/RouteTransition";
import RevealOnScroll from "@/components/RevealOnScroll";
import JsonLd from "@/components/JsonLd";
import { ContactModalProvider } from "@/contexts/ContactModalContext";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_URL, SITE_NAME, PERSON_ID } from "@/utils/contants";
import { sanityFetch } from "@/sanity/client";
import { settingsQuery, contactMessagesQuery } from "@/sanity/queries";
import { buildMetadata } from "@/utils/metadata";
import { CONTACT_MESSAGES_FALLBACK, type ContactMessages } from "@/utils/contactForm";
import type { Settings } from "@/types/content";

const gabarito = localFont({
  variable: "--font-gabarito",
  display: "swap",
  src: [
    { path: "../../../../public/assets/fonts/Gabarito/gabarito-v9-latin-regular.woff2", weight: "400", style: "normal" },
    { path: "../../../../public/assets/fonts/Gabarito/gabarito-v9-latin-500.woff2", weight: "500", style: "normal" },
    { path: "../../../../public/assets/fonts/Gabarito/gabarito-v9-latin-600.woff2", weight: "600", style: "normal" },
    { path: "../../../../public/assets/fonts/Gabarito/gabarito-v9-latin-700.woff2", weight: "700", style: "normal" },
    { path: "../../../../public/assets/fonts/Gabarito/gabarito-v9-latin-800.woff2", weight: "800", style: "normal" },
    { path: "../../../../public/assets/fonts/Gabarito/gabarito-v9-latin-900.woff2", weight: "900", style: "normal" },
  ],
});

const roboto = localFont({
  variable: "--font-roboto",
  display: "swap",
  src: [
    { path: "../../../../public/assets/fonts/Roboto/roboto-v51-latin-100.woff2", weight: "100", style: "normal" },
    { path: "../../../../public/assets/fonts/Roboto/roboto-v51-latin-100italic.woff2", weight: "100", style: "italic" },
    { path: "../../../../public/assets/fonts/Roboto/roboto-v51-latin-200.woff2", weight: "200", style: "normal" },
    { path: "../../../../public/assets/fonts/Roboto/roboto-v51-latin-200italic.woff2", weight: "200", style: "italic" },
    { path: "../../../../public/assets/fonts/Roboto/roboto-v51-latin-300.woff2", weight: "300", style: "normal" },
    { path: "../../../../public/assets/fonts/Roboto/roboto-v51-latin-300italic.woff2", weight: "300", style: "italic" },
    { path: "../../../../public/assets/fonts/Roboto/roboto-v51-latin-regular.woff2", weight: "400", style: "normal" },
    { path: "../../../../public/assets/fonts/Roboto/roboto-v51-latin-italic.woff2", weight: "400", style: "italic" },
    { path: "../../../../public/assets/fonts/Roboto/roboto-v51-latin-500.woff2", weight: "500", style: "normal" },
    { path: "../../../../public/assets/fonts/Roboto/roboto-v51-latin-500italic.woff2", weight: "500", style: "italic" },
    { path: "../../../../public/assets/fonts/Roboto/roboto-v51-latin-600.woff2", weight: "600", style: "normal" },
    { path: "../../../../public/assets/fonts/Roboto/roboto-v51-latin-600italic.woff2", weight: "600", style: "italic" },
    { path: "../../../../public/assets/fonts/Roboto/roboto-v51-latin-700.woff2", weight: "700", style: "normal" },
    { path: "../../../../public/assets/fonts/Roboto/roboto-v51-latin-700italic.woff2", weight: "700", style: "italic" },
    { path: "../../../../public/assets/fonts/Roboto/roboto-v51-latin-800.woff2", weight: "800", style: "normal" },
    { path: "../../../../public/assets/fonts/Roboto/roboto-v51-latin-800italic.woff2", weight: "800", style: "italic" },
    { path: "../../../../public/assets/fonts/Roboto/roboto-v51-latin-900.woff2", weight: "900", style: "normal" },
    { path: "../../../../public/assets/fonts/Roboto/roboto-v51-latin-900italic.woff2", weight: "900", style: "italic" },
  ],
});

const robotoMono = localFont({
  variable: "--font-roboto-mono",
  display: "swap",
  src: [
    { path: "../../../../public/assets/fonts/RobotoMono/roboto-mono-v31-latin-100.woff2", weight: "100", style: "normal" },
    { path: "../../../../public/assets/fonts/RobotoMono/roboto-mono-v31-latin-100italic.woff2", weight: "100", style: "italic" },
    { path: "../../../../public/assets/fonts/RobotoMono/roboto-mono-v31-latin-200.woff2", weight: "200", style: "normal" },
    { path: "../../../../public/assets/fonts/RobotoMono/roboto-mono-v31-latin-200italic.woff2", weight: "200", style: "italic" },
    { path: "../../../../public/assets/fonts/RobotoMono/roboto-mono-v31-latin-300.woff2", weight: "300", style: "normal" },
    { path: "../../../../public/assets/fonts/RobotoMono/roboto-mono-v31-latin-300italic.woff2", weight: "300", style: "italic" },
    { path: "../../../../public/assets/fonts/RobotoMono/roboto-mono-v31-latin-regular.woff2", weight: "400", style: "normal" },
    { path: "../../../../public/assets/fonts/RobotoMono/roboto-mono-v31-latin-italic.woff2", weight: "400", style: "italic" },
    { path: "../../../../public/assets/fonts/RobotoMono/roboto-mono-v31-latin-500.woff2", weight: "500", style: "normal" },
    { path: "../../../../public/assets/fonts/RobotoMono/roboto-mono-v31-latin-500italic.woff2", weight: "500", style: "italic" },
    { path: "../../../../public/assets/fonts/RobotoMono/roboto-mono-v31-latin-600.woff2", weight: "600", style: "normal" },
    { path: "../../../../public/assets/fonts/RobotoMono/roboto-mono-v31-latin-600italic.woff2", weight: "600", style: "italic" },
    { path: "../../../../public/assets/fonts/RobotoMono/roboto-mono-v31-latin-700.woff2", weight: "700", style: "normal" },
    { path: "../../../../public/assets/fonts/RobotoMono/roboto-mono-v31-latin-700italic.woff2", weight: "700", style: "italic" },
  ],
});

const STATIC_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
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

const INTRO_GATE = `<script>try{var s=sessionStorage;if(!s.getItem("intro")){s.setItem("intro","1");if(/^\\/(pt|en)\\/?$/.test(location.pathname)&&!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="playing"}}catch(e){}</script>`;

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return STATIC_METADATA;

  let settings: Settings | null = null;
  try {
    settings = await sanityFetch<Settings | null>(settingsQuery, { lang });
  } catch (error: unknown) {
    console.error("Failed to fetch settings for metadata:", error);
  }

  return {
    ...STATIC_METADATA,
    ...(settings &&
      buildMetadata({
        seo: { metaTitle: settings.defaultTitle, metaDescription: settings.defaultDescription, ogImage: settings.ogImage },
        path: `/${lang}`,
      })),
    title: settings ? { default: settings.defaultTitle, template: "%s — Lucas Oliveira" } : undefined,
  };
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  if (!isLang(lang)) notFound();

  let settings: Settings = { defaultTitle: "", defaultDescription: "" };
  let messages: ContactMessages = CONTACT_MESSAGES_FALLBACK;

  try {
    settings = (await sanityFetch<Settings | null>(settingsQuery, { lang })) ?? settings;
  } catch (error: unknown) {
    console.error("Failed to fetch settings:", error);
  }

  try {
    const fetched = await sanityFetch<Partial<ContactMessages> | null>(contactMessagesQuery, { lang });
    if (fetched) messages = { ...CONTACT_MESSAGES_FALLBACK, ...fetched };
  } catch (error: unknown) {
    console.error("Failed to fetch contact messages:", error);
  }

  const sameAs = (settings.social ?? []).map((s) => s.href).filter((href) => href.startsWith("http"));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: SITE_NAME,
        url: `${SITE_URL}/${lang}`,
        ...(settings.defaultDescription && { description: settings.defaultDescription }),
        ...(settings.email && { email: settings.email }),
        ...(settings.phone && { telephone: settings.phone }),
        ...(sameAs.length && { sameAs }),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/${lang}`,
        name: settings.defaultTitle,
        inLanguage: HREFLANG[lang],
        publisher: { "@id": PERSON_ID },
      },
    ],
  };

  return (
    <html
      lang={lang}
      className={`${gabarito.variable} ${roboto.variable} ${robotoMono.variable}`}
      style={{ viewTransitionName: "root"}}
      // The intro gate script sets data-intro before hydration, so the server
      // HTML and the client DOM differ on this element by design.
      suppressHydrationWarning
    >
      <body>
        <JsonLd data={jsonLd} />
        {/* Blocking, so the intro decision lands before first paint — no flash
            either direction. Wrapped in innerHTML rather than rendered as a
            <script> element: React never executes a script it creates on the
            client, and warns about it. Only the parser-inserted server HTML
            runs this, which is exactly the once we need. */}
        <div dangerouslySetInnerHTML={{ __html: INTRO_GATE }} />
        <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, anchors: true }} />
        <CursorFollower />
        <RouteTransition />
        <RevealOnScroll />
        <noscript>
          {/* Pre-states are unconditional CSS so they land on first paint. */}
          <style>{`[data-reveal],[data-reveal-group]>*,[data-reveal="rise"]>*>*,[data-reveal="spread"]>*{opacity:1!important;transform:none!important;clip-path:none!important;animation:none!important}[data-reveal-rule]::before,[data-reveal-rule]::after{transform:none!important;animation:none!important}[data-reveal-index]::before{opacity:1!important;transform:none!important;animation:none!important}`}</style>
        </noscript>
        <ContactModalProvider settings={settings} messages={messages}>
          <Header settings={settings} />
          {children}
        </ContactModalProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

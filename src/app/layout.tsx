import type { Metadata } from "next";
import localFont from "next/font/local";
import dynamic from "next/dynamic";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CursorProvider } from "@/contexts/CursorContext";
import { PageContextProvider } from "@/contexts/PageContext";
import { DeviceContextProvider } from "@/contexts/DeviceContext";
import { AnimationProvider } from "@/contexts/AnimationContext";
import Header from "@/components/Header";
import "@/styles/css/global.css";
import Footer from "@/components/Footer";
import generateMetadata from "@/utils/generateMetadata";
import Loading from "@/components/Loading";
import { TransitionContextProvider } from "@/contexts/TransitionContext";
import Inner from "@/components/Inner";
import HTMLWrapper from "./HTMLWrapper";
import { getLayoutContent } from "@/sanity/lib/fetch";
import { generateWebSiteJsonLd } from "@/utils/generateJsonLd";
import SkipToContent from "@/components/SkipToContent";

// Code-split heavy components that aren't critical for initial render
const CursorFollower = dynamic(() => import("@/components/CursorFollower"), { ssr: false });

const gloockFont = localFont({
  variable: "--font-gloock",
  src: [
    {
      path: "../../public/assets/fonts/gloock/Gloock-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ]
})

const aksharFont = localFont({
  variable: "--font-akshar",
  src: [
    {
      path: "../../public/assets/fonts/akshar/Akshar-VariableFont_wght.ttf",
      weight: "100 700",
      style: "normal",
    },
  ]
})

const robotoMonoFont = localFont({
  variable: "--font-roboto-mono",
  src: [
    {
      path: "../../public/assets/fonts/roboto-mono/RobotoMono-Italic-VariableFont_wght.ttf",
      weight: "100 700",
      style: "italic",
    },
    {
      path: "../../public/assets/fonts/roboto-mono/RobotoMono-VariableFont_wght.ttf",
      weight: "100 700",
      style: "normal",
    }
  ]
})

const robotoFont = localFont({
  variable: "--font-roboto",
  src: [
    {
      path: "../../public/assets/fonts/roboto/Roboto-VariableFont_wdth,wght.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/roboto/Roboto-Italic-VariableFont_wdth,wght.ttf",
      weight: "100 900",
      style: "italic",
    }
  ]
})

export const metadata: Metadata = generateMetadata()

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch layout content from Sanity
  const { header, footer } = await getLayoutContent();

  // Generate JSON-LD structured data for the website
  const websiteJsonLd = generateWebSiteJsonLd({
    name: "Lucas Oliveira - Portfolio",
    url: "https://lucasoliveira.io",
    description: "Creative Frontend developer specializing in React, Next.js, and TypeScript. Creating beautiful, accessible, and performant web experiences.",
    author: {
      name: "Lucas Oliveira",
      jobTitle: "Frontend Developer & Creative Web Designer",
      url: "https://lucasoliveira.io",
      sameAs: [
        "https://github.com/lucaskun",
        "https://linkedin.com/in/lucasoliveira",
      ]
    }
  });

  return (
    <AppProviders>
      <HTMLWrapper className={`${aksharFont.variable} ${robotoMonoFont.variable} ${robotoFont.variable} ${gloockFont.variable}`}>
        <body>
          {/* JSON-LD Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
          />
          <SkipToContent />
          <Inner>
            <Loading />
            <CursorFollower />
            <Header data={header} />
            {children}
            <Footer data={footer} />
          </Inner>
          <SpeedInsights />
        </body>
      </HTMLWrapper>
    </AppProviders>
  );
}

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CursorProvider>
        <PageContextProvider>
          <AnimationProvider>
            <DeviceContextProvider>
              <TransitionContextProvider>
                {children}
              </TransitionContextProvider>
            </DeviceContextProvider>
          </AnimationProvider>
        </PageContextProvider>
      </CursorProvider>
    </>
  );
}

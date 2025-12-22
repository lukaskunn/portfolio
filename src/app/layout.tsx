import type { Metadata } from "next";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CursorProvider } from "@/contexts/CursorContext";
import { PageContextProvider } from "@/contexts/PageContext";
import { DeviceContextProvider } from "@/contexts/DeviceContext";
import { AnimationProvider } from "@/contexts/AnimationContext";
import CursorFollower from "@/components/CursorFollower";
import Header from "@/components/Header";
import "@/styles/css/global.css";
import Footer from "@/components/Footer";
import generateMetadata from "@/utils/generateMetadata";
import Loading from "@/components/Loading";
import { TransitionContextProvider } from "@/contexts/TransitionContext";
import Inner from "@/components/Inner";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${aksharFont.variable} ${robotoMonoFont.variable} ${robotoFont.variable} ${gloockFont.variable}`}>
      <body>
        <AppProviders>
          <Inner>

            <Loading />
            <CursorFollower />
            <Header />
            {children}
            <Footer />
          </Inner>
        </AppProviders>
        <SpeedInsights />
      </body>
    </html>
  );
}

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CursorProvider>
        <PageContextProvider>
          <AnimationProvider>
            <DeviceContextProvider>
              <LanguageProvider>
                <TransitionContextProvider>
                  {children}
                </TransitionContextProvider>
              </LanguageProvider>
            </DeviceContextProvider>
          </AnimationProvider>
        </PageContextProvider>
      </CursorProvider>
    </>
  );
}

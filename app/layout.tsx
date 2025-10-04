import dynamic from "next/dynamic";
import CursorFollower from "../src/components/CursorFollower";
import Header from "../src/components/Header";
import Loading from "../src/components/Loading";
import { CursorProvider } from "../src/contexts/CursorContext";
import { DeviceContextProvider } from "../src/contexts/DeviceContext";
import { LanguageProvider } from "../src/contexts/LanguageContext";
import { PageContextProvider } from "../src/contexts/PageContext";
import TransitionLayout from "../src/Layouts/TransitionLayout";
import { TransitionProvider } from "../src/contexts/TransitionContext";
import AnimatePresenceContainer from "../src/Layouts/AnimatePresenceContainer";

import "../src/styles/scss/globals.css";
import "../src/styles/scss/allFiles.css";

import type { Metadata } from "next";
import generateMetadata from "../src/utils/generateMetadata";
export const metadata: Metadata = generateMetadata();

const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights),
  {
    ssr: process.env.NODE_ENV === "production",
  },
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <Loading />
          <CursorFollower />
          <Header />
          {children}
        </AppProviders>
        <SpeedInsights />
      </body>
    </html>
  );
}

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresenceContainer>
      <CursorProvider>
        <TransitionProvider>
          <TransitionLayout>
            <PageContextProvider>
              <DeviceContextProvider>
                <LanguageProvider>{children}</LanguageProvider>
              </DeviceContextProvider>
            </PageContextProvider>
          </TransitionLayout>
        </TransitionProvider>
      </CursorProvider>
    </AnimatePresenceContainer>
  );
}

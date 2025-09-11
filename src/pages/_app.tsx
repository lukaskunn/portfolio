'use client';
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import CursorFollower from "../components/CursorFollower";
import WebsiteHead from "../components/Head";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { CursorProvider } from "../contexts/CursorContext";
import { DeviceContextProvider } from "../contexts/DeviceContext";
import { LanguageProvider } from "../contexts/LanguageContext";
import { PageContextProvider } from "../contexts/PageContext";
import TransitionLayout from "../Layouts/TransitionLayout";
import { TransitionProvider } from "../Layouts/TransitionProvider";
import { AnimatePresence, motion } from "framer-motion";

import "../styles/scss/globals.css";
import "../styles/scss/allFiles.css";
import "../styles/scss/_transitions.scss";

const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights),
  {
    ssr: process.env.NODE_ENV === "production",
  },
);

/**
 * The MyApp function serves as the custom App component for the Next.js application.
 * It wraps the entire application with necessary providers and layouts, ensuring
 * global state management, transitions, and shared components like the header and cursor follower.
 */
function MyApp({ Component, pageProps, router }: AppProps) {
  console.log(pageProps);
  console.log(Component);
  return (
    <>
      <SpeedInsights />
      <WebsiteHead />
      <AppProviders>
        <Loading />
        <CursorFollower />
        <AnimatePresence mode="wait">
          <motion.div
            key={router.route}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Header />
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </AppProviders >
    </>
  );
}

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <CursorProvider>
      <TransitionProvider>
        {/* <TransitionLayout> */}
          <PageContextProvider>
            <DeviceContextProvider>
              <LanguageProvider>{children}</LanguageProvider>
            </DeviceContextProvider>
          </PageContextProvider>
        {/* </TransitionLayout> */}
      </TransitionProvider>
    </CursorProvider>
  );
}

export default MyApp;

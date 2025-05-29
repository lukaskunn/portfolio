import React from "react";
import type { AppProps } from "next/app";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { DeviceContextProvider } from "../contexts/DeviceContext";
import { PageContextProvider } from "../contexts/PageContext";
import { LanguageProvider } from "../contexts/LanguageContext";
import { CursorProvider } from "../contexts/CursorContext";
import { TransitionProvider } from "../Layouts/TransitionProvider";
import TransitionLayout from "../Layouts/TransitionLayout";
import CursorFollower from "../components/CursorFollower";
import Header from "../components/Header";
import WebsiteHead from "../components/Head";
import Loading from "../components/Loading";

import "../styles/scss/globals.css";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <SpeedInsights />
      <WebsiteHead />
      <CursorProvider>
        <TransitionProvider>
          <TransitionLayout>
            <PageContextProvider>
              <DeviceContextProvider>
                <LanguageProvider>
                  <Loading pageRoute={router.route} />
                  <CursorFollower />
                  <Header />
                  <Component {...pageProps} />
                </LanguageProvider>
              </DeviceContextProvider>
            </PageContextProvider>
          </TransitionLayout>
        </TransitionProvider>
      </CursorProvider>
    </>
  );
}

export default MyApp;

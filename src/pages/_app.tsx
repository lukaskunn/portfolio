import React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { DeviceContextProvider } from "../contexts/DeviceContext";
import { PageContextProvider } from "../contexts/PageContext";
import { LanguageProvider } from "../contexts/LanguageContext";
import { CursorProvider } from "../contexts/CursorContext";
import CursorFollower from "../components/CursorFollower";
import Header from "../components/Header";
import Loading from "../components/Loading";

import "../styles/globals.scss";
import "../styles/allFiles.scss"

function MyApp({ Component, pageProps, router }: AppProps) {
    return (
        <>
            <SpeedInsights />
            <Head>
                <title>Lucas Oliveira - portfolio</title>
                <meta name="description" content="My personal portfolio" />
            </Head>
            <PageContextProvider>
                <DeviceContextProvider>
                    <LanguageProvider>
                        <CursorProvider>
                            <Loading pageRoute={router.route} />
                            <CursorFollower />
                            <Header />
                            <AnimatePresence mode="wait" initial={false}>
                                <Component {...pageProps} key={router.route} />
                            </AnimatePresence>
                        </CursorProvider>
                    </LanguageProvider>
                </DeviceContextProvider>
            </PageContextProvider>
        </>
    );
}

export default MyApp;


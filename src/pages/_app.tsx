import "../styles/globals.scss";
import React from "react";
import type { AppProps } from "next/app";
import { PageContextProvider } from "../contexts/PageContext";
import { AnimatePresence } from "framer-motion";
import Loading from "../components/Loading";
import Header from "../components/Header";
import Head from "next/head";
import CursorFollower from "../components/CursorFollower";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "../styles/globals.scss";
import "../styles/About.module.scss";
import "../styles/Contact.module.scss";
import "../styles/CursorFollower.module.scss";
import "../styles/Curve.module.scss";
import "../styles/header.module.scss";
import "../styles/Home.module.scss";
import "../styles/Loading.module.scss";
import "../styles/ImageBackground.module.scss";
import "../styles/InitialTransition.module.scss";
import "../styles/NextPageButton.module.scss";
import "../styles/ProjectCard.module.scss";
import "../styles/Resume.module.scss";
import "../styles/resumeCard.module.scss";
import "../styles/Skills.module.scss";
import "../styles/Works.module.scss";
import "../styles/ProjectItem.module.scss";
import "../styles/ProjectModal.module.scss";
import "../styles/ProjectPage.module.scss";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <SpeedInsights />
      <Head>
        <title>Lucas Oliveira - portfolio</title>
        <meta name="description" content="My personal portfolio" />
      </Head>
      <PageContextProvider>
        <Loading pageRoute={router.route} />
        <CursorFollower />
        <Header />
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </PageContextProvider>
    </>
  );
}

export default MyApp;


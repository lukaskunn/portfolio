import dynamic from "next/dynamic";
import styles from "@/styles/css/Homepage.module.css";
import TitleComponent from "./TitleComponent";
import { getLandingContent } from "@/sanity/lib/fetch";
import generateMetadataUtil from "@/utils/generateMetadata";

// Code-split image and background grid (non-critical for LCP)
const HomeImage = dynamic(() => import("./HomeImage"), {
  loading: () => <div style={{ minHeight: '480px' }} />
});
const BackgroundGrid = dynamic(() => import("./BackgroundGrid"), { ssr: true });

export async function generateMetadata() {
  const landing = await getLandingContent();
  return generateMetadataUtil(landing.seo, undefined, undefined, undefined, "/home");
}

export default function Home() {
  return (
    <main id="main-content" className={styles.main} role="main" aria-label="Homepage content">
      <TitleComponent />
      <HomeImage />
      <BackgroundGrid />
    </main>
  );
}

import styles from "@/styles/css/Homepage.module.css";
import TitleComponent from "./TitleComponent";
import HomeImage from "./HomeImage";
import BackgroundGrid from "./BackgroundGrid";
import { getLandingContent } from "@/sanity/lib/fetch";
import generateMetadataUtil from "@/utils/generateMetadata";

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

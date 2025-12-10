import styles from "@/styles/css/Homepage.module.css";
import TitleComponent from "./TitleComponent";
import HomeImage from "./HomeImage";
import BackgroundGrid from "./BackgroundGrid";

export default function Home() {
  return (
    <main className={styles.main}>
      <TitleComponent />
      <HomeImage />
      <BackgroundGrid />
    </main>
  );
}

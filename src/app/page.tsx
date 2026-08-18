import Footer from "@/components/Footer"
import ScrollProgress from "@/components/ScrollProgress"
import Loader from "@/components/Loader"
import { buildMetadata } from "@/utils/metadata"
import HeroSection from "@/components/HeroSection";
import WorksSection from "@/components/WorksSection";
import HomeBackdrop from "@/components/HomeBackdrop";
import style from "@/styles/homepage/home.module.scss";

export const metadata = buildMetadata({ path: "/" })

export default function Home() {
  return (
    <>
      <Loader />
      <main id="main-content">
        <div className={style.pin}>
          <HomeBackdrop />
          <HeroSection />
        </div>
        <WorksSection />
      </main>
      <ScrollProgress />
      <Footer />
    </>
  );
}

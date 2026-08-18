import Footer from "@/components/Footer"
import ScrollProgress from "@/components/ScrollProgress"
import Loader from "@/components/Loader"
import { buildMetadata } from "@/utils/metadata"
import HeroSection from "./HeroSection";
import WorksSection from "./WorksSection";
import Dither from '@/components/Dither';
import heroStyle from "@/styles/homepage/hero.module.scss";

export const metadata = buildMetadata({ path: "/" })

export default function Home() {
  return (
    <>
      <Loader />
      <main id="main-content">
        <div className={heroStyle.pin}>
          <div className={heroStyle.backdrop}>
            <Dither
              waveColor={[1, 1, 1]}
              pixelSize={4.5}
              disableAnimation={false}
              enableMouseInteraction
              mouseRadius={0.35}
              colorNum={3.5}
              waveAmplitude={0.2}
              waveFrequency={10}
              waveSpeed={0.1}
            />
          </div>
          <HeroSection />
        </div>
        <WorksSection />
      </main>
      <ScrollProgress />
      <Footer />
    </>
  );
}

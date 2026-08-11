import Footer from "@/components/Footer"
import { buildMetadata } from "@/utils/metadata"
import HeroSection from "./HeroSection";
import WorksSection from "./WorksSection";

export const metadata = buildMetadata({ path: "/" })

export default function Home() {
  return (
    <>
      <main id="main-content">
        <HeroSection />
        <WorksSection />
      </main>
      <Footer />
    </>
  );
}

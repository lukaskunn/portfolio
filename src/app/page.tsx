import Footer from "@/components/Footer"
import HeroSection from "./HeroSection";
import WorksSection from "./WorksSection";

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

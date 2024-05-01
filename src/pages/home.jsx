import HeroSection from "../components/home/hero-section";
import UploadSection from "../components/home/upload-section";
import AboutSection from "../components/home/about-section";

export default function Home() {
  window.scrollTo({
    top: 0,
  });
  return (
    <div className="home-page">
      <HeroSection />

      <UploadSection />

      <AboutSection />
    </div>
  );
}

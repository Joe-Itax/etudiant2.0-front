import HeroSection from "../components/home/hero-section";
import UploadSection from "../components/home/upload-section";
import AboutSection from "../components/home/about-section";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  // console.log("token: ", localStorage.getItem("jwt"));
  return (
    <div className="home-page">
      <HeroSection />

      <UploadSection />

      <AboutSection />
    </div>
  );
}

import React from "react";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/layout/HeroSection";
import FeaturesSection from "../components/layout/FeaturesSection";
import AboutSection from "../components/layout/AboutSection";
import TestimonialsSection from "../components/layout/TestimonialsSection";
import CTABannerSection from "../components/layout/CTABannerSection";
import Footer from "../components/layout/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <TestimonialsSection />
      <CTABannerSection />
      <Footer />
    </>
  );
}

export default Home;
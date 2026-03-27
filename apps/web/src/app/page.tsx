import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorks from "@/components/sections/HowItWorks";
import FeaturedCourts from "@/components/sections/FeaturedCourts";
import OwnerBenefits from "@/components/sections/OwnerBenefits";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <FeaturedCourts />
        <OwnerBenefits />
      </main>
      <Footer />
    </div>
  );
}

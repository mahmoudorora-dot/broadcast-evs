import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SkillsTicker from "@/components/SkillsTicker";
import AboutSection from "@/components/AboutSection";
import ShowreelSection from "@/components/ShowreelSection";
import FilmStripSlider from "@/components/FilmStripSlider";
import GallerySection from "@/components/GallerySection";
import EventsSection from "@/components/EventsSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <SkillsTicker />
      <AboutSection />
      <ShowreelSection />
      <GallerySection />
      <EventsSection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;

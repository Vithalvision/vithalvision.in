import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import AboutPreview from "@/components/home/AboutPreview";
import ServicesSection from "@/components/home/ServicesSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Vithal Vision | Film Production & Media Technology",
  description:
    "Vithal Visions Private Limited – Creating Stories, Building Technology, Empowering Creators.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <ServicesSection />
      <ProjectsSection />
      <CTASection />
    </>
  );
}

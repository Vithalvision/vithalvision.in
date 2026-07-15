import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import CompanyIntro from "@/components/about/CompanyIntro";
import MissionVisionValues from "@/components/about/MissionVisionValues";
import FoundersSection from "@/components/about/FoundersSection";
import JourneyTimeline from "@/components/about/JourneyTimeline";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Vithal Visions Private Limited – our story, mission, vision and the team behind the brand.",
  alternates: {
    canonical: "https://vithalvision.in/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <CompanyIntro />
      <MissionVisionValues />
      <FoundersSection />
      <JourneyTimeline />
    </>
  );
}

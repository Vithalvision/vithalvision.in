import type { Metadata } from "next";
import CareerPage from "@/components/careers/CareerPage";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore careers at Vithal Vision across film production, AI, media, marketing and technology.",
  alternates: {
    canonical: "https://vithalvision.in/careers",
  },
};

export default function CareersRoute() {
  return <CareerPage />;
}

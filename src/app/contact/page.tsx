import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import InquiryTypes from "@/components/contact/InquiryTypes";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Vithal Visions Private Limited for film production, studio bookings, partnerships and investor inquiries.",
  alternates: {
    canonical: "https://vithalvision.in/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <InquiryTypes />
    </>
  );
}

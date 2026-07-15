"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { companyInfo } from "@/data";


export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const contactDetails = [
    {
      Icon: Mail,
      label: "Email",
      value: companyInfo.email,
      href: `mailto:${companyInfo.email}`,
    },
    {
      Icon: Phone,
      label: "Phone",
      value: companyInfo.phone,
      href: `tel:${companyInfo.phone}`,
    },
    {
      Icon: MapPin,
      label: "Location",
      value: companyInfo.address,
      href: "#",
    },
    {
      Icon: Clock,
      label: "Working Hours",
      value: companyInfo.businessHours,
      href: "#",
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left – Contact Info */}
          <div>
            <p className="eyebrow mb-4">Get In Touch</p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-4 gold-underline leading-tight">
              We&apos;d Love to Hear From You
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mt-6 mb-10">
              Whether you have a project in mind, want to collaborate, or explore business opportunities, we are here to connect.
            </p>

            <div className="space-y-6">
              {contactDetails.map(({ Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-gold" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs tracking-widest uppercase mb-0.5">{label}</div>
                    <a
                      href={href}
                      className="text-gray-900 text-sm font-medium hover:text-gold transition-colors"
                    >
                      {value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right – Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-700 text-xs tracking-widest uppercase mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="w-full px-4 py-3 border border-gray-200 text-gray-900 text-sm bg-gray-50 placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-xs tracking-widest uppercase mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    required
                    className="w-full px-4 py-3 border border-gray-200 text-gray-900 text-sm bg-gray-50 placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-700 text-xs tracking-widest uppercase mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    className="w-full px-4 py-3 border border-gray-200 text-gray-900 text-sm bg-gray-50 placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-xs tracking-widest uppercase mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 text-gray-900 text-sm bg-gray-50 focus:outline-none focus:border-gold transition-colors appearance-none"
                  >
                    <option value="">Select Inquiry type</option>
                    <option value="production">Production Inquiry</option>
                    <option value="studio">Studio Inquiry</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="investor">Investor Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 text-xs tracking-widest uppercase mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 text-gray-900 text-sm bg-gray-50 placeholder-gray-400 focus:outline-none focus:border-gold transition-colors resize-none"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="btn-gold w-full py-3.5 text-sm rounded-sm uppercase tracking-widest"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

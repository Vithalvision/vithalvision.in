import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/logo.png"
                  alt="Vithal Vision Logo"
                  fill
                  className="object-contain invert"
                />
              </div>

              
            </Link>

            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              Creating stories, building technology and empowering creators.
            </p>
            <div className="mb-5">
              <a
                  href="https://www.startupindia.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
              >
              <Image
                src="/images/footer.png"
                alt="DPIIT Recognised Startup"
                width={180}
                height={80}
                className="object-contain"
              />
              </a>
            </div>
            <div className="text-xs text-gray-500 leading-6 mb-6">
              <p>Startup India DPIIT Recognised Startup</p>
              <p>Registered Name: Vithal Vision Private Limited</p>
              <p>CIN: U59114MH2023PTC159150</p>
              <p>DPIIT: DPIIT88934</p>
              <p>GST: 27AAKCV6810E1Z9</p>
              <p>UDYAM: UDYAM-MH-11-0038675</p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-8 h-8 border border-gray-200 rounded-sm flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-all"
              >
                <Facebook size={14} />
              </a>

              <a
                href="#"
                className="w-8 h-8 border border-gray-200 rounded-sm flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-all"
              >
                <Twitter size={14} />
              </a>

              <a
                href="#"
                className="w-8 h-8 border border-gray-200 rounded-sm flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-all"
              >
                <Instagram size={14} />
              </a>

              <a
                href="#"
                className="w-8 h-8 border border-gray-200 rounded-sm flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-all"
              >
                <Youtube size={14} />
              </a>

              <a
                href="#"
                className="w-8 h-8 border border-gray-200 rounded-sm flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-all"
              >
                <Linkedin size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold text-sm tracking-widest uppercase mb-5 pb-3 border-b border-gray-200">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-gold text-sm"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gold text-sm"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/projects"
                  className="text-gray-600 hover:text-gold text-sm"
                >
                  Projects
                </Link>
              </li>

              <li>
                <Link
                  href="/services"
                  className="text-gray-600 hover:text-gold text-sm"
                >
                  Services
                </Link>
              </li>

              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-gold text-sm"
                >
                  Blog
                </Link>
              </li>

              <li>
                <Link
                  href="/gallery"
                  className="text-gray-600 hover:text-gold text-sm"
                >
                  Gallery
                </Link>
              </li>

              <li>
                <Link
                  href="/auditions"
                  className="text-gray-600 hover:text-gold text-sm"
                >
                  Auditions
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-gold text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-gray-900 font-semibold text-sm tracking-widest uppercase mb-5 pb-3 border-b border-gray-200">
              Legal
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-gold text-sm"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-gold text-sm"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/disclaimer"
                  className="text-gray-600 hover:text-gold text-sm"
                >
                  Disclaimer
                </Link>
              </li>

              <li>
                <Link
                  href="/refund-policy"
                  className="text-gray-600 hover:text-gold text-sm"
                >
                  Refund Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-gold text-sm"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-900 font-semibold text-sm tracking-widest uppercase mb-5 pb-3 border-b border-gray-200">
              Contact Us
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              Have questions about our services, projects, or collaborations?
              Our team is here to help.
            </p>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={14} className="text-gold mt-1 shrink-0" />
                <span className="text-gray-600 text-sm">
                  info@vithalvision.in
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Phone size={14} className="text-gold mt-1 shrink-0" />
                <span className="text-gray-600 text-sm">
                  +919145594704
                </span>
              </li>

              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-gold mt-1 shrink-0" />
                <span className="text-gray-600 text-sm">
                  Gondia, Maharashtra, India
                </span>
              </li>
            </ul>

            <p className="text-gray-500 text-xs leading-6 mt-6">
              Vithal Vision is a creative media and technology company focused
              on storytelling, innovation, and digital transformation. All
              services, projects, and collaborations are subject to individual
              agreements and company policies.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-400 text-xs">
            © 2025 Vithal Vision Private Limited. All Rights Reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-gold text-xs"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-gray-400 hover:text-gold text-xs"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/refund-policy"
              className="text-gray-400 hover:text-gold text-xs"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
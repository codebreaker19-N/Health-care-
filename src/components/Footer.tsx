import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-cta flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" fill="currentColor" />
              </div>
              <span className="text-xl font-serif font-bold text-background">Arogyabandhu</span>
            </div>
            <p className="text-sm leading-relaxed text-background/60">
              Bridging the gap between affordability, awareness, and accessibility in healthcare across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-background font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "About Us", path: "/about" },
                { label: "Get Help", path: "/get-help" },
                { label: "Donate", path: "/donate" },
                { label: "Schemes", path: "/schemes" },
                { label: "Partners", path: "/partners" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-background font-semibold mb-4">Support</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "FAQ", path: "/faq" },
                { label: "Contact Us", path: "/contact" },
                { label: "Blog", path: "/blog" },
                { label: "Privacy Policy", path: "#" },
                { label: "Terms of Service", path: "#" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-background font-semibold mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-background/60">
                <Mail className="w-4 h-4" />
                <span>support@arogyabandhu.org</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-background/60">
                <Phone className="w-4 h-4" />
                <span>+91 1800-XXX-XXXX</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-background/60">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 text-center text-sm text-background/40">
          <p>© {new Date().getFullYear()} Arogyabandhu. All rights reserved. Made with ❤️ for India.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

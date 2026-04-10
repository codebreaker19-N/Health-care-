import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Get Help", path: "/get-help" },
  { label: "Donate", path: "/donate" },
  { label: "Schemes", path: "/schemes" },
  { label: "Partners", path: "/partners" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-cta flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary-foreground" fill="currentColor" />
          </div>
          <span className="text-xl font-serif font-bold text-foreground">Arogyabandhu</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "text-primary bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Button variant="hero-outline" size="sm" asChild>
            <Link to="/get-help">Get Help</Link>
          </Button>
          <Button variant="hope" size="sm" asChild>
            <Link to="/donate">
              <Heart className="w-4 h-4" /> Donate
            </Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-accent"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-card animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:bg-accent/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 mt-3 pt-3 border-t border-border">
              <Button variant="hero-outline" size="sm" className="flex-1" asChild>
                <Link to="/get-help" onClick={() => setMobileOpen(false)}>Get Help</Link>
              </Button>
              <Button variant="hope" size="sm" className="flex-1" asChild>
                <Link to="/donate" onClick={() => setMobileOpen(false)}>
                  <Heart className="w-4 h-4" /> Donate
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

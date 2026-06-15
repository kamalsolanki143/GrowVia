import Logo from "@/components/shared/Logo";
import { Heart } from "lucide-react";

const footerLinks = [
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About", href: "/#stats" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-[#f5e6d3] dark:bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Your Career, Engineered.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex flex-wrap items-center justify-center gap-6">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            
            {/* Team */}
            <div className="flex flex-col items-center md:items-start text-sm text-muted-foreground border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6 mt-4 md:mt-0">
              <span className="font-medium text-foreground mb-1">Built by:</span>
              <span>Kamal Solanki (CEO & Founder)</span>
              <span>Muskan (Co-Founder & Backend Lead)</span>
            </div>
          </nav>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" /> by students, for students — India 🇮🇳
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Growvia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

import { Crown, Leaf, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gold-gradient rounded-xl flex items-center justify-center">
                <Crown className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-serif text-2xl font-bold">
                Agro<span className="text-gold">Royal</span> TN
              </span>
            </div>
            <p className="text-background/70 mb-6 max-w-md">
              Connecting Tamil Nadu's finest farmers directly with buyers. 
              Premium quality produce, verified by AI, delivered with care.
            </p>
            <div className="flex items-center gap-2 text-gold">
              <Leaf className="w-4 h-4" />
              <span className="text-sm">100% Organic Certified</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-background/70">
              {["Marketplace", "Our Farmers", "Districts", "Quality Promise", "Blog"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-gold transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-background/70">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold" />
                <span>hello@agroroyal.tn</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold" />
                <span>+91 94433 00000</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold mt-1" />
                <span>Salem, Tamil Nadu, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/50 text-sm">
            © 2025 AgroRoyal TN. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-background/50">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

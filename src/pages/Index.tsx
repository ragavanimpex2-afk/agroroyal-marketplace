import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScanCropModal from "@/components/ScanCropModal";
import DynamicPriceCard from "@/components/DynamicPriceCard";
import DistrictCard from "@/components/DistrictCard";
import RoyalCheckout from "@/components/RoyalCheckout";
import Footer from "@/components/Footer";
import { Crown, Sparkles } from "lucide-react";

const districts = [
  {
    district: "Salem",
    stock: 15200,
    specialty: "Alphonso Mangoes",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    godownLocation: "Salem Central Warehouse, NH-44",
    nextDelivery: "Tomorrow, 6:00 AM",
  },
  {
    district: "Dindigul",
    stock: 8500,
    specialty: "Banganapalli Mangoes",
    image: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&w=800&q=80",
    godownLocation: "Dindigul Agri Hub, Bypass Road",
    nextDelivery: "Jan 27, 2025",
  },
  {
    district: "Erode",
    stock: 12800,
    specialty: "Robusta Bananas",
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=800&q=80",
    godownLocation: "Erode Trade Complex, Near SIPCOT",
    nextDelivery: "Tomorrow, 8:00 AM",
  },
];

const Index = () => {
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <Hero onScanClick={() => setIsScanModalOpen(true)} />
      
      {/* Scan Crop Modal */}
      <ScanCropModal 
        isOpen={isScanModalOpen} 
        onClose={() => setIsScanModalOpen(false)} 
      />

      {/* Featured Products Section */}
      <section className="py-20 bg-royal-cream" id="marketplace">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium text-gold">Live Pricing</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Today's <span className="text-gold-gradient">Royal</span> Picks
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Fresh from Tamil Nadu farms. Prices update in real-time based on market demand and bulk orders.
            </p>
          </motion.div>

          <div className="max-w-md mx-auto">
            <DynamicPriceCard />
          </div>
        </div>
      </section>

      {/* Districts Section */}
      <section className="py-20" id="districts">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 px-4 py-2 rounded-full mb-4">
              <Crown className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium text-gold">District Godowns</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Explore by <span className="text-gold-gradient">Region</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Tap on any card to reveal godown stock details and delivery schedules.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {districts.map((district, index) => (
              <motion.div
                key={district.district}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <DistrictCard {...district} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Royal Checkout Section */}
      <RoyalCheckout />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;

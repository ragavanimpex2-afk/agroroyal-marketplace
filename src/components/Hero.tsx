import { motion } from "framer-motion";
import { Crown, Leaf, Scan } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onScanClick: () => void;
}

const Hero = ({ onScanClick }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=1920&q=80"
        >
          <source
            src="https://player.vimeo.com/external/449623678.sd.mp4?s=1aaef9a83a4b3e53c3f4f1c0a8e7e65da7c7e1e5&profile_id=164&oauth2_token_id=57447761"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Crown Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border px-6 py-2 rounded-full mb-8"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Crown className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium text-muted-foreground">Premium Tamil Nadu Produce</span>
            <Leaf className="w-4 h-4 text-gold" />
          </motion.div>

          {/* Title */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            <span className="text-foreground">Agro</span>
            <span className="text-gold-gradient">Royal</span>
            <span className="text-foreground"> TN</span>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Where tradition meets technology. Direct from Tamil Nadu's finest farms 
            to your doorstep — mangoes, bananas & more, verified by AI.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={onScanClick}
              size="lg"
              className="bg-gold-gradient text-primary-foreground hover:opacity-90 shadow-gold px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
            >
              <Scan className="w-5 h-5 mr-2" />
              Scan Crop Quality
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-gold/30 hover:border-gold hover:bg-gold/5 px-8 py-6 text-lg rounded-full transition-all duration-300"
            >
              Explore Marketplace
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gold/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-gold rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

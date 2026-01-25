import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Package, Warehouse, Truck } from "lucide-react";

interface DistrictCardProps {
  district: string;
  stock: number;
  specialty: string;
  image: string;
  godownLocation: string;
  nextDelivery: string;
}

const DistrictCard = ({
  district,
  stock,
  specialty,
  image,
  godownLocation,
  nextDelivery,
}: DistrictCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="h-[400px] cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 bg-card border border-border rounded-3xl overflow-hidden shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="relative h-full">
            <img
              src={image}
              alt={district}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
            
            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-gold" />
                <span className="text-gold text-sm font-medium">{district} District</span>
              </div>
              <h3 className="font-serif text-2xl font-bold mb-2">{specialty}</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Package className="w-4 h-4" />
                  <span className="text-sm">{stock.toLocaleString()} kg</span>
                </div>
                <div className="px-2 py-0.5 bg-gold-gradient rounded-full text-primary-foreground text-xs font-semibold">
                  In Stock
                </div>
              </div>
            </div>

            {/* Tap indicator */}
            <div className="absolute top-4 right-4 bg-background/20 backdrop-blur-sm text-background px-3 py-1 rounded-full text-xs">
              Tap to flip
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 bg-card border border-border rounded-3xl overflow-hidden shadow-lg p-6 flex flex-col"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Warehouse className="w-5 h-5 text-gold" />
            <h3 className="font-serif text-xl font-bold">Godown Details</h3>
          </div>

          <div className="space-y-4 flex-1">
            <div className="bg-muted rounded-2xl p-4">
              <p className="text-sm text-muted-foreground mb-1">Location</p>
              <p className="font-medium">{godownLocation}</p>
            </div>

            <div className="bg-muted rounded-2xl p-4">
              <p className="text-sm text-muted-foreground mb-1">Current Stock</p>
              <p className="font-serif text-3xl font-bold text-gold">{stock.toLocaleString()} kg</p>
            </div>

            <div className="bg-muted rounded-2xl p-4 flex items-center gap-3">
              <Truck className="w-5 h-5 text-gold" />
              <div>
                <p className="text-sm text-muted-foreground">Next Delivery</p>
                <p className="font-medium">{nextDelivery}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border text-center text-sm text-muted-foreground">
            Tap to see front
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DistrictCard;

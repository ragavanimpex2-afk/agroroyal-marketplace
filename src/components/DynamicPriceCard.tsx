import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, TrendingUp, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

const DynamicPriceCard = () => {
  const [quantity, setQuantity] = useState(5);
  const [displayPrice, setDisplayPrice] = useState(0);
  
  const basePrice = 450; // Price per kg
  const bulkDiscount = quantity >= 10 ? 0.15 : quantity >= 5 ? 0.08 : 0;
  const pricePerKg = basePrice * (1 - bulkDiscount);
  const totalPrice = pricePerKg * quantity;

  useEffect(() => {
    // Animate price change
    const target = totalPrice;
    const duration = 300;
    const steps = 20;
    const increment = (target - displayPrice) / steps;
    let current = displayPrice;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      setDisplayPrice(Math.round(current));
      if (step >= steps) {
        setDisplayPrice(target);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [totalPrice]);

  return (
    <motion.div
      className="bg-card border border-border rounded-3xl overflow-hidden shadow-gold"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1605027990121-cbae9e0642df?auto=format&fit=crop&w=800&q=80"
          alt="Premium Alphonso Mangoes"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-gold-gradient text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
          Premium Grade
        </div>
        {bulkDiscount > 0 && (
          <motion.div
            className="absolute top-4 right-4 bg-foreground text-background px-4 py-1 rounded-full text-sm font-semibold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={bulkDiscount}
          >
            {Math.round(bulkDiscount * 100)}% OFF
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-serif text-2xl font-bold mb-1">Alphonso Mangoes</h3>
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              <Package className="w-4 h-4" />
              Salem District • Farm Fresh
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground line-through">₹{basePrice}/kg</p>
            <p className="font-serif text-xl font-bold text-gold">₹{Math.round(pricePerKg)}/kg</p>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="bg-muted rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Quantity (kg)</span>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full border-border hover:border-gold hover:bg-gold/10"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <motion.span
                key={quantity}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="font-serif text-2xl font-bold w-12 text-center"
              >
                {quantity}
              </motion.span>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full border-border hover:border-gold hover:bg-gold/10"
                onClick={() => setQuantity(Math.min(50, quantity + 1))}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Discount Tiers */}
          <div className="flex gap-2">
            {[
              { min: 5, discount: "8% off" },
              { min: 10, discount: "15% off" },
            ].map((tier) => (
              <div
                key={tier.min}
                className={`flex-1 text-center py-2 rounded-xl text-xs transition-colors ${
                  quantity >= tier.min
                    ? "bg-gold/20 text-gold border border-gold/30"
                    : "bg-background text-muted-foreground border border-transparent"
                }`}
              >
                {tier.min}+ kg: {tier.discount}
              </div>
            ))}
          </div>
        </div>

        {/* Live Price */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <TrendingUp className="w-4 h-4 text-gold" />
            <span className="text-sm">Live Price</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={displayPrice}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="font-serif text-3xl font-bold"
            >
              ₹{displayPrice.toLocaleString()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Add to Cart */}
        <Button className="w-full bg-gold-gradient text-primary-foreground hover:opacity-90 py-6 text-lg font-semibold rounded-xl">
          Add to Royal Cart
        </Button>
      </div>
    </motion.div>
  );
};

export default DynamicPriceCard;

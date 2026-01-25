import { motion } from "framer-motion";
import { Crown, Shield, CreditCard, Truck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const RoyalCheckout = () => {
  const orderSummary = {
    items: [
      { name: "Alphonso Mangoes (Salem)", qty: 10, price: 3825 },
      { name: "Banganapalli (Dindigul)", qty: 5, price: 1500 },
    ],
    subtotal: 5325,
    delivery: 150,
    total: 5475,
  };

  return (
    <motion.section
      className="py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <motion.div
            className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 px-4 py-2 rounded-full mb-4"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          >
            <Crown className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium text-gold">Premium Checkout Experience</span>
          </motion.div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Royal Checkout</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Secure, seamless, and fit for royalty. Complete your order with our premium checkout experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Order Summary */}
          <motion.div
            className="bg-card border border-border rounded-3xl p-8"
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-serif text-2xl font-bold mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              {orderSummary.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.qty} kg</p>
                  </div>
                  <p className="font-semibold">₹{item.price.toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{orderSummary.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span>₹{orderSummary.delivery}</span>
              </div>
              <div className="h-px bg-border my-4" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-gold">₹{orderSummary.total.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>

          {/* Payment Section */}
          <motion.div
            className="bg-card border border-border rounded-3xl p-8"
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-serif text-2xl font-bold mb-6">Payment Method</h3>

            {/* Trust Badges */}
            <div className="flex items-center gap-4 mb-6 p-4 bg-muted rounded-2xl">
              <Shield className="w-8 h-8 text-gold" />
              <div>
                <p className="font-medium">Secure Payment</p>
                <p className="text-sm text-muted-foreground">256-bit SSL encrypted</p>
              </div>
            </div>

            {/* Payment Options */}
            <div className="space-y-3 mb-8">
              {[
                { name: "Credit / Debit Card", icon: CreditCard },
                { name: "UPI / Net Banking", icon: Shield },
              ].map((method, i) => (
                <label
                  key={i}
                  className={`flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-all ${
                    i === 0 ? "border-gold bg-gold/5" : "border-border hover:border-gold/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked={i === 0}
                    className="w-4 h-4 accent-gold-dark"
                  />
                  <method.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">{method.name}</span>
                </label>
              ))}
            </div>

            {/* Razorpay Button */}
            <Button className="w-full bg-gold-gradient text-primary-foreground hover:opacity-90 py-6 text-lg font-semibold rounded-xl shadow-gold animate-pulse-gold">
              <Crown className="w-5 h-5 mr-2" />
              Pay ₹{orderSummary.total.toLocaleString()}
            </Button>

            {/* Delivery Info */}
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Truck className="w-4 h-4" />
                <span>Free delivery 10kg+</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>2-3 days delivery</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default RoyalCheckout;

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScanCropModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScanCropModal = ({ isOpen, onClose }: ScanCropModalProps) => {
  const [scanPhase, setScanPhase] = useState<"idle" | "scanning" | "complete">("idle");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setScanPhase("idle");
      setProgress(0);
    }
  }, [isOpen]);

  const startScan = () => {
    setScanPhase("scanning");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanPhase("complete");
          return 100;
        }
        return prev + 2;
      });
    }, 60);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-foreground/80 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-card border border-border rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full"
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-serif text-2xl font-bold">AI Crop Scanner</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Camera Feed Area */}
            <div className="relative aspect-[4/3] bg-foreground/5 overflow-hidden">
              {/* Simulated camera feed */}
              <img
                src="https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80"
                alt="Mango crop"
                className="w-full h-full object-cover"
              />

              {/* Scanning Overlay */}
              {scanPhase === "scanning" && (
                <>
                  {/* Grid lines */}
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="border border-gold/20" />
                    ))}
                  </div>

                  {/* Laser scan line */}
                  <motion.div
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent shadow-lg"
                    style={{ boxShadow: "0 0 20px hsl(45 100% 50%)" }}
                    animate={{ y: ["0%", "400%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Corner brackets */}
                  {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos, i) => (
                    <div
                      key={i}
                      className={`absolute ${pos} w-16 h-16 border-2 border-gold ${
                        i < 2 ? "border-b-0" : "border-t-0"
                      } ${i % 2 === 0 ? "border-r-0" : "border-l-0"}`}
                    />
                  ))}

                  {/* Progress text */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-foreground/80 backdrop-blur-sm text-background px-4 py-2 rounded-full text-sm font-medium">
                    Analyzing quality... {progress}%
                  </div>
                </>
              )}

              {/* Complete state */}
              {scanPhase === "complete" && (
                <motion.div
                  className="absolute inset-0 bg-gold/20 backdrop-blur-sm flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="bg-card rounded-2xl p-8 text-center shadow-2xl"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 20 }}
                  >
                    <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-serif text-xl font-bold mb-2">Premium Grade A</h3>
                    <p className="text-muted-foreground text-sm mb-1">Alphonso Mango • Salem District</p>
                    <p className="text-gold font-semibold">Quality Score: 94/100</p>
                  </motion.div>
                </motion.div>
              )}
            </div>

            {/* Actions */}
            <div className="p-6">
              {scanPhase === "idle" && (
                <Button
                  onClick={startScan}
                  className="w-full bg-gold-gradient text-primary-foreground hover:opacity-90 py-6 text-lg font-semibold rounded-xl"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Start 3D Scan
                </Button>
              )}
              {scanPhase === "scanning" && (
                <Button disabled className="w-full py-6 text-lg rounded-xl">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Scanning in Progress...
                </Button>
              )}
              {scanPhase === "complete" && (
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setScanPhase("idle");
                      setProgress(0);
                    }}
                    className="flex-1 py-6 rounded-xl"
                  >
                    Scan Another
                  </Button>
                  <Button
                    onClick={onClose}
                    className="flex-1 bg-gold-gradient text-primary-foreground hover:opacity-90 py-6 rounded-xl"
                  >
                    Add to Cart
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScanCropModal;

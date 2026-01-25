import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Check, Loader2, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScanCropModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ScanResult {
  grade: string;
  price: number | string;
}

const ScanCropModal = ({ isOpen, onClose }: ScanCropModalProps) => {
  const [scanPhase, setScanPhase] = useState<"idle" | "scanning" | "complete" | "error">("idle");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: 640, height: 480 }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          setCameraReady(true);
        };
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      setErrorMessage("Camera access denied. Please allow camera permissions.");
      setScanPhase("error");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraReady(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
      setScanPhase("idle");
      setResult(null);
      setErrorMessage("");
    }
    return () => stopCamera();
  }, [isOpen, startCamera, stopCamera]);

  const captureAndScan = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setScanPhase("scanning");

    // Capture frame from video
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);

    // Convert to blob
    canvas.toBlob(async (blob) => {
      if (!blob) {
        setScanPhase("error");
        setErrorMessage("Failed to capture image");
        return;
      }

      const formData = new FormData();
      formData.append("file", blob, "mango.jpg");

      try {
        const response = await fetch("https://humiliatingly-mistakable-jean.ngrok-free.dev/check-mango", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        setResult({
          grade: data.grade || data.Grade || "Unknown",
          price: data.price || data.Price || "N/A"
        });
        setScanPhase("complete");
      } catch (err) {
        console.error("Scan failed:", err);
        setErrorMessage("Failed to analyze mango. Please try again.");
        setScanPhase("error");
      }
    }, "image/jpeg", 0.9);
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
              <div className="flex items-center gap-2">
                <Crown className="w-6 h-6 text-gold" />
                <h2 className="font-serif text-2xl font-bold">AI Mango Scanner</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Camera Feed Area */}
            <div className="relative aspect-[4/3] bg-foreground/5 overflow-hidden">
              {/* Live camera feed */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {/* Hidden canvas for capture */}
              <canvas ref={canvasRef} className="hidden" />

              {/* Camera loading state */}
              {!cameraReady && scanPhase === "idle" && (
                <div className="absolute inset-0 bg-foreground/90 flex items-center justify-center">
                  <div className="text-center text-background">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                    <p>Initializing camera...</p>
                  </div>
                </div>
              )}

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

                  {/* Scanning text */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-foreground/80 backdrop-blur-sm text-background px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing mango quality...
                  </div>
                </>
              )}

              {/* Complete state - Royal Result Card */}
              {scanPhase === "complete" && result && (
                <motion.div
                  className="absolute inset-0 bg-gold/20 backdrop-blur-sm flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="bg-gradient-to-br from-card via-card to-gold/10 rounded-2xl p-8 text-center shadow-2xl border-2 border-gold/30 mx-4"
                    initial={{ scale: 0.8, rotateY: -90 }}
                    animate={{ scale: 1, rotateY: 0 }}
                    transition={{ type: "spring", damping: 20 }}
                  >
                    {/* Crown decoration */}
                    <div className="w-20 h-20 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Crown className="w-10 h-10 text-primary-foreground" />
                    </div>
                    
                    {/* Grade */}
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Quality Grade</p>
                      <h3 className="font-serif text-3xl font-bold text-gold-gradient flex items-center justify-center gap-2">
                        <Sparkles className="w-6 h-6 text-gold" />
                        {result.grade}
                        <Sparkles className="w-6 h-6 text-gold" />
                      </h3>
                    </div>
                    
                    {/* Price */}
                    <div className="bg-gold/10 rounded-xl p-4 border border-gold/20">
                      <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Estimated Price</p>
                      <p className="font-serif text-2xl font-bold text-gold">
                        ₹{typeof result.price === 'number' ? result.price.toLocaleString() : result.price}
                        <span className="text-sm font-normal text-muted-foreground">/kg</span>
                      </p>
                    </div>

                    {/* Royal stamp */}
                    <div className="mt-4 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                      <Check className="w-3 h-3 text-gold" />
                      Verified by AgroRoyal AI
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Error state */}
              {scanPhase === "error" && (
                <motion.div
                  className="absolute inset-0 bg-destructive/20 backdrop-blur-sm flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-card rounded-2xl p-6 text-center shadow-2xl mx-4">
                    <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <X className="w-8 h-8 text-destructive" />
                    </div>
                    <h3 className="font-serif text-xl font-bold mb-2">Scan Failed</h3>
                    <p className="text-muted-foreground text-sm">{errorMessage}</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Actions */}
            <div className="p-6">
              {scanPhase === "idle" && (
                <Button
                  onClick={captureAndScan}
                  disabled={!cameraReady}
                  className="w-full bg-gold-gradient text-primary-foreground hover:opacity-90 py-6 text-lg font-semibold rounded-xl disabled:opacity-50"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Scan Quality
                </Button>
              )}
              {scanPhase === "scanning" && (
                <Button disabled className="w-full py-6 text-lg rounded-xl">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Scanning in Progress...
                </Button>
              )}
              {(scanPhase === "complete" || scanPhase === "error") && (
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setScanPhase("idle");
                      setResult(null);
                      setErrorMessage("");
                    }}
                    className="flex-1 py-6 rounded-xl"
                  >
                    Scan Another
                  </Button>
                  {scanPhase === "complete" && (
                    <Button
                      onClick={onClose}
                      className="flex-1 bg-gold-gradient text-primary-foreground hover:opacity-90 py-6 rounded-xl"
                    >
                      Add to Cart
                    </Button>
                  )}
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

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface UnreleasedProduct {
  id: number;
  name: string;
  status: string;
  imageUrl: string;
  description: string;
  releaseDate?: string;
}

export default function Vault() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [showQRModal, setShowQRModal] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);

  // Countdown timer to a future date
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7); // 7 days from now
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1
    }));
    setParticles(newParticles);
  }, []);

  const unreleasedProducts: UnreleasedProduct[] = [
    {
      id: 1,
      name: "NEURAL NEXUS HOODIE",
      status: "VAULT EXCLUSIVE",
      imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
      description: "Mind-link enabled streetwear",
      releaseDate: "2025-02-15"
    },
    {
      id: 2,
      name: "QUANTUM BREACH JACKET",
      status: "PROTOTYPE",
      imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
      description: "Reality-bending tech fabric",
      releaseDate: "2025-03-01"
    },
    {
      id: 3,
      name: "VOID WALKER BOOTS",
      status: "COMING SOON",
      imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
      description: "Step between dimensions",
      releaseDate: "2025-01-30"
    },
    {
      id: 4,
      name: "CYBER PHANTOM TEE",
      status: "VAULT EXCLUSIVE",
      imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      description: "Ghost in the machine aesthetic"
    },
    {
      id: 5,
      name: "DATA STREAM CARGO",
      status: "PROTOTYPE",
      imageUrl: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=400",
      description: "Information flows through fabric"
    }
  ];

  const handleDownloadDripPack = () => {
    // In a real app, this would download actual content
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,SEPHYX DRIP PACK - Exclusive Vault Content';
    link.download = 'sephyx-drip-pack.txt';
    link.click();
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Starfield Background */}
      <div className="absolute inset-0 z-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-white rounded-full opacity-70"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Glitch Grid Overlay */}
      <div className="absolute inset-0 z-1 cyber-grid opacity-20"></div>
      
      {/* Scanning Lines Effect */}
      <div className="absolute inset-0 z-2 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-purple to-transparent opacity-60 animate-pulse"></div>
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-40"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-blue to-transparent opacity-30"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Audio Toggle */}
        <div className="absolute top-6 right-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="text-neon-green hover:text-cyber-purple transition-colors"
          >
            <i className={`fas ${audioEnabled ? 'fa-volume-up' : 'fa-volume-mute'} text-lg`}></i>
          </Button>
        </div>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center pt-20 pb-10"
        >
          <h1 className="font-orbitron text-6xl md:text-8xl font-black mb-4 glitch-effect neon-flicker" data-text="THE VAULT">
            <span className="text-neon-green">THE</span>{" "}
            <span className="text-cyber-purple vault-glitch">VAULT</span>
          </h1>
          <motion.p 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400 text-xl"
          >
            // ACCESS GRANTED - ELITE PROTOCOL ACTIVATED //
          </motion.p>
        </motion.div>

        {/* Rotating Sephyx Logo */}
        <motion.div 
          className="flex justify-center mb-12"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-24 h-24 border-4 border-neon-green rounded-full flex items-center justify-center neon-glow">
            <span className="font-orbitron text-2xl font-bold text-neon-green">SX</span>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
          {/* Countdown Timer */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="font-orbitron text-2xl font-bold text-cyber-purple mb-6">
              ⚡ NEXT SECRET DROP IN ⚡
            </h2>
            <div className="flex justify-center space-x-8">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <motion.div 
                    className="bg-dark-card border-2 border-neon-green rounded-lg p-4 min-w-[80px] neon-glow"
                    animate={{ boxShadow: ["0 0 10px #00ff41", "0 0 20px #00ff41", "0 0 10px #00ff41"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="font-orbitron text-3xl font-bold text-neon-green">
                      {value.toString().padStart(2, '0')}
                    </span>
                  </motion.div>
                  <p className="text-gray-400 text-sm mt-2 uppercase">{unit}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Unreleased Products Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-16"
          >
            <h2 className="font-orbitron text-4xl font-bold text-center mb-12">
              <span className="text-white">VAULT</span>{" "}
              <span className="text-cyber-purple glitch-effect" data-text="ARCHIVES">ARCHIVES</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {unreleasedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    boxShadow: "0 20px 40px rgba(138, 43, 226, 0.3)"
                  }}
                  className="bg-dark-card rounded-xl overflow-hidden border border-dark-border hover:border-cyber-purple transition-all duration-500 cursor-pointer group tilt-3d static-distortion"
                >
                  <div className="relative">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <Badge 
                      className={`absolute top-3 left-3 ${
                        product.status === 'VAULT EXCLUSIVE' ? 'bg-cyber-purple' :
                        product.status === 'PROTOTYPE' ? 'bg-neon-green text-black' :
                        'bg-cyber-blue'
                      }`}
                    >
                      {product.status}
                    </Badge>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-orbitron font-bold text-white mb-2 text-lg">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 mb-4">{product.description}</p>
                    {product.releaseDate && (
                      <p className="text-neon-green text-sm font-semibold">
                        TARGET: {new Date(product.releaseDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* QR Code Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-center mb-16"
          >
            <h3 className="font-orbitron text-2xl font-bold text-white mb-6">
              AUGMENTED REALITY ACCESS
            </h3>
            <div 
              className="inline-block p-8 bg-dark-card border-2 border-neon-green rounded-xl cursor-pointer hover:border-cyber-purple transition-colors neon-glow"
              onClick={() => setShowQRModal(true)}
            >
              <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center">
                <div className="text-black font-orbitron font-bold text-center">
                  <div className="text-2xl">QR</div>
                  <div className="text-xs">SCAN ME</div>
                </div>
              </div>
            </div>
            <p className="text-cyber-purple mt-4 font-semibold">UNLOCK SEPHYX VISION</p>
          </motion.div>

          {/* Download Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-center mb-16"
          >
            <div className="bg-dark-card border border-cyber-purple rounded-xl p-8 max-w-md mx-auto tilt-3d static-distortion holographic-shimmer">
              <div className="mb-6">
                <i className="fas fa-file-archive text-4xl text-cyber-purple mb-4"></i>
                <h3 className="font-orbitron text-xl font-bold text-white mb-2">CLASSIFIED ASSETS</h3>
                <p className="text-gray-400 text-sm">High-res wallpapers, logo packs & AR textures</p>
              </div>
              <Button
                onClick={handleDownloadDripPack}
                className="w-full holographic text-white px-6 py-3 font-semibold hover:scale-105 transition-transform duration-300 mb-4"
              >
                <i className="fas fa-download mr-2"></i>
                DOWNLOAD DRIP PACK
              </Button>
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <i className="fas fa-lock"></i>
                <span>VAULT EXCLUSIVE • 247MB</span>
              </div>
            </div>
          </motion.div>

          {/* Loyalty Unlockables Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mb-16"
          >
            <h3 className="font-orbitron text-3xl font-bold text-center mb-8">
              <span className="text-white">LOYALTY</span>{" "}
              <span className="text-neon-green glitch-effect" data-text="REWARDS">REWARDS</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Early Access Badge */}
              <motion.div 
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="bg-dark-card border border-neon-green rounded-xl p-6 text-center tilt-3d matrix-rain"
              >
                <div className="w-16 h-16 bg-neon-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-crown text-dark-bg text-xl"></i>
                </div>
                <h4 className="font-orbitron font-bold text-white mb-2">EARLY ACCESS</h4>
                <p className="text-gray-400 text-sm mb-4">48hr head start on new drops</p>
                <Badge className="bg-neon-green text-dark-bg">ACTIVE</Badge>
              </motion.div>

              {/* Bonus Codes */}
              <motion.div 
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="bg-dark-card border border-cyber-blue rounded-xl p-6 text-center tilt-3d data-stream"
              >
                <div className="w-16 h-16 bg-cyber-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-code text-white text-xl"></i>
                </div>
                <h4 className="font-orbitron font-bold text-white mb-2">DRIP CODES</h4>
                <p className="text-gray-400 text-sm mb-4">Exclusive discount algorithms</p>
                <Button 
                  size="sm" 
                  className="bg-cyber-blue hover:bg-cyber-blue-light text-white"
                  onClick={() => navigator.clipboard.writeText('VAULT2025')}
                >
                  COPY CODE
                </Button>
              </motion.div>

              {/* VIP Status */}
              <motion.div 
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="bg-dark-card border border-cyber-purple rounded-xl p-6 text-center tilt-3d"
              >
                <div className="w-16 h-16 bg-cyber-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-gem text-white text-xl"></i>
                </div>
                <h4 className="font-orbitron font-bold text-white mb-2">VIP STATUS</h4>
                <p className="text-gray-400 text-sm mb-4">Priority support & custom fits</p>
                <Badge className="bg-cyber-purple text-white">ELITE</Badge>
              </motion.div>
            </div>
          </motion.div>

          {/* System Status Display */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="bg-dark-card border border-dark-border rounded-xl p-6 mb-16"
          >
            <h3 className="font-orbitron text-xl font-bold text-white mb-6 flex items-center">
              <i className="fas fa-server text-neon-green mr-3"></i>
              VAULT SYSTEM STATUS
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                <span className="text-gray-300">Security Protocol</span>
                <span className="text-neon-green flex items-center">
                  <i className="fas fa-circle text-xs mr-2"></i>
                  ONLINE
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                <span className="text-gray-300">Data Streams</span>
                <span className="text-neon-green flex items-center">
                  <i className="fas fa-circle text-xs mr-2"></i>
                  ACTIVE
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                <span className="text-gray-300">Neural Network</span>
                <span className="text-cyber-purple flex items-center">
                  <i className="fas fa-circle text-xs mr-2"></i>
                  LEARNING
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                <span className="text-gray-300">Quantum Storage</span>
                <span className="text-cyber-blue flex items-center">
                  <i className="fas fa-circle text-xs mr-2"></i>
                  ENCRYPTED
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-center py-8 border-t border-dark-border"
        >
          <p className="text-gray-500 font-orbitron">
            © 2025 Sephyx — Loyalty Unlocks Drip.
          </p>
        </motion.div>
      </div>

      {/* QR Modal */}
      <Dialog open={showQRModal} onOpenChange={setShowQRModal}>
        <DialogContent className="bg-dark-card border-neon-green text-white">
          <DialogHeader>
            <DialogTitle className="font-orbitron text-2xl text-neon-green">
              SEPHYX VISION AR FILTER
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <div className="w-48 h-48 bg-white rounded-lg mx-auto mb-6 flex items-center justify-center">
              <div className="text-black font-orbitron font-bold text-center">
                <div className="text-4xl mb-2">AR</div>
                <div className="text-sm">FILTER</div>
                <div className="text-xs">QR CODE</div>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Scan this code with your phone's camera to unlock the exclusive Sephyx AR filter
            </p>
            <p className="text-cyber-purple font-semibold">
              Transform your reality with cyberpunk overlays
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
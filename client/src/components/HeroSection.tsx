import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden cyber-grid">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080" 
          alt="Cyberpunk model in urban environment" 
          className="w-full h-full object-cover opacity-60" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-transparent to-cyber-purple/20"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-orbitron text-6xl md:text-8xl font-black mb-6 leading-none"
            >
              <span className="text-white">NEXT</span>
              <span className="text-neon-green neon-glow">GEN</span>
              <br />
              <span className="text-cyber-purple">STREETWEAR</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl"
            >
              Where high fashion meets urban chaos. Discover the future of streetwear with holographic textures and cyberpunk aesthetics.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center"
            >
              <Button 
                size="lg"
                className="holographic text-white px-12 py-4 font-orbitron font-semibold text-lg hover:scale-105 transition-transform duration-300 tilt-3d"
                onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="glitch-effect" data-text="EXPLORE COLLECTION">EXPLORE COLLECTION</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-20 hidden lg:block"
      >
        <div className="w-20 h-20 border border-neon-green rounded-full flex items-center justify-center neon-glow">
          <i className="fas fa-arrow-down text-neon-green text-xl animate-bounce"></i>
        </div>
      </motion.div>
    </section>
  );
}

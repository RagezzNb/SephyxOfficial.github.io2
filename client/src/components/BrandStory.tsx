import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function BrandStory() {
  return (
    <section id="story" className="py-20 bg-dark-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-orbitron text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">BORN FROM</span>
              <br />
              <span className="text-neon-green">DIGITAL CHAOS</span>
            </h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              SEPHYX emerged from the intersection of high fashion and cyber culture. We design for the digital nomads, the code artists, and the urban rebels who live between worlds.
            </p>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Each piece is crafted with smart fabrics, reactive materials, and futuristic aesthetics that adapt to your environment and express your digital identity.
            </p>
            <Button className="holographic text-white px-8 py-4 font-semibold text-lg hover:scale-105 transition-transform duration-300">
              EXPLORE OUR STORY
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1506629905607-45cb19ee7ca6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000" 
              alt="SEPHYX brand story model" 
              className="rounded-xl shadow-2xl w-full object-cover h-96 lg:h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 to-transparent rounded-xl"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white font-orbitron text-xl font-bold">
                "Fashion for the digital dimension"
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

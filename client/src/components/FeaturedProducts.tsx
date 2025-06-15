import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import type { Product } from "@shared/schema";

export default function FeaturedProducts() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products/featured"],
  });

  if (isLoading) {
    return (
      <section id="featured" className="py-20 bg-dark-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-orbitron text-4xl md:text-6xl font-bold mb-6">
              <span className="text-cyber-blue">FEATURED</span> 
              <span className="text-white">DROPS</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-dark-bg rounded-xl h-96 animate-pulse border border-dark-border" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="featured" className="py-20 bg-dark-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold mb-6">
            <span className="text-cyber-blue">FEATURED</span> 
            <span className="text-white">DROPS</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Limited edition pieces designed for the digital nomads and cyber rebels of tomorrow
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} featured />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

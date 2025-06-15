import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { Product } from "@shared/schema";

export default function ProductCatalog() {
  const [category, setCategory] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [displayedCount, setDisplayedCount] = useState(8);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", { category, search }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (category && category !== "all") params.append("category", category);
      if (search) params.append("search", search);
      
      const response = await fetch(`/api/products?${params}`);
      if (!response.ok) throw new Error("Failed to fetch products");
      return response.json();
    },
  });

  const displayedProducts = products?.slice(0, displayedCount) || [];
  const hasMore = products && products.length > displayedCount;

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "hoodies", label: "Hoodies" },
    { value: "jackets", label: "Jackets" },
    { value: "tees", label: "T-Shirts" },
    { value: "pants", label: "Pants" },
    { value: "shoes", label: "Shoes" },
    { value: "accessories", label: "Accessories" },
  ];

  return (
    <section id="products" className="py-20 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header and Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-orbitron text-3xl md:text-5xl font-bold text-white"
          >
            ALL <span className="text-cyber-blue">PRODUCTS</span>
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto"
          >
            <Input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-dark-card border-dark-border text-white placeholder:text-gray-400 focus:border-neon-green sm:w-64"
            />
            
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-dark-card border-dark-border text-white focus:border-neon-green sm:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-dark-card border-dark-border">
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value} className="text-white hover:bg-dark-border">
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
        </div>
        
        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-dark-card rounded-xl h-80 animate-pulse border border-dark-border" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: (index % 8) * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
            
            {hasMore && (
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <Button
                  onClick={() => setDisplayedCount(prev => prev + 8)}
                  variant="outline"
                  size="lg"
                  className="neon-border bg-transparent text-neon-green px-8 py-3 font-semibold hover:bg-neon-green hover:text-dark-bg transition-all duration-300"
                >
                  LOAD MORE PRODUCTS
                </Button>
              </motion.div>
            )}
            
            {displayedProducts.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <i className="fas fa-search text-4xl text-gray-600 mb-4"></i>
                <p className="text-gray-400 text-lg">No products found</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

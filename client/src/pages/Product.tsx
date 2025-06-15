import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ShoppingCart from "@/components/ShoppingCart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import type { Product as ProductType } from "@shared/schema";

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const { data: product, isLoading, error } = useQuery<ProductType>({
    queryKey: ["/api/products", id],
    enabled: !!id,
  });

  const handleAddToCart = () => {
    if (!product) return;
    
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    }

    addToCart.mutate({
      productId: product.id,
      quantity: 1,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg text-white">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-green"></div>
        </div>
        <Footer />
        <ShoppingCart />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-dark-bg text-white">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="text-2xl font-orbitron font-bold text-red-500 mb-4">Product Not Found</h1>
            <p className="text-gray-400">The product you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
        <ShoppingCart />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <Navigation />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden border border-dark-border">
                <img 
                  src={product.imageUrls?.[selectedImageIndex] || product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.imageUrls && product.imageUrls.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.imageUrls.map((url, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImageIndex === index 
                          ? 'border-neon-green' 
                          : 'border-dark-border hover:border-cyber-purple'
                      }`}
                    >
                      <img 
                        src={url} 
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="font-orbitron text-4xl font-bold text-white mb-4">
                  {product.name}
                </h1>
                <p className="text-2xl font-bold text-neon-green mb-6">
                  ${product.price}
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="font-orbitron text-lg font-semibold text-white mb-3">
                    SIZE
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSize(size)}
                        className={`border-2 ${
                          selectedSize === size
                            ? 'bg-neon-green text-dark-bg border-neon-green'
                            : 'bg-transparent text-gray-400 border-dark-border hover:border-neon-green hover:text-neon-green'
                        }`}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="font-orbitron text-lg font-semibold text-white mb-3">
                    COLOR
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <Button
                        key={color}
                        variant={selectedColor === color ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedColor(color)}
                        className={`border-2 ${
                          selectedColor === color
                            ? 'bg-cyber-purple text-white border-cyber-purple'
                            : 'bg-transparent text-gray-400 border-dark-border hover:border-cyber-purple hover:text-cyber-purple'
                        }`}
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                <Badge 
                  variant={product.inStock ? "default" : "destructive"}
                  className={product.inStock ? "bg-neon-green text-dark-bg" : ""}
                >
                  {product.inStock ? "IN STOCK" : "OUT OF STOCK"}
                </Badge>
                {product.featured && (
                  <Badge className="bg-cyber-purple text-white">
                    FEATURED
                  </Badge>
                )}
              </div>

              {/* Add to Cart */}
              <div className="space-y-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || addToCart.isPending}
                  className="w-full holographic text-white py-4 text-lg font-semibold hover:scale-105 transition-transform duration-300"
                >
                  {addToCart.isPending ? "ADDING..." : "ADD TO CART"}
                </Button>

                <div className="flex items-center justify-center space-x-6 text-sm">
                  <button className="text-gray-400 hover:text-neon-green transition-colors duration-300 flex items-center space-x-2">
                    <i className="fas fa-heart"></i>
                    <span>ADD TO WISHLIST</span>
                  </button>
                  <button className="text-gray-400 hover:text-neon-green transition-colors duration-300 flex items-center space-x-2">
                    <i className="fas fa-share"></i>
                    <span>SHARE</span>
                  </button>
                </div>
              </div>

              {/* Product Features */}
              <div className="pt-6 border-t border-dark-border">
                <h3 className="font-orbitron text-lg font-semibold text-white mb-3">
                  FEATURES
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center space-x-2">
                    <i className="fas fa-check text-neon-green"></i>
                    <span>Smart fabric technology</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <i className="fas fa-check text-neon-green"></i>
                    <span>Reactive to environment</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <i className="fas fa-check text-neon-green"></i>
                    <span>Sustainable materials</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <i className="fas fa-check text-neon-green"></i>
                    <span>Limited edition design</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ShoppingCart />
    </div>
  );
}

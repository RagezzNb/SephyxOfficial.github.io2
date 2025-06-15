import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();

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

    onClose();
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-dark-card border-dark-border text-white">
        <DialogHeader>
          <DialogTitle className="font-orbitron text-2xl text-white">
            {product.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden border border-dark-border">
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
                    className={`aspect-square rounded overflow-hidden border-2 transition-colors ${
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
              <p className="text-2xl font-bold text-neon-green mb-4">
                ${product.price}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h4 className="font-orbitron font-semibold text-white mb-3">SIZE</h4>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      className={`border-2 font-orbitron transition-all duration-300 hover:scale-105 ${
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
                <h4 className="font-orbitron font-semibold text-white mb-3">COLOR</h4>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedColor(color)}
                      className={`border-2 font-orbitron transition-all duration-300 hover:scale-105 ${
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
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock || addToCart.isPending}
              className="w-full holographic text-white py-4 text-lg font-orbitron font-semibold hover:scale-105 transition-transform duration-300 tilt-3d"
            >
              {addToCart.isPending ? "ADDING..." : (
                <span className="glitch-effect" data-text="ADD TO CART">ADD TO CART</span>
              )}
            </Button>

            <div className="text-center">
              <button className="text-gray-400 hover:text-neon-green transition-colors duration-300 text-sm flex items-center justify-center space-x-2">
                <i className="fas fa-heart"></i>
                <span>ADD TO WISHLIST</span>
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export default function ProductCard({ product, featured = false }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart.mutate({
      productId: product.id,
      quantity: 1,
    });
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className={`product-card bg-dark-bg rounded-xl overflow-hidden border border-dark-border hover:border-neon-green transition-all duration-500 cursor-pointer group ${featured ? 'hover:border-cyber-purple' : ''}`}>
        <div className="relative overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${featured ? 'h-80' : 'h-64'}`}
          />
          {product.featured && (
            <Badge className="absolute top-3 left-3 bg-cyber-purple text-white">
              FEATURED
            </Badge>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-dark-bg/80 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg px-4 py-2">
                OUT OF STOCK
              </Badge>
            </div>
          )}
        </div>
        
        <div className={`p-4 ${featured ? 'p-6' : ''}`}>
          <h3 className={`font-orbitron font-bold text-white mb-2 ${featured ? 'text-xl' : 'text-lg'}`}>
            {product.name}
          </h3>
          <p className={`text-gray-400 mb-4 ${featured ? 'text-base' : 'text-sm'}`}>
            {product.description}
          </p>
          
          <div className="flex justify-between items-center">
            <span className={`font-bold ${featured ? 'text-neon-green text-2xl' : 'text-cyber-blue text-lg'}`}>
              ${product.price}
            </span>
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock || addToCart.isPending}
              size={featured ? "default" : "sm"}
              className={`font-orbitron font-semibold transition-all duration-300 hover:scale-105 tilt-3d ${
                featured 
                  ? 'holographic text-white px-6 py-2' 
                  : 'bg-neon-green hover:bg-neon-green-dark text-dark-bg px-4 py-1 text-sm'
              }`}
            >
              {addToCart.isPending ? "..." : featured ? (
                <span className="glitch-effect" data-text="ADD TO CART">ADD TO CART</span>
              ) : "ADD"}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

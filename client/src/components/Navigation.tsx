import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [location] = useLocation();
  const { cartItems } = useCart();

  const totalItems = cartItems.data?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-dark-bg/90 backdrop-blur-md border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="font-orbitron text-2xl font-bold text-neon-green glitch-effect cursor-pointer" data-text="SEPHYX">
                  SEPHYX
                </h1>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="/" className={`transition-colors duration-300 px-3 py-2 ${location === '/' ? 'text-neon-green' : 'text-gray-300 hover:text-neon-green'}`}>
                  HOME
                </Link>
                <a href="#products" className="text-gray-300 hover:text-neon-green transition-colors duration-300 px-3 py-2">
                  PRODUCTS
                </a>
                <a href="#featured" className="text-gray-300 hover:text-neon-green transition-colors duration-300 px-3 py-2">
                  FEATURED
                </a>
                <a href="#story" className="text-gray-300 hover:text-neon-green transition-colors duration-300 px-3 py-2">
                  STORY
                </a>
                <Link href="/vault" className={`transition-colors duration-300 px-3 py-2 ${location === '/vault' ? 'text-cyber-purple neon-glow' : 'text-gray-300 hover:text-cyber-purple'}`}>
                  <span className="glitch-effect" data-text="VAULT">VAULT</span>
                </Link>
              </div>
            </div>
            
            {/* Icons */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-neon-green transition-colors duration-300"
              >
                <i className="fas fa-search text-lg"></i>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-neon-green transition-colors duration-300"
              >
                <i className="fas fa-user text-lg"></i>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="text-gray-300 hover:text-neon-green transition-colors duration-300 relative"
              >
                <i className="fas fa-shopping-bag text-lg"></i>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-neon-green text-dark-bg rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {totalItems}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-300 hover:text-neon-green transition-colors duration-300"
              >
                <i className="fas fa-bars text-lg"></i>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-dark-card border-t border-dark-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 text-gray-300 hover:text-neon-green transition-colors duration-300">
                HOME
              </Link>
              <a href="#products" className="block px-3 py-2 text-gray-300 hover:text-neon-green transition-colors duration-300">
                PRODUCTS
              </a>
              <a href="#featured" className="block px-3 py-2 text-gray-300 hover:text-neon-green transition-colors duration-300">
                FEATURED
              </a>
              <a href="#story" className="block px-3 py-2 text-gray-300 hover:text-neon-green transition-colors duration-300">
                STORY
              </a>
              <Link href="/vault" className="block px-3 py-2 text-gray-300 hover:text-cyber-purple transition-colors duration-300">
                <span className="glitch-effect" data-text="VAULT">VAULT</span>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsCartOpen(false)}
        >
          <div 
            className="fixed inset-y-0 right-0 w-full max-w-md bg-dark-card border-l border-dark-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full flex flex-col">
              {/* Cart Header */}
              <div className="flex items-center justify-between p-6 border-b border-dark-border">
                <h3 className="font-orbitron text-xl font-bold text-white">CART</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-400 hover:text-neon-green transition-colors duration-300"
                >
                  <i className="fas fa-times text-xl"></i>
                </Button>
              </div>
              
              {/* Cart Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.data && cartItems.data.length > 0 ? (
                  <div className="space-y-6">
                    {cartItems.data.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 pb-6 border-b border-dark-border">
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-orbitron font-semibold text-white text-sm">
                            {item.product.name}
                          </h4>
                          {(item.size || item.color) && (
                            <p className="text-gray-400 text-xs">
                              {item.size && `Size: ${item.size}`}
                              {item.size && item.color && ', '}
                              {item.color && `Color: ${item.color}`}
                            </p>
                          )}
                          <p className="text-neon-green font-bold">
                            ${item.product.price}
                          </p>
                        </div>
                        <div className="text-white text-sm">
                          Qty: {item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <i className="fas fa-shopping-bag text-4xl text-gray-600 mb-4"></i>
                    <p className="text-gray-400">Your cart is empty</p>
                  </div>
                )}
              </div>
              
              {/* Cart Footer */}
              {cartItems.data && cartItems.data.length > 0 && (
                <div className="p-6 border-t border-dark-border">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-orbitron font-bold text-white">TOTAL:</span>
                    <span className="font-orbitron font-bold text-neon-green text-xl">
                      ${cartItems.data.reduce((sum, item) => sum + (parseFloat(item.product.price) * item.quantity), 0).toFixed(2)}
                    </span>
                  </div>
                  <Button className="w-full holographic text-white py-3 font-semibold text-lg hover:scale-105 transition-transform duration-300">
                    CHECKOUT
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

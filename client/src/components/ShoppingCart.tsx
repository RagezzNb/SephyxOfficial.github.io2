import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

export default function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, updateCartItem, removeFromCart } = useCart();

  const total = cartItems.data?.reduce((sum, item) => 
    sum + (parseFloat(item.product.price) * item.quantity), 0
  ) || 0;

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart.mutate(itemId);
    } else {
      updateCartItem.mutate({ id: itemId, quantity: newQuantity });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full max-w-md bg-dark-card border-l border-dark-border text-white">
        <SheetHeader>
          <SheetTitle className="font-orbitron text-xl font-bold text-white">
            CART
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto py-6">
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
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 p-0 bg-dark-bg border-dark-border text-white hover:border-neon-green"
                      >
                        -
                      </Button>
                      <span className="text-white text-sm w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 p-0 bg-dark-bg border-dark-border text-white hover:border-neon-green"
                      >
                        +
                      </Button>
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
            <div className="border-t border-dark-border pt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="font-orbitron font-bold text-white">TOTAL:</span>
                <span className="font-orbitron font-bold text-neon-green text-xl">
                  ${total.toFixed(2)}
                </span>
              </div>
              <Button className="w-full holographic text-white py-3 font-orbitron font-semibold text-lg hover:scale-105 transition-transform duration-300 tilt-3d">
                <span className="glitch-effect" data-text="CHECKOUT">CHECKOUT</span>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

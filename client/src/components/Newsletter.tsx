import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const subscribeNewsletter = useMutation({
    mutationFn: async (email: string) => {
      return await apiRequest("POST", "/api/newsletter", { email });
    },
    onSuccess: () => {
      toast({
        title: "Successfully connected to the network!",
        description: "You'll receive the latest drops and cyber-cultural insights.",
      });
      setEmail("");
    },
    onError: (error: any) => {
      toast({
        title: "Connection failed",
        description: error.message || "Failed to subscribe to newsletter",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    subscribeNewsletter.mutate(email);
  };

  return (
    <section className="py-20 bg-dark-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-6">
            <span className="text-white">JOIN THE</span>
            <span className="text-cyber-purple"> NETWORK</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Get early access to drops, exclusive content, and cyber-cultural insights delivered to your neural interface.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your digital address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-dark-card border-dark-border text-white placeholder:text-gray-400 px-6 py-3 focus:border-neon-green"
              required
            />
            <Button 
              type="submit"
              disabled={subscribeNewsletter.isPending}
              className="holographic text-white px-8 py-3 font-orbitron font-semibold hover:scale-105 transition-transform duration-300 tilt-3d"
            >
              {subscribeNewsletter.isPending ? "CONNECTING..." : (
                <span className="glitch-effect" data-text="CONNECT">CONNECT</span>
              )}
            </Button>
          </form>
          
          <div className="flex justify-center space-x-6 mt-8">
            <a href="#" className="text-gray-400 hover:text-neon-green transition-colors duration-300">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-neon-green transition-colors duration-300">
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-neon-green transition-colors duration-300">
              <i className="fab fa-tiktok text-2xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-neon-green transition-colors duration-300">
              <i className="fab fa-discord text-2xl"></i>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

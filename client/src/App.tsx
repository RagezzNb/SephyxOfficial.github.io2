import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useVaultUnlock } from "@/hooks/useVaultUnlock";
import Home from "@/pages/Home";
import Product from "@/pages/Product";
import Vault from "@/pages/Vault";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/product/:id" component={Product} />
      <Route path="/vault" component={Vault} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize the vault unlock hook globally
  useVaultUnlock();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-dark-bg text-white">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

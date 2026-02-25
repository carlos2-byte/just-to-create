import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RescisaoCompleta from "./pages/RescisaoCompleta";
import Simulador from "./pages/Simulador";
import Historico from "./pages/Historico";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";
import SplashScreen from "./components/SplashScreen";
import { initializeAdMob, showBanner, showAppOpenAd } from "./lib/admobService";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (!showSplash) {
      // Initialize AdMob and show ads after splash
      initializeAdMob().then(() => {
        showBanner();
        showAppOpenAd();
      });
    }
  }, [showSplash]);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/rescisao" element={<RescisaoCompleta />} />
            <Route path="/simulador/:tipo" element={<Simulador />} />
            <Route path="/historico" element={<Historico />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

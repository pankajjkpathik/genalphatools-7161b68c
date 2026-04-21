import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import ToolPage from "./pages/ToolPage";
import NumerologyTools from "./pages/NumerologyTools";
import HealthCalculators from "./pages/HealthCalculators";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Disclaimer from "./pages/Disclaimer";
import Terms from "./pages/Terms";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AdSenseReadiness from "./pages/AdSenseReadiness";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/numerology-tools" element={<NumerologyTools />} />
            <Route path="/health-calculators" element={<HealthCalculators />} />
            <Route path="/tool/:slug" element={<ToolPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/adsense-readiness" element={<AdSenseReadiness />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ConsentBanner from "@/components/ConsentBanner";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import ToolPage from "./pages/ToolPage";
import ClusterPage from "./pages/ClusterPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Disclaimer from "./pages/Disclaimer";
import Terms from "./pages/Terms";
import Blog from "./pages/Blog";
import BlogCategory from "./pages/BlogCategory";
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
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/marketing-tools" element={<ClusterPage category="marketing" />} />
            <Route path="/statistics-tools" element={<ClusterPage category="statistics" />} />
            <Route path="/ab-testing-tools" element={<ClusterPage category="abtest" />} />
            <Route path="/finance-tools" element={<ClusterPage category="finance" />} />
            <Route path="/saas-metrics-tools" element={<ClusterPage category="saas" />} />
            <Route path="/utility-tools" element={<ClusterPage category="utility" />} />
            <Route path="/visualization-tools" element={<ClusterPage category="viz" />} />
            <Route path="/bonus-tools" element={<ClusterPage category="bonus" />} />
            <Route path="/tool/:slug" element={<ToolPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/category/:category" element={<BlogCategory />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/adsense-readiness" element={<AdSenseReadiness />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ConsentBanner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";

import Index from "./pages/Index.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import GetHelpPage from "./pages/GetHelpPage.tsx";
import DonatePage from "./pages/DonatePage.tsx";
import SchemesPage from "./pages/SchemesPage.tsx";
import PartnersPage from "./pages/PartnersPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import FAQPage from "./pages/FAQPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import TrackingPage from "./pages/TrackingPage.tsx"; // ✅ ADDED
import NotFound from "./pages/NotFound.tsx";

import { ChatBot } from "./components/ChatBot";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>

            {/* HOME */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />

            {/* ABOUT */}
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <AboutPage />
                </ProtectedRoute>
              }
            />

            {/* GET HELP */}
            <Route
              path="/get-help"
              element={
                <ProtectedRoute>
                  <GetHelpPage />
                </ProtectedRoute>
              }
            />

            {/* DONATE */}
            <Route
              path="/donate"
              element={
                <ProtectedRoute>
                  <DonatePage />
                </ProtectedRoute>
              }
            />

            {/* SCHEMES */}
            <Route
              path="/schemes"
              element={
                <ProtectedRoute>
                  <SchemesPage />
                </ProtectedRoute>
              }
            />

            {/* PARTNERS */}
            <Route
              path="/partners"
              element={
                <ProtectedRoute>
                  <PartnersPage />
                </ProtectedRoute>
              }
            />

            {/* CONTACT */}
            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <ContactPage />
                </ProtectedRoute>
              }
            />

            {/* FAQ */}
            <Route
              path="/faq"
              element={
                <ProtectedRoute>
                  <FAQPage />
                </ProtectedRoute>
              }
            />

            {/* PROFILE */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* 🔥 TRACKING PAGE (NEW) */}
            <Route
              path="/tracking"
              element={
                <ProtectedRoute>
                  <TrackingPage />
                </ProtectedRoute>
              }
            />

            {/* LOGIN / SIGNUP */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />

          </Routes>

          <ChatBot />
        </BrowserRouter>

      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
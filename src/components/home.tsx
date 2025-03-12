import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./navigation/Navbar";
import HeroSection from "./landing/HeroSection";
import FeaturesGrid from "./landing/FeaturesGrid";
import TestimonialsSection from "./landing/TestimonialsSection";
import StatisticsSection from "./landing/StatisticsSection";
import Footer from "./landing/Footer";
import AuthModal from "./auth/AuthModal";
import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const location = useLocation();

  // Check if we were redirected from a protected route
  useEffect(() => {
    if (location.state?.showLogin) {
      setAuthMode("login");
      setIsAuthModalOpen(true);
    }
  }, [location.state]);

  const handleLoginClick = () => {
    setAuthMode("login");
    setIsAuthModalOpen(true);
  };

  const handleSignUpClick = () => {
    setAuthMode("signup");
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        onLoginClick={handleLoginClick}
        onSignUpClick={handleSignUpClick}
        isAuthenticated={!!user}
      />

      <main className="pt-[72px]">
        <HeroSection
          onPrimaryClick={handleSignUpClick}
          onSecondaryClick={() => {
            window.scrollTo({
              top: document.querySelector("#features")?.offsetTop,
              behavior: "smooth",
            });
          }}
        />

        <StatisticsSection />

        <div id="features">
          <FeaturesGrid />
        </div>

        <TestimonialsSection />
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default Home;

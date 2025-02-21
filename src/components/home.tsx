import React, { useState } from "react";
import Navbar from "./navigation/Navbar";
import HeroSection from "./landing/HeroSection";
import FeaturesGrid from "./landing/FeaturesGrid";
import AuthModal from "./auth/AuthModal";
import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

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

        <div id="features">
          <FeaturesGrid />
        </div>
      </main>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default Home;

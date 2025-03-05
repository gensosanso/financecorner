import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const HeroSection = ({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  onPrimaryClick = () => {},
  onSecondaryClick = () => {},
}: HeroSectionProps) => {
  const { language, t } = useLanguage();

  const defaultTitle =
    language === "fr"
      ? "Plateforme de Trading Crypto Nouvelle Génération"
      : language === "es"
        ? "Plataforma de Trading de Criptomonedas de Nueva Generación"
        : language === "pt"
          ? "Plataforma de Negociação de Criptomoedas de Nova Geração"
          : "Next-Gen Crypto Trading Platform";

  const defaultSubtitle =
    language === "fr"
      ? "Échangez, envoyez et prêtez des cryptomonnaies en toute confiance grâce à notre plateforme sécurisée et intuitive."
      : language === "es"
        ? "Comercie, envíe y preste criptomonedas con confianza utilizando nuestra plataforma segura e intuitiva."
        : language === "pt"
          ? "Negocie, envie e empreste criptomoedas com confiança usando nossa plataforma segura e intuitiva."
          : "Trade, send, and lend cryptocurrency with confidence using our secure and intuitive platform.";

  const defaultPrimaryCTA =
    language === "fr"
      ? "Commencer"
      : language === "es"
        ? "Comenzar"
        : language === "pt"
          ? "Começar"
          : "Get Started";

  const defaultSecondaryCTA =
    language === "fr"
      ? "En Savoir Plus"
      : language === "es"
        ? "Más Información"
        : language === "pt"
          ? "Saiba Mais"
          : "Learn More";

  const finalTitle = title || defaultTitle;
  const finalSubtitle = subtitle || defaultSubtitle;
  const finalPrimaryCTA = primaryCTA || defaultPrimaryCTA;
  const finalSecondaryCTA = secondaryCTA || defaultSecondaryCTA;
  return (
    <section className="w-full h-[600px] bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 text-center lg:text-left"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary mb-6">
            {finalTitle}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl">
            {finalSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button size="lg" onClick={onPrimaryClick} className="text-lg px-8">
              {finalPrimaryCTA}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onSecondaryClick}
              className="text-lg px-8"
            >
              {finalSecondaryCTA}
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 relative"
        >
          <div className="relative w-full max-w-[500px] aspect-square mx-auto">
            <img
              src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80"
              alt="Crypto Trading Platform"
              className="rounded-2xl shadow-2xl object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

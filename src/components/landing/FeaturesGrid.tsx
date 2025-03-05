import React from "react";
import FeatureCard from "./FeatureCard";
import { ArrowUpRight, Wallet, Shield, LineChart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface FeaturesGridProps {
  features?: Feature[];
}

const getDefaultFeatures = (language: string): Feature[] => {
  switch (language) {
    case "fr":
      return [
        {
          icon: ArrowUpRight,
          title: "Trading Instantané",
          description:
            "Exécutez des transactions instantanément grâce à notre moteur de correspondance haute performance et nos pools de liquidité profonds.",
        },
        {
          icon: Wallet,
          title: "Portefeuille Sécurisé",
          description:
            "Stockez vos actifs crypto en toute sécurité grâce à notre infrastructure de sécurité de niveau institutionnel.",
        },
        {
          icon: Shield,
          title: "Sécurité Avancée",
          description:
            "Dormez sur vos deux oreilles en sachant que vos actifs sont protégés par des mesures de sécurité à la pointe de la technologie.",
        },
        {
          icon: LineChart,
          title: "Analyse de Marché",
          description:
            "Accédez à des données et analyses de marché complètes pour prendre des décisions de trading éclairées.",
        },
      ];
    case "es":
      return [
        {
          icon: ArrowUpRight,
          title: "Trading Instantáneo",
          description:
            "Ejecute operaciones al instante con nuestro motor de emparejamiento de alto rendimiento y pools de liquidez profundos.",
        },
        {
          icon: Wallet,
          title: "Billetera Segura",
          description:
            "Almacene sus activos criptográficos de forma segura con nuestra infraestructura de seguridad de nivel institucional.",
        },
        {
          icon: Shield,
          title: "Seguridad Avanzada",
          description:
            "Descanse tranquilo sabiendo que sus activos están protegidos por medidas de seguridad de última generación.",
        },
        {
          icon: LineChart,
          title: "Análisis de Mercado",
          description:
            "Acceda a datos y análisis completos del mercado para tomar decisiones comerciales informadas.",
        },
      ];
    case "pt":
      return [
        {
          icon: ArrowUpRight,
          title: "Negociação Instantânea",
          description:
            "Execute negociações instantaneamente com nosso motor de correspondência de alto desempenho e pools de liquidez profundos.",
        },
        {
          icon: Wallet,
          title: "Carteira Segura",
          description:
            "Armazene seus ativos cripto com segurança com nossa infraestrutura de segurança de nível institucional.",
        },
        {
          icon: Shield,
          title: "Segurança Avançada",
          description:
            "Fique tranquilo sabendo que seus ativos estão protegidos por medidas de segurança de última geração.",
        },
        {
          icon: LineChart,
          title: "Análise de Mercado",
          description:
            "Acesse dados e análises abrangentes do mercado para tomar decisões de negociação informadas.",
        },
      ];
    default:
      return [
        {
          icon: ArrowUpRight,
          title: "Instant Trading",
          description:
            "Execute trades instantly with our high-performance matching engine and deep liquidity pools.",
        },
        {
          icon: Wallet,
          title: "Secure Wallet",
          description:
            "Store your crypto assets safely with our institutional-grade security infrastructure.",
        },
        {
          icon: Shield,
          title: "Advanced Security",
          description:
            "Rest easy knowing your assets are protected by state-of-the-art security measures.",
        },
        {
          icon: LineChart,
          title: "Market Analytics",
          description:
            "Access comprehensive market data and analytics to make informed trading decisions.",
        },
      ];
  }
};

const FeaturesGrid = ({ features }: FeaturesGridProps) => {
  const { language } = useLanguage();
  const defaultFeatures = getDefaultFeatures(language);
  const displayFeatures = features || defaultFeatures;
  return (
    <div className="w-full max-w-[1200px] mx-auto py-16 px-4 bg-background">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">
          {language === "fr"
            ? "Fonctionnalités de la Plateforme"
            : language === "es"
              ? "Características de la Plataforma"
              : language === "pt"
                ? "Recursos da Plataforma"
                : "Platform Features"}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {language === "fr"
            ? "Découvrez les fonctionnalités puissantes qui font de notre plateforme le choix préféré des traders de cryptomonnaies"
            : language === "es"
              ? "Descubra las potentes características que hacen de nuestra plataforma la opción preferida para los operadores de criptomonedas"
              : language === "pt"
                ? "Descubra os recursos poderosos que tornam nossa plataforma a escolha preferida para traders de criptomoedas"
                : "Discover the powerful features that make our platform the preferred choice for crypto traders"}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {displayFeatures.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturesGrid;

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { TrendingUp, Users, Shield, Globe } from "lucide-react";

interface StatItem {
  icon: React.ElementType;
  value: string;
  label: string;
  color: string;
}

const getStats = (language: string): StatItem[] => {
  switch (language) {
    case "fr":
      return [
        {
          icon: TrendingUp,
          value: "$2.5B+",
          label: "Volume d'échanges mensuel",
          color: "bg-blue-medium",
        },
        {
          icon: Users,
          value: "250K+",
          label: "Utilisateurs actifs",
          color: "bg-turquoise",
        },
        {
          icon: Shield,
          value: "100%",
          label: "Sécurité des fonds",
          color: "bg-gold",
        },
        {
          icon: Globe,
          value: "150+",
          label: "Pays pris en charge",
          color: "bg-coral",
        },
      ];
    case "es":
      return [
        {
          icon: TrendingUp,
          value: "$2.5B+",
          label: "Volumen de operaciones mensual",
          color: "bg-blue-medium",
        },
        {
          icon: Users,
          value: "250K+",
          label: "Usuarios activos",
          color: "bg-turquoise",
        },
        {
          icon: Shield,
          value: "100%",
          label: "Seguridad de fondos",
          color: "bg-gold",
        },
        {
          icon: Globe,
          value: "150+",
          label: "Países soportados",
          color: "bg-coral",
        },
      ];
    case "pt":
      return [
        {
          icon: TrendingUp,
          value: "$2.5B+",
          label: "Volume de negociação mensal",
          color: "bg-blue-medium",
        },
        {
          icon: Users,
          value: "250K+",
          label: "Usuários ativos",
          color: "bg-turquoise",
        },
        {
          icon: Shield,
          value: "100%",
          label: "Segurança de fundos",
          color: "bg-gold",
        },
        {
          icon: Globe,
          value: "150+",
          label: "Países suportados",
          color: "bg-coral",
        },
      ];
    default:
      return [
        {
          icon: TrendingUp,
          value: "$2.5B+",
          label: "Monthly trading volume",
          color: "bg-blue-medium",
        },
        {
          icon: Users,
          value: "250K+",
          label: "Active users",
          color: "bg-turquoise",
        },
        {
          icon: Shield,
          value: "100%",
          label: "Funds security",
          color: "bg-gold",
        },
        {
          icon: Globe,
          value: "150+",
          label: "Supported countries",
          color: "bg-coral",
        },
      ];
  }
};

const CounterAnimation = ({ value }: { value: string }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <motion.span
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
      }}
      className="text-4xl font-bold"
    >
      {value}
    </motion.span>
  );
};

const StatisticsSection = () => {
  const { language } = useLanguage();
  const stats = getStats(language);

  const sectionTitle =
    {
      en: "CryptoEx by the Numbers",
      fr: "CryptoEx en Chiffres",
      es: "CryptoEx en Números",
      pt: "CryptoEx em Números",
    }[language] || "CryptoEx by the Numbers";

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-blue-deep">
            {sectionTitle}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md border border-gray-border hover:border-blue-medium transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mb-4 text-white`}
                >
                  <Icon className="h-8 w-8" />
                </div>
                <CounterAnimation value={stat.value} />
                <p className="text-muted-foreground mt-2 text-center">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;

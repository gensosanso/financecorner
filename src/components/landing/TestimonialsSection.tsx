import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

const getTestimonials = (language: string): Testimonial[] => {
  switch (language) {
    case "fr":
      return [
        {
          id: 1,
          name: "Sophie Martin",
          role: "Trader Professionnel",
          company: "InvestCorp",
          content:
            "CryptoEx a révolutionné ma façon de gérer mes actifs numériques. L'interface est intuitive et les frais sont très compétitifs.",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
        },
        {
          id: 2,
          name: "Thomas Dubois",
          role: "Investisseur Particulier",
          company: "",
          content:
            "Je cherchais une plateforme sécurisée pour débuter dans les cryptomonnaies. CryptoEx m'a fourni tous les outils et ressources nécessaires.",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas",
        },
        {
          id: 3,
          name: "Émilie Rousseau",
          role: "Directrice Financière",
          company: "TechStart SAS",
          content:
            "Le service de prêt crypto de CryptoEx nous a permis d'optimiser nos actifs dormants et de générer des revenus supplémentaires.",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emilie",
        },
      ];
    case "es":
      return [
        {
          id: 1,
          name: "Miguel Hernández",
          role: "Trader Profesional",
          company: "InvestCorp",
          content:
            "CryptoEx ha revolucionado mi forma de gestionar mis activos digitales. La interfaz es intuitiva y las comisiones son muy competitivas.",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel",
        },
        {
          id: 2,
          name: "Ana Rodríguez",
          role: "Inversora Particular",
          company: "",
          content:
            "Buscaba una plataforma segura para comenzar con las criptomonedas. CryptoEx me proporcionó todas las herramientas y recursos necesarios.",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
        },
        {
          id: 3,
          name: "Carlos Vega",
          role: "Director Financiero",
          company: "TechStart SL",
          content:
            "El servicio de préstamo de criptomonedas de CryptoEx nos ha permitido optimizar nuestros activos inactivos y generar ingresos adicionales.",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
        },
      ];
    case "pt":
      return [
        {
          id: 1,
          name: "João Silva",
          role: "Trader Profissional",
          company: "InvestCorp",
          content:
            "CryptoEx revolucionou minha forma de gerenciar meus ativos digitais. A interface é intuitiva e as taxas são muito competitivas.",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao",
        },
        {
          id: 2,
          name: "Mariana Costa",
          role: "Investidora Particular",
          company: "",
          content:
            "Eu estava procurando uma plataforma segura para começar com criptomoedas. CryptoEx me forneceu todas as ferramentas e recursos necessários.",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana",
        },
        {
          id: 3,
          name: "Rafael Oliveira",
          role: "Diretor Financeiro",
          company: "TechStart Ltda",
          content:
            "O serviço de empréstimo de criptomoedas da CryptoEx nos permitiu otimizar nossos ativos inativos e gerar receita adicional.",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rafael",
        },
      ];
    default:
      return [
        {
          id: 1,
          name: "Sarah Johnson",
          role: "Professional Trader",
          company: "InvestCorp",
          content:
            "CryptoEx has revolutionized how I manage my digital assets. The interface is intuitive and the fees are highly competitive.",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        },
        {
          id: 2,
          name: "Michael Chen",
          role: "Retail Investor",
          company: "",
          content:
            "I was looking for a secure platform to get started with cryptocurrencies. CryptoEx provided me with all the necessary tools and resources.",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        },
        {
          id: 3,
          name: "Emily Rodriguez",
          role: "CFO",
          company: "TechStart Inc",
          content:
            "CryptoEx's crypto lending service has allowed us to optimize our dormant assets and generate additional revenue streams.",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
        },
      ];
  }
};

const TestimonialsSection = () => {
  const { language } = useLanguage();
  const testimonials = getTestimonials(language);

  const sectionTitle =
    {
      en: "What Our Users Say",
      fr: "Ce Que Disent Nos Utilisateurs",
      es: "Lo Que Dicen Nuestros Usuarios",
      pt: "O Que Nossos Usuários Dizem",
    }[language] || "What Our Users Say";

  const sectionSubtitle =
    {
      en: "Discover why thousands of traders trust CryptoEx for their cryptocurrency needs",
      fr: "Découvrez pourquoi des milliers de traders font confiance à CryptoEx pour leurs besoins en cryptomonnaie",
      es: "Descubra por qué miles de traders confían en CryptoEx para sus necesidades de criptomonedas",
      pt: "Descubra por que milhares de traders confiam na CryptoEx para suas necessidades de criptomoedas",
    }[language] ||
    "Discover why thousands of traders trust CryptoEx for their cryptocurrency needs";

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-light">
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
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {sectionSubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white hover:shadow-lg transition-all duration-300 hover:border-blue-medium">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12 border-2 border-blue-light">
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-blue-deep">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                        {testimonial.company && ` @ ${testimonial.company}`}
                      </p>
                    </div>
                  </div>
                  <p className="italic text-gray-dark">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

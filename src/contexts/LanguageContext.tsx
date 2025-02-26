import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "fr" | "es" | "pt";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

export const translations = {
  // Navigation
  "nav.products": {
    en: "Products",
    fr: "Produits",
    es: "Productos",
    pt: "Produtos",
  },
  "nav.resources": {
    en: "Resources",
    fr: "Ressources",
    es: "Recursos",
    pt: "Recursos",
  },
  "nav.trading": {
    en: "Trading",
    fr: "Trading",
    es: "Trading",
    pt: "Trading",
  },
  "nav.trading.desc": {
    en: "Buy and sell cryptocurrencies",
    fr: "Acheter et vendre des cryptomonnaies",
    es: "Comprar y vender criptomonedas",
    pt: "Comprar e vender criptomoedas",
  },
  "nav.lending": {
    en: "Lending",
    fr: "Prêt",
    es: "Préstamos",
    pt: "Empréstimos",
  },
  "nav.lending.desc": {
    en: "Earn interest on your assets",
    fr: "Gagnez des intérêts sur vos actifs",
    es: "Gane intereses sobre sus activos",
    pt: "Ganhe juros sobre seus ativos",
  },
  "nav.learn": {
    en: "Learn",
    fr: "Apprendre",
    es: "Aprender",
    pt: "Aprender",
  },
  "nav.learn.desc": {
    en: "Educational resources",
    fr: "Ressources éducatives",
    es: "Recursos educativos",
    pt: "Recursos educacionais",
  },
  "nav.support": {
    en: "Support",
    fr: "Support",
    es: "Soporte",
    pt: "Suporte",
  },
  "nav.support.desc": {
    en: "Help center and documentation",
    fr: "Centre d'aide et documentation",
    es: "Centro de ayuda y documentación",
    pt: "Central de ajuda e documentação",
  },
  "nav.login": {
    en: "Login",
    fr: "Connexion",
    es: "Iniciar sesión",
    pt: "Entrar",
  },
  "nav.signup": {
    en: "Sign Up",
    fr: "S'inscrire",
    es: "Registrarse",
    pt: "Cadastrar-se",
  },
  "nav.dashboard": {
    en: "Dashboard",
    fr: "Tableau de bord",
    es: "Panel de control",
    pt: "Painel",
  },
  "nav.signout": {
    en: "Sign Out",
    fr: "Déconnexion",
    es: "Cerrar sesión",
    pt: "Sair",
  },

  // Learn Page
  "learn.title": {
    en: "Learn Crypto Trading",
    fr: "Apprendre le Trading de Crypto",
    es: "Aprenda Trading de Criptomonedas",
    pt: "Aprenda Trading de Criptomoedas",
  },
  "learn.basics": {
    en: "Basics",
    fr: "Bases",
    es: "Conceptos básicos",
    pt: "Conceitos básicos",
  },
  "learn.trading": {
    en: "Trading",
    fr: "Trading",
    es: "Trading",
    pt: "Trading",
  },
  "learn.defi": {
    en: "DeFi",
    fr: "DeFi",
    es: "DeFi",
    pt: "DeFi",
  },
  "learn.security": {
    en: "Security",
    fr: "Sécurité",
    es: "Seguridad",
    pt: "Segurança",
  },
  "learn.what.is.crypto": {
    en: "What is Cryptocurrency?",
    fr: "Qu'est-ce que la Cryptomonnaie?",
    es: "¿Qué es la Criptomoneda?",
    pt: "O que é Criptomoeda?",
  },
  "learn.what.is.crypto.desc": {
    en: "Understanding the fundamentals of digital currencies",
    fr: "Comprendre les fondamentaux des monnaies numériques",
    es: "Entendiendo los fundamentos de las monedas digitales",
    pt: "Entendendo os fundamentos das moedas digitais",
  },
  "learn.what.is.crypto.content": {
    en: "Cryptocurrency is a digital or virtual form of currency that uses cryptography for security. Unlike traditional currencies, cryptocurrencies are typically decentralized systems based on blockchain technology.",
    fr: "La cryptomonnaie est une forme de devise numérique ou virtuelle qui utilise la cryptographie pour sa sécurité. Contrairement aux devises traditionnelles, les cryptomonnaies sont généralement des systèmes décentralisés basés sur la technologie blockchain.",
    es: "La criptomoneda es una forma digital o virtual de moneda que utiliza la criptografía para su seguridad. A diferencia de las monedas tradicionales, las criptomonedas son típicamente sistemas descentralizados basados en la tecnología blockchain.",
    pt: "A criptomoeda é uma forma digital ou virtual de moeda que usa criptografia para segurança. Ao contrário das moedas tradicionais, as criptomoedas são tipicamente sistemas descentralizados baseados na tecnologia blockchain.",
  },
  "learn.key.concepts": {
    en: "Key Concepts:",
    fr: "Concepts Clés:",
    es: "Conceptos Clave:",
    pt: "Conceitos Chave:",
  },
  "learn.blockchain": {
    en: "Blockchain Technology",
    fr: "Technologie Blockchain",
    es: "Tecnología Blockchain",
    pt: "Tecnologia Blockchain",
  },
  "learn.decentralization": {
    en: "Decentralization",
    fr: "Décentralisation",
    es: "Descentralización",
    pt: "Descentralização",
  },
  "learn.wallets": {
    en: "Digital Wallets",
    fr: "Portefeuilles Numériques",
    es: "Billeteras Digitales",
    pt: "Carteiras Digitais",
  },
  "learn.keys": {
    en: "Public and Private Keys",
    fr: "Clés Publiques et Privées",
    es: "Claves Públicas y Privadas",
    pt: "Chaves Públicas e Privadas",
  },

  // Support Page
  "support.title": {
    en: "How can we help you?",
    fr: "Comment pouvons-nous vous aider?",
    es: "¿Cómo podemos ayudarte?",
    pt: "Como podemos ajudá-lo?",
  },
  "support.subtitle": {
    en: "Search our help center or contact our support team",
    fr: "Recherchez dans notre centre d'aide ou contactez notre équipe de support",
    es: "Busque en nuestro centro de ayuda o contacte a nuestro equipo de soporte",
    pt: "Pesquise em nosso centro de ajuda ou entre em contato com nossa equipe de suporte",
  },
  "support.search": {
    en: "Search for help...",
    fr: "Rechercher de l'aide...",
    es: "Buscar ayuda...",
    pt: "Procurar ajuda...",
  },
  "support.contact": {
    en: "Contact Support",
    fr: "Contacter le Support",
    es: "Contactar Soporte",
    pt: "Contatar Suporte",
  },
  "support.contact.desc": {
    en: "Send us a message and we'll get back to you as soon as possible",
    fr: "Envoyez-nous un message et nous vous répondrons dès que possible",
    es: "Envíenos un mensaje y le responderemos lo antes posible",
    pt: "Envie-nos uma mensagem e responderemos o mais rápido possível",
  },

  // Lending Page
  "lending.title": {
    en: "Crypto Lending",
    fr: "Prêt de Crypto",
    es: "Préstamos de Criptomonedas",
    pt: "Empréstimos de Criptomoedas",
  },
  "lending.create": {
    en: "Create Lending Offer",
    fr: "Créer une Offre de Prêt",
    es: "Crear Oferta de Préstamo",
    pt: "Criar Oferta de Empréstimo",
  },
  "lending.view": {
    en: "View Borrowing Options",
    fr: "Voir les Options d'Emprunt",
    es: "Ver Opciones de Préstamo",
    pt: "Ver Opções de Empréstimo",
  },
  "lending.active.loans": {
    en: "Your Active Loans",
    fr: "Vos Prêts Actifs",
    es: "Sus Préstamos Activos",
    pt: "Seus Empréstimos Ativos",
  },
  "lending.active.borrows": {
    en: "Your Active Borrows",
    fr: "Vos Emprunts Actifs",
    es: "Sus Préstamos Activos",
    pt: "Seus Empréstimos Ativos",
  },
  "lending.no.loans": {
    en: "No active loans",
    fr: "Aucun prêt actif",
    es: "Sin préstamos activos",
    pt: "Sem empréstimos ativos",
  },
  "lending.no.borrows": {
    en: "No active borrows",
    fr: "Aucun emprunt actif",
    es: "Sin préstamos activos",
    pt: "Sem empréstimos ativos",
  },

  // Trading Page
  "trading.orderbook": {
    en: "Order Book",
    fr: "Carnet d'Ordres",
    es: "Libro de Órdenes",
    pt: "Livro de Ordens",
  },
  "trading.history": {
    en: "Trade History",
    fr: "Historique des Transactions",
    es: "Historial de Operaciones",
    pt: "Histórico de Negociações",
  },
  "trading.open.orders": {
    en: "Open Orders",
    fr: "Ordres Ouverts",
    es: "Órdenes Abiertas",
    pt: "Ordens Abertas",
  },
  "trading.no.orders": {
    en: "No open orders",
    fr: "Aucun ordre ouvert",
    es: "Sin órdenes abiertas",
    pt: "Sem ordens abertas",
  },
  "trading.volume": {
    en: "24h Volume:",
    fr: "Volume 24h:",
    es: "Volumen 24h:",
    pt: "Volume 24h:",
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  // Load language preference from localStorage on initial load
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && ["en", "fr", "es", "pt"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language] || translations[key]["en"];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

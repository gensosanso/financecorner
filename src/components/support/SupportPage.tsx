import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search } from "lucide-react";

const faqs = [
  {
    question: "How do I create an account?",
    answer:
      "To create an account, click the 'Sign Up' button in the top right corner of the page. Fill in your email address, create a password, and follow the verification steps sent to your email.",
  },
  {
    question: "How do I deposit funds?",
    answer:
      "You can deposit funds through your dashboard by clicking the 'Deposit' button. We accept various payment methods including bank transfers and credit cards.",
  },
  {
    question: "What are the trading fees?",
    answer:
      "Our trading fees are competitive and vary based on your trading volume. Basic accounts start at 0.1% per trade. View our complete fee schedule in the trading section.",
  },
  {
    question: "How do I withdraw my funds?",
    answer:
      "To withdraw funds, go to your dashboard and click the 'Withdraw' button. Enter the amount and your withdrawal method. Processing times vary by method.",
  },
  {
    question: "Is my crypto secure?",
    answer:
      "Yes, we implement industry-leading security measures including cold storage, two-factor authentication, and regular security audits to protect your assets.",
  },
];

const SupportPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-background pt-[72px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">How can we help you?</h1>
          <p className="text-muted-foreground mb-6">
            Search our help center or contact our support team
          </p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>
                Send us a message and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Input placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <Input type="email" placeholder="Your Email" />
                </div>
                <div className="space-y-2">
                  <Input placeholder="Subject" />
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Describe your issue"
                    className="min-h-[100px]"
                  />
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
              <CardDescription>
                Common topics and helpful resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => (window.location.href = "/learn")}
                >
                  Getting Started Guide
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => (window.location.href = "/trading")}
                >
                  Trading Tutorial
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Security Best Practices
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Fee Schedule
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;

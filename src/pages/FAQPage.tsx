import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "What is Arogyabandhu?", a: "Arogyabandhu is a healthcare support platform that connects patients in need with government schemes, NGOs, hospitals, and donors to fund and support medical treatments across India." },
  { q: "How do I apply for help?", a: "Visit the 'Get Help' page and fill out the patient request form with your medical details and documents. Our team will verify your case and connect you with appropriate support." },
  { q: "Is my donation safe?", a: "Yes! All donations are processed through secure payment gateways. Every case is verified by our team, and you can track how your donation is used." },
  { q: "What government schemes are available?", a: "We help patients access schemes like Ayushman Bharat (PM-JAY), RSBY, and various state-level health schemes. Use our Eligibility Checker to see what you qualify for." },
  { q: "How are cases verified?", a: "Each case goes through a multi-step verification process including medical record review, hospital confirmation, and income verification to ensure authenticity." },
  { q: "Can hospitals and NGOs partner with you?", a: "Absolutely! Visit our Partners page or Contact Us to learn about partnership opportunities. We welcome hospitals, NGOs, and other healthcare organizations." },
  { q: "Is there any fee for patients?", a: "No. Arogyabandhu's services are completely free for patients. We connect you with available funding and support at no cost." },
  { q: "How can I volunteer?", a: "We welcome volunteers! Contact us through the Contact page to learn about volunteering opportunities in your area." },
];

const FAQPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="py-20 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked <span className="text-gradient-primary">Questions</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about Arogyabandhu.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border px-6 shadow-sm">
                  <AccordionTrigger className="text-foreground font-medium text-left hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturedCasesSection from "@/components/FeaturedCasesSection";
import CTASection from "@/components/CTASection";

const DonatePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="py-20 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Make a <span className="text-gradient-primary">Difference</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse verified cases and donate securely. Track the impact of every rupee you contribute.
            </p>
          </div>
        </section>
        <FeaturedCasesSection/>
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default DonatePage;

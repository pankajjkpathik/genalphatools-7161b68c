import SEOHead from "@/components/SEOHead";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolCard from "@/components/ToolCard";
import { getToolsByCategory } from "@/data/tools";

const NumerologyTools = () => {
  const tools = getToolsByCategory("numerology");
  return (
    <>
      <SEOHead
        title="Free Numerology Tools & Calculators Online | GenAlpha Tools"
        description="Explore free numerology tools: name numerology, life path, destiny number, mobile number analysis & more. Instant results, 100% free."
      />
      <SiteHeader />
      <main className="container py-8 max-w-4xl">
        <Breadcrumbs items={[{ label: "Numerology Tools" }]} />
        <h1 className="font-heading font-bold text-2xl md:text-3xl mb-2">🔮 Numerology Tools</h1>
        <p className="text-muted-foreground mb-4">Discover the hidden power of numbers with our free, accurate numerology calculators rooted in Pythagorean and Vedic traditions.</p>
        <section className="bg-card border border-border rounded-xl p-5 mb-8 text-sm text-muted-foreground leading-relaxed space-y-3">
          <p>Numerology is the ancient study of how numbers influence personality, relationships, career, and destiny. At GenAlpha Tools we offer {tools.length} free <strong>online numerology calculators</strong> — including Name Numerology, Life Path Number, Destiny Number, Mobile & Vehicle Number Analysis, Personal Year Forecast, Baby Name Numerology, and Marriage Compatibility. Each tool uses the Pythagorean letter-to-number system (A=1 through I=9, repeating), the most widely accepted method in modern Western numerology and increasingly popular in Indian numerology practice.</p>
          <p>Every calculator below comes with a detailed reading, the formula used, a worked example, and a comprehensive FAQ. You'll learn what your number actually means — not just see a digit. Whether you're choosing a baby's name, evaluating a new mobile number, planning a marriage date, or simply exploring self-awareness, our tools deliver instant, easy-to-understand insights.</p>
        </section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map(t => <ToolCard key={t.slug} tool={t} />)}
        </div>
        <section className="mt-10 bg-muted/40 border border-border rounded-xl p-6">
          <h2 className="font-heading font-bold text-xl mb-3">How Numerology Works</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">Pythagoras taught that "the world is built on the power of numbers." In numerology, every letter of the alphabet corresponds to a single digit (1–9). By summing and reducing the digits of your name or birth date, you arrive at a single root number — or one of the master numbers 11, 22, or 33 — that reveals your core vibration. These vibrations are believed to influence personality traits, relationship dynamics, career paths, and even lucky days.</p>
          <p className="text-sm text-muted-foreground leading-relaxed">Read our <a href="/blog" className="text-primary underline">numerology guides on the blog</a> to learn how to interpret your numbers, choose lucky baby names, and use numerology for career and relationship decisions.</p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
};

export default NumerologyTools;

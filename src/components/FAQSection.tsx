import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { ToolFAQ } from "@/data/tools";

const FAQSection = ({ faqs }: { faqs: ToolFAQ[] }) => (
  <section className="mt-10">
    <h2 className="font-heading font-bold text-xl mb-4">Frequently Asked Questions</h2>
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, i) => (
        <AccordionItem key={i} value={`faq-${i}`}>
          <AccordionTrigger className="text-left text-sm font-medium">{faq.question}</AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
);

export default FAQSection;

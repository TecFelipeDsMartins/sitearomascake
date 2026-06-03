import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Componente Wrapper
export function AromasAccordion({ children, className, type = "single", collapsible = true }) {
  return (
    <Accordion type={type} collapsible={collapsible} className={className}>
      {children}
    </Accordion>
  );
}

// Componente para cada Item
export function AromasAccordionItem({ title, children, value, className }) {
  return (
    <AccordionItem value={value || "item"} className={className}>
      <AccordionTrigger>
        {title}
      </AccordionTrigger>
      <AccordionContent>
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}

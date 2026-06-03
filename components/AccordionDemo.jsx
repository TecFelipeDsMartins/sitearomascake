import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo({ items, className }) {
  // Garantir que haja algo para mostrar caso não haja itens
  const displayItems = items && items.length > 0 ? items : [];

  return (
    <Accordion
      type="single"
      collapsible
      className={className}
    >
      {displayItems.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>
            {item.title}
          </AccordionTrigger>
          <AccordionContent>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
      {displayItems.length === 0 && (
        <div style={{ padding: '20px', textAlign: 'center', border: '1px dashed #ccc' }}>
          Adicione itens no painel lateral para começar.
        </div>
      )}
    </Accordion>
  )
}

import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

import { AromasAccordion, AromasAccordionItem } from "./components/AromasAccordion";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "w9mVAsJKm8JxUnm2xV5u7w",
      token: "Tae8agD99bhEbYaUMJz6DRe3b16nawAJx3MEjtPd3Eu1WgKgqhwSwO65FxhhBNhJwyFDXn2s498PSShrQ",
    },
  ],

  preview: process.env.PLASMIC_PREVIEW === "true",
});

// Registro do Container Principal
PLASMIC.registerComponent(AromasAccordion, {
  name: "AromasAccordion",
  displayName: "📦 Accordion Container",
  props: {
    children: {
      type: "slot",
      allowedComponents: ["AromasAccordionItem"],
      defaultValue: {
        type: "component",
        name: "AromasAccordionItem",
      }
    },
    type: {
      type: "choice",
      options: ["single", "multiple"],
      defaultValue: "single"
    },
    collapsible: {
      type: "boolean",
      defaultValue: true
    }
  },
  importPath: "./components/AromasAccordion",
});

// Registro de cada Aba (Item)
PLASMIC.registerComponent(AromasAccordionItem, {
  name: "AromasAccordionItem",
  displayName: "📄 Accordion Item",
  props: {
    title: {
      type: "slot",
      displayName: "Título (Pergunta)",
      defaultValue: {
        type: "text",
        value: "Pergunta aqui...",
      }
    },
    children: {
      type: "slot",
      displayName: "Conteúdo (Resposta)",
      defaultValue: {
        type: "text",
        value: "Resposta aqui...",
      }
    },
    value: {
      type: "string",
      displayName: "ID Único",
      description: "Identificador para o estado do accordion"
    }
  },
  importPath: "./components/AromasAccordion",
});
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import React from "react";
  
  function NodeProperties() {
    return (
      <AccordionItem value="properties" disabled>
        <AccordionTrigger className="!no-underline !text-lg">
          Properties
        </AccordionTrigger>
        <AccordionContent></AccordionContent>
      </AccordionItem>
    );
  }
  
  export default NodeProperties;
  
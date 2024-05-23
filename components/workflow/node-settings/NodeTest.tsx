import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import React from "react";
  
  function NodeTest() {
    return (
      <AccordionItem value="test" disabled  className="border-none">
        <AccordionTrigger className="!no-underline !text-lg">
          Test
        </AccordionTrigger>
        <AccordionContent></AccordionContent>
      </AccordionItem>
    );
  }
  
  export default NodeTest;
  
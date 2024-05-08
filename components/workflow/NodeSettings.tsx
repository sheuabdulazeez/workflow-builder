import React from "react";
import useNodeSettings from "./store/node-settings";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { Label } from "../ui/label";
import SelectOption from "./SelectOption";

function NodeSettings() {
  const setNodeSettings = useNodeSettings((state) => state.setShow);
  return (
    <div className="p-2 relative flex space-y-10 flex-col">
      <div className="mt-3 shadow-none">
          <div className="flex justify-between items-center mb-3">
            <Input defaultValue="Node Name/Label" className="!ring-0" />
            <Button className="ms-5" variant={"ghost"} size="icon" onClick={() => setNodeSettings(false)}><X size={17}  /></Button>
          </div>
          <Accordion type="single" collapsible className="gap-5">
            <AccordionItem value="app-event">
              <AccordionTrigger className="!no-underline">
                App / Event
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col">
                  <Label>App</Label>
                  <SelectOption placeholder="Select an App" defaultValue="webhook" options={[{label: "Webhook", value: "webhook"}, {label: "Gmail", value: "gmail"},]} />
                </div>
                <div className="flex flex-col">
                  <Label>Event</Label>
                  <SelectOption placeholder="Select an Event" defaultValue="webhook" options={[{label: "Webhook", value: "webhook"}, {label: "Gmail", value: "gmail"},]} />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="authentication">
              <AccordionTrigger>Authentication</AccordionTrigger>
              <AccordionContent></AccordionContent>
            </AccordionItem>
            <AccordionItem value="properties">
              <AccordionTrigger>Properties</AccordionTrigger>
              <AccordionContent></AccordionContent>
            </AccordionItem>
            <AccordionItem value="test">
              <AccordionTrigger>Test</AccordionTrigger>
              <AccordionContent></AccordionContent>
            </AccordionItem>
          </Accordion>

      </div>
    </div>
  );
}

export default NodeSettings;

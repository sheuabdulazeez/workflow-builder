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
import useWorkflow from "./store/workflow";
import { EventType } from "react-hook-form";
import NodeEventSection from "./node-settings/NodeEventSection";
import NodeAuthentication from "./node-settings/NodeAuthentication";
import NodeProperties from "./node-settings/NodeProperties";
import NodeTest from "./node-settings/NodeTest";

function NodeSettings() {
  const {
    setSeletedNode,
    selectedNode,
    getAppEventOptions,
    getAppOptions,
    availableNodes,
    updateNodeData,
  } = useWorkflow((state) => ({
    selectedNode: state.selectedNode,
    setSeletedNode: state.setSelectedNode,
    getAppOptions: state.getAppOptions,
    getAppEventOptions: state.getAppEventOptions,
    updateNodeData: state.updateNodeData,
    availableNodes: state.availableNodes,
  }));

  return (
    <div className="p-2 relative flex space-y-10 flex-col">
      <div className="mt-3 shadow-none">
        <div className="flex justify-between items-center mb-3">
          <Input
            value={selectedNode!.data.label}
            className="!ring-0"
            onChange={(e) => updateNodeData({ label: e.target.value })}
          />
          <Button
            className="ms-5"
            variant={"ghost"}
            size="icon"
            onClick={() => setSeletedNode(null)}
          >
            <X size={17} />
          </Button>
        </div>
        <Accordion type="single" collapsible className="gap-5">
          <NodeEventSection />
          {availableNodes.find((n) => selectedNode!.data.api === n.name)
            ?.authentication && <NodeAuthentication />}
          <NodeProperties />
          <NodeTest />
        </Accordion>
      </div>
    </div>
  );
}

export default NodeSettings;

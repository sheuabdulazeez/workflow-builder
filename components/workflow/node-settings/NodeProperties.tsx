import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import useWorkflow from "../store/workflow";
import { INodeDescriptionProperties } from "@/lib/workflow/nodes/interface";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SelectOption from "../SelectOption";

function NodeProperties() {
  const { selectedNode, updateNodeData, getNodeInfo } = useWorkflow(
    (state) => ({
      selectedNode: state.selectedNode,
      updateNodeData: state.updateNodeData,
      getNodeInfo: state.getNodeInfo,
    })
  );
  const nodeInfo = getNodeInfo(selectedNode?.data.api);

  const fields = nodeInfo?.events?.find(
    (n) => n.name === selectedNode?.data.event
  )?.fields;

  return (
    <AccordionItem
      value="properties"
      disabled={
        !selectedNode?.data.api ||
        !selectedNode.data.event ||
        (nodeInfo?.authentication && !selectedNode.data.authenticationId)
      }
    >
      <AccordionTrigger className="!no-underline !text-lg">
        Properties
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-5 m-3">
          {fields &&
            fields.map((field) => (
              <FieldGenerator key={field.name} {...field} />
            ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

function FieldGenerator({
  displayName,
  type,
  required,
  name,
  defaultValue,
  options,
}: INodeDescriptionProperties) {
  const { selectedNode, updateNodeData } = useWorkflow((state) => ({
    selectedNode: state.selectedNode,
    updateNodeData: state.updateNodeData,
  }));
  const value = selectedNode?.data.params[name] ?? defaultValue ?? "";
  return (
    <div className="flex flex-col">
      <h1 className="text-md font-bold pb-1">
        {displayName}{" "}
        {required && (
          <span className="text-xs text-muted-foreground font-light">
            (required)
          </span>
        )}
      </h1>
      <div className="">
        {type.name === "textarea" && (
          <Textarea
            value={value}
            onChange={(e) =>
              updateNodeData({ params: { [name]: e.target.value } })
            }
          />
        )}
        {["string", "number"].includes(type.name) && (
          <Input
            type={type.name}
            value={value}
            onChange={(e) =>
              updateNodeData({ params: { [name]: e.target.value } })
            }
          />
        )}
        {type.name === "choices" && (
          <div className="flex flex-col flex-1 w-full">
            <SelectOption
              options={options!}
              defaultValue={value}
              onChange={(selected) =>
                updateNodeData({ params: { [name]: selected.value } })
              }
              placeholder="Select..."
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default NodeProperties;

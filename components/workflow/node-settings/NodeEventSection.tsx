import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import { Node } from "reactflow";
import SelectOption from "../SelectOption";
import useWorkflow from "../store/workflow";
import { Check, Info, X } from "lucide-react";

function NodeEventSection() {
  const { selectedNode, getAppEventOptions, getAppOptions, updateNodeData } =
    useWorkflow((state) => ({
      selectedNode: state.selectedNode,
      getAppOptions: state.getAppOptions,
      getAppEventOptions: state.getAppEventOptions,
      updateNodeData: state.updateNodeData,
    }));
  return (
    <AccordionItem value="app-event">
      <AccordionTrigger className="!no-underline !text-lg">
        <div className="flex items-center gap-2">
          {selectedNode!.data.api && selectedNode!.data.event ? (
            <Check className="text-white bg-green-600 rounded-full p-1" />
          ) : (
            <Info className="text-yellow-600" />
          )}
          App & Event{" "}
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-5 m-3">
          <div className="space-y-2">
            <h3>
              App <span className="text-xs">(required)</span>
            </h3>
            <div className="w-full flex flex-col">
              <SelectOption
                placeholder="Select an App"
                defaultValue={selectedNode?.data.api}
                options={getAppOptions(selectedNode!.type as any)}
                onChange={(option) =>
                  updateNodeData({
                    api: option.value,
                    event: null,
                    params: {},
                    authenticationId: null,
                  })
                }
              />
            </div>
          </div>

          {selectedNode!.data.api && (
            <div className="space-y-2">
              <h3>
                Event <span className="text-xs">(required)</span>
              </h3>
              <div className="w-full flex flex-col">
                <SelectOption
                  placeholder="Select an Event"
                  defaultValue={selectedNode?.data.event}
                  options={getAppEventOptions(selectedNode?.data.api)}
                  onChange={(option) => updateNodeData({ event: option.value })}
                />
              </div>
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default NodeEventSection;

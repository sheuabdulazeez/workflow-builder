import React from "react";
import { Handle, HandleType, Position } from "reactflow";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import useWorkflow from "./store/workflow";

type Props = {
  type: HandleType;
  position: Position;
  nodeId: string
};

function Connector({ type, position, nodeId }: Props) {
    const addNewNode = useWorkflow(state => state.addNode);

  return (
    <div>
      <div className="relative flex w-full flex-col items-center justify-center">
        <div className="h-8 w-[1px] bg-slate-500" />
        {position === Position.Bottom && (
          <HoverCard>
            <HoverCardTrigger>
              <Button className="m-0 p-1 rounded-full h-5 w-5 flex items-center justify-center !bg-white shadow cursor-pointer" onClick={() => addNewNode(nodeId)}>
                <Plus size={10} className="text-slate-600" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="text-xs w-30 p-1 text-muted-foreground" align="start" side="right">
              Add a step
            </HoverCardContent>
          </HoverCard>
        )}
      </div>
      <Handle type={type} position={position} className="invisible" />
    </div>
  );
}

export default Connector;

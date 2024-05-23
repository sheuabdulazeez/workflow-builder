import React, { memo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Handle, NodeProps, Position } from "reactflow";
import useNodeSettings from "./store/node-settings";
import Connector from "./Connector";
import useWorkflow from "./store/workflow";
import { EventType } from "@/lib/workflow/nodes/interface";
import { Badge } from "lucide-react";



function NodeElement(props: NodeProps) {
  const { type, id, data } = props;
  const setSelectedNode = useWorkflow(state => state.setSelectedNode);
  const getNodeInfo = useWorkflow(state => state.getNodeInfo);

  const nodeInfo = getNodeInfo(data.api)

  return (
    <>
   { type === "action" && <Connector type="target" position={Position.Top} nodeId={id} />}
    <Card className="w-[300px]" {...props} onClick={() => setSelectedNode({...props, type: EventType[type as any]})}>
      <CardHeader>
        <div className="flex gap-2 items-center">
          <span className="rounded-md border-2 p-2 border-slate-300">
            {nodeInfo ? <nodeInfo.icon /> : <Badge />}
          </span>
          <div className="w-5/6">
          <CardTitle className="text-md truncate">{data.label}</CardTitle>
          <CardDescription className="ps-1 text-xs text-muted-foreground">{data.description}</CardDescription>
          </div>
          </div>
      </CardHeader>
    </Card>
    <Connector type="source" position={Position.Bottom} nodeId={id} />
    </>
  );
}

export default memo(NodeElement);

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



function NodeElement(props: NodeProps) {
  const { type, id, data } = props;
  const setNodeSettings = useNodeSettings(state => state.setShow);
  return (
    <>
   { type === "action" && <Connector type="target" position={Position.Top} nodeId={id} />}
    <Card className="w-[300px]" {...props} onClick={() => setNodeSettings(true, {})}>
      <CardHeader>
        <CardTitle className="text-md truncate">{data.label}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">{data.description}</CardDescription>
      </CardHeader>
    </Card>
    <Connector type="source" position={Position.Bottom} nodeId={id} />
    </>
  );
}

export default memo(NodeElement);

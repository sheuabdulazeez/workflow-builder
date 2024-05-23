import React from "react";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import useWorkflow from "./store/workflow";
import { Label } from "../ui/label";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {toast} from "sonner"
import { Input } from "../ui/input";

function WorkflowHeader() {
  const saveWorkflow = useMutation(api.workflows.updateWorkflow);
  const workflow = useWorkflow((state) => state);

  const onSave = async () => {

      const promise = saveWorkflow({
        title: workflow.title,
        active: workflow.active,
        nodes: workflow.nodes,
        connections: workflow.connections,
        id: workflow.id!,
      });

      toast.promise(promise, {
        loading: "Saving workflow",
        success: "Workflow Saved!",
        error: "There was a problem saving the workflow!"
      })

    
  }

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 justify-between">
      <nav className="text-lg font-medium flex flex-row items-center gap-10 w-100">
        <div className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Input defaultValue={workflow.title} onChange={e => workflow.updateWorkflow({title: e.target.value})}/>
        </div>
        <div className="flex items-center gap-1">
          <Label>Draft</Label>
          <Switch
            defaultChecked={workflow.active}
            onCheckedChange={(active) => workflow.updateWorkflow({ active })}
          />
          <Label>Published</Label>
        </div>
      </nav>
      <div>
        <Button onClick={onSave} type="button">
          Save Changes
        </Button>
      </div>
    </header>
  );
}

export default WorkflowHeader;

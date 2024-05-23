"use client";
import { Switch } from "@/components/ui/switch";
import WorkflowEditor from "@/components/workflow/WorkflowEditor";
import WorkflowHeader from "@/components/workflow/WorkflowHeader";
import useWorkflow from "@/components/workflow/store/workflow";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

export const dynamic = 'force-dynamic'
function Page() {
  const { workflowId } = useParams();
  const { userId } = useAuth();
  const workflow = useQuery(api.workflows.getWorkflow, {ownerId: userId!, id: workflowId as Id<"workflows">})
  const updateWorkflow = useWorkflow(state => state.updateWorkflow)


  useEffect(() => {
    if(workflow) updateWorkflow({...workflow, id: workflow._id})
  }, [workflow])

  if(!workflow) return null;
    

  return <div>

    <WorkflowHeader />
    <div className="w-100 h-screen">

    <WorkflowEditor />
    </div>
  </div>;
}

export default Page;

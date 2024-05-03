"use client";
import { Switch } from "@/components/ui/switch";
import WorkflowEditor from "@/components/workflow/WorkflowEditor";
import WorkflowHeader from "@/components/workflow/WorkflowHeader";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";

function Page() {
  const { workflowId } = useParams();
  const { userId } = useAuth();
  const workflow = useQuery(api.workflows.getWorkflow, {ownerId: userId!, id: workflowId as Id<"workflows">})


  if(!workflow) return null;
    
  return <div>

    <WorkflowHeader  {...workflow} />
    <div className="w-100 h-screen">

    <WorkflowEditor />
    </div>
  </div>;
}

export default Page;

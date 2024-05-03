"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { Switch } from "@/components/ui/switch";
import CreateWorkflowButton from "@/components/shared/CreateWorkflowButton";
import Link from "next/link";

export default function Page() {
  const { userId } = useAuth();
  const workflows = useQuery(api.workflows.getWorkflows, { ownerId: userId! });
  const removeWorkflow = useMutation(api.workflows.deleteWorkflow);
  return (
    <div className="p-4  md:p-10">
    <Card>
      <CardHeader className="px-7 flex flex-row justify-between items-center">
        <div>
          <CardTitle>Workflows</CardTitle>
          <CardDescription>
            Automation workflows with triggers and actions
          </CardDescription>
        </div>
        <CreateWorkflowButton />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Workflow Name</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workflows && workflows.length ? (
              workflows.map((workflow) => (
                <TableRow className="bg-accent">
                  <TableCell>
                    <div className="font-medium">
                      <Link href={`/workflows/${workflow._id}`}>{workflow.title}</Link>
                      </div>
                  </TableCell>
                  <TableCell>
                    <Switch defaultChecked={workflow.active} className="me-10" />
                    <Popover>
                      <PopoverTrigger>
                        <DotsHorizontalIcon className="h-4 w-4" />
                      </PopoverTrigger>
                      <PopoverContent>
                        <div
                          className="w-full flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
                          role="button"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </div>
                        <ConfirmModal
                          onConfirm={() => removeWorkflow({ id: workflow._id })}
                          warningText=""
                        >
                          <div
                            className="w-full flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
                            role="button"
                          >
                            <Trash className="w-4 h-4" />
                            <span>Delete</span>
                          </div>
                        </ConfirmModal>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="bg-accent text-center">
                <TableCell colSpan={2}>No Workflow Added</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    </div>
  );
}

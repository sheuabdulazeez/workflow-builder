"use client";
import { Badge } from "@/components/ui/badge";
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
import { api } from "@/convex/_generated/api";
import AddTaskButton from "@/components/shared/AddTaskButton";
import { useMutation, useQuery } from "convex/react";
import { useAuth } from "@clerk/nextjs";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

export default function Page() {
  const { userId } = useAuth();
  const tasks = useQuery(api.tasks.getTasks, {
    ownerId: userId!,
  });
  const removeTask = useMutation(api.tasks.deleteTask);
  return (
    <Card>
      <CardHeader className="px-7 flex flex-row justify-between items-center">
        <div>
          <CardTitle>Tasks</CardTitle>
          <CardDescription>Tasks you have to keep track of...</CardDescription>
        </div>
        <AddTaskButton />
      </CardHeader>
      <CardContent>
        <ConfirmModal
          onConfirm={() => removeTask({ id: tasks![0]._id })}
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden sm:table-cell">Priority</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks && tasks.length ? (
              tasks.map((task) => (
                <TableRow className="bg-accent" key={task._id}>
                  <TableCell>
                    <div className="font-medium">{task.title}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {task.status}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="secondary">
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
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
                          onConfirm={() => removeTask({ id: task._id })}
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
                <TableCell colSpan={4}>No Task Added</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

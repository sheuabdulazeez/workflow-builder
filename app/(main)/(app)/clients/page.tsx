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
import { api } from "@/convex/_generated/api";
import AddClientButton from "@/components/shared/AddClientButton";
import { useMutation, useQuery } from "convex/react";
import { useAuth } from "@clerk/nextjs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { Edit, Trash } from "lucide-react";
import moment from "moment";

export default function Page() {
  const { userId } = useAuth();
  const clients = useQuery(api.clients.getClients, {
    ownerId: userId!,
  });
  const removeClient = useMutation(api.clients.deleteClient);
  return (
    <Card>
      <CardHeader className="px-7 flex flex-row justify-between items-center">
        <div>
          <CardTitle>Clients</CardTitle>
          <CardDescription>Clients you have added to the app</CardDescription>
        </div>
        <AddClientButton />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Date Added</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients && clients.length ? clients.map((client) => (
              <TableRow className="bg-accent" key={client._id}>
                <TableCell>
                  <div className="font-medium">{client.name}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {client.email}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {client.type}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  { moment(client._creationTime).format("MM/DD/YYYY h:m A")}
                </TableCell>
                <TableCell className="hidden md:table-cell">
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
                          onConfirm={() => removeClient({ id: client._id })}
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
            )) : (
              <TableRow className="bg-accent text-center">
                <TableCell colSpan={5}>No Client Added</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus, ServerCog } from "lucide-react";
import React from "react";
import SelectOption from "../SelectOption";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Option } from "@/lib/workflow/nodes/interface";
import { Input } from "@/components/ui/input";
import useWorkflow from "../store/workflow";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";

function NodeAuthentication() {
  const { user } = useUser();
  const { selectedNode, updateNodeData, getNodeInfo } = useWorkflow(
    (state) => ({
      selectedNode: state.selectedNode,
      updateNodeData: state.updateNodeData,
      getNodeInfo: state.getNodeInfo,
    })
  );
  const { icon: Icon, displayName, name } = getNodeInfo(selectedNode?.data.api!)!;

  const availableAuthentications = useQuery(
    api.authentication.getAuthenticationsByNode,
    {ownerId: user!.id, node: name }
  )??[];


  const selectedAuthentication = availableAuthentications.find(auth => auth._id === selectedNode!.data.authenticationId!);

  return (
    <AccordionItem value="authentication">
      <AccordionTrigger className="!no-underline !text-lg">
        Authentication
      </AccordionTrigger>
      <AccordionContent>
        <div className="shadow-md border-slate-300 border-[1px] p-4 rounded-md text-lg flex justify-between items-center">
          <div className="flex w-3/6 items-center gap-3">
            <span className="rounded-md border-2 p-2 border-slate-300">
              <Icon />
            </span>
            {selectedAuthentication ? (
              <div className="flex flex-col w-full">
                <span className="truncate text-sm">{selectedAuthentication.name}</span>
                <span className="truncate text-muted-foreground text-xs">{selectedAuthentication.accountName}</span>
              </div>
            ) : (
              <span>Connect {displayName}</span>
            )}
          </div>
          <div>
            <Popover>
              <PopoverTrigger>
                <Button>Change</Button>
              </PopoverTrigger>
              <PopoverContent>
                <Command>
                  <CommandInput placeholder="Search..." />

                  <CommandGroup>
                    {availableAuthentications.map((option) => (
                      <CommandItem
                        key={option._id}
                        value={option._id}
                        onSelect={(currentValue) => {
                          updateNodeData({ authenticationId: currentValue });
                        }}
                        className="p-3 my-2"
                      >
                        <Input
                          type="radio"
                          className={"mr-2 h-4 w-4"}
                          checked={
                            selectedNode?.data.authenticationId === option._id
                          }
                        />
                        <div>
                        {option.name}
                        <div className="text-muted-foreground text-xs">{option.accountName}</div>
                        </div>
                      </CommandItem>
                    ))}
                    <CommandItem
                      onSelect={() => {
                        // TODO: Open a new window and redirect user to authenticate a new account
                      }}
                     className=" text-center items-center justify-center shadow-md mt-5 p-2 gap-2">
                     <Plus className="text-muted-foreground" size={15} /> Connect a new account
                    </CommandItem>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default NodeAuthentication;

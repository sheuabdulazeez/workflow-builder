import React from "react";
import { Switch } from "../ui/switch";

function WorkflowHeader({ title, active }: { title: string; active: boolean }) {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 ">
      <nav className="text-lg font-medium flex flex-row items-center gap-5 w-100">
        <div className="flex items-center gap-2 text-lg font-semibold md:text-base">
          {title}
        </div>
        <Switch defaultChecked={active} />
      </nav>
    </header>
  );
}

export default WorkflowHeader;

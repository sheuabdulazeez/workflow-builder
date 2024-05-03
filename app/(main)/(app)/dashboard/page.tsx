import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

import { Input } from "@/components/ui/input";

export default function Dashboard() {
  return (
    <div>
      <div className="grid grid-flow-col gap-10">
        <Card className="sm:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Your Workflows</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed text-4xl">
              300
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>Create Workflow</Button>
          </CardFooter>
        </Card>
        <Card className="sm:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Your Clients</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed text-4xl">
              5,000
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>Create Client</Button>
          </CardFooter>
        </Card>
        <Card className="sm:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Your Tasks</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed text-4xl">
              100
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>Create Task</Button>
          </CardFooter>
        </Card>
      </div>
      <div></div>
    </div>
  );
}

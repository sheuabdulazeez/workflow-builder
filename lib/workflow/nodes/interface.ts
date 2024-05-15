import { IconJarLogoIcon } from "@radix-ui/react-icons";
import { Icon } from "lucide-react";

export enum EventType {
  trigger,
  action
}

export interface Option {
  label: string;
  value: string;
  icon?: typeof Icon,
  description?: string
}

export interface INodeType {
  readonly description?: INodeDescription;
  methods?: {
    loadOptions?: { [key: string]: (...args: any) => Promise<Option[]> };
  };
  execute?: (
    ...args: any
  ) => Promise<{ data: Record<string, any>[]; error?: Record<string, any>[] }>;
  poll?: (
    ...args: any
  ) => Promise<{ data: Record<string, any>[]; error?: Record<string, any>[] }>;
}

export interface INodeDescription {
  displayName: string;
  name: string;
  icon: typeof IconJarLogoIcon | typeof Icon;
  events?: INodeDescriptionEvent[];
  authentication?: {
    displayName: string;
    name: string;
    type: "oauth" | "api_key";
  };
  properties?: INodeDescriptionProperties[];
}

export interface INodeDescriptionEvent {
  displayName: string;
  name: string;
  type: EventType;
  description: string;
}

interface INodeDescriptionPropertyType {
  name: "textarea" | "string" | "number" | "boolean" | "choices";
  props?: {
    minValue?: number;
    maxValue?: number;
    password?: boolean;
    multiValues?: boolean
  };
}

export interface INodeDescriptionProperties {
  displayName: string;
  name: string;
  type: INodeDescriptionPropertyType;
  description: string;
  required: boolean;
  defaultValue: string | boolean | number;
  options?: Option[];
  optionsMethod?: string;
}

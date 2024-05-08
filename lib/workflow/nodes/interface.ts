import { Icon } from "lucide-react";

export interface INodeType {
    description: INodeDescription;
    methods?: {
        loadOptions?: { [key: string]: any }
    };
}


export interface INodeDescription {
    displayName: string;
    name: string;
    icon: typeof Icon
}
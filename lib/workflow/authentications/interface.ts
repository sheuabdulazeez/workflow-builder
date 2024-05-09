import { IconJarLogoIcon } from "@radix-ui/react-icons";
import { Icon } from "lucide-react";

export interface IAuthentication {
    readonly description: {
        displayName: string;
        name: string;
        icon: typeof IconJarLogoIcon | typeof Icon;
        type: "oauth" | "api_key"
    }
    
}
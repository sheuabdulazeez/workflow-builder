import { Parentheses } from "lucide-react";
import { IAuthentication } from "./interface";

export class GoogleAuthentication implements IAuthentication {
    description = {
        displayName: "Google",
        name: "google",
        type: "oauth" as any,
        icon: Parentheses,
    }



    
}
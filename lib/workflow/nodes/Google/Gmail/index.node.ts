import { Mail } from "lucide-react";
import { EventType, INodeDescription, INodeType } from "../../interface";
import { events } from "./events";

class Gmail implements INodeType {
    static description: INodeDescription = {
        displayName: "Gmail",
        name: "gmail",
        icon: Mail,
        events,
        authentication: {
            displayName: "Gmail",
            name: "google",
            type: "oauth"
        }
    };

    methods = {
        loadOptions: {
            async getFromEmails(arg: any){
                return []
            }
        }
    }





}

export default Gmail
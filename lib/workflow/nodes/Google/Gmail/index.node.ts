import { Mail } from "lucide-react";
import { EventType, INodeDescription, INodeType } from "../../interface";

class Gmail implements INodeType {
    static description: INodeDescription = {
        displayName: "Gmail",
        name: "gmail",
        icon: Mail,
        events: [
            {
                displayName: "Send Email",
                name: "send_email",
                type: EventType.action,
                description: "Create and send a new email",
            },
            {
                displayName: "Reply to Email",
                name: "reply_email",
                type: EventType.action,
                description: "Send a reply to an email"
            },
            {
                displayName: "Create Draft",
                name: "create_draft",
                type: EventType.action,
                description: "Create but do not send a new email"
            }
        ],
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
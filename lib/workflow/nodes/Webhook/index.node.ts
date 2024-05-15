import { WebhookIcon } from "lucide-react";
import { EventType, INodeDescription, INodeType } from "../interface";
import { GoogleAuthentication } from "../../authentications/google.authentication";

class Webhook implements INodeType {
    static description: INodeDescription = {
        displayName: "Webhook",
        name: "webhook",
        icon: WebhookIcon,
        events: [
            {
                displayName: "Catch Wehbook",
                name: "catch_wehbook",
                type: EventType.trigger,
                description: "Wait for a new GET, POST, PUT to a Webhook URL"
            },
            {
                displayName: "Send a webhook",
                name: "send_wehbook",
                type: EventType.action,
                description: "Wait for a new GET, POST, PUT to a Webhook URL"
            }
        ],
    };
}

export default Webhook
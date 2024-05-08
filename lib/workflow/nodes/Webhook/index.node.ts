import { WebhookIcon } from "lucide-react";
import { INodeType } from "../interface";

class Webhook implements INodeType {
    description = {
        displayName: "Webhook",
        name: "wehbook",
        icon: WebhookIcon
    };
}

export default Webhook

import { FileScan } from "lucide-react";
import { EventType, INodeDescription, INodeType } from "../interface";

class Stripe implements INodeType {
   static description: INodeDescription = {
        displayName: "Stripe",
        name: "stripe",
        icon: FileScan,
        events: [
            {
                displayName: "New Subscription",
                name: "new_subscription",
                type: EventType.trigger,
                description: "Triggers when a customer is signed up for a new plan."
            }
        ]
    };
}

export default Stripe
import Gmail from "./Google/Gmail/index.node";
import Sheet from "./Google/Sheet/index.node";
import Stripe from "./Stripe/index.node";
import Webhook from "./Webhook/index.node";
import { INodeDescription } from "./interface";

export const Nodes: INodeDescription[] = [
    Sheet.description,
    Gmail.description,
    Webhook.description,
    Stripe.description
];
import Gmail from "./Google/Gmail/index.node";
import Sheet from "./Google/Sheet/index.node";
import Stripe from "./Stripe/index.node";
import Webhook from "./Webhook/index.node";
import { INodeDescription, INodeType } from "./interface";

export const Services: INodeType[] = [
    Sheet,
    Gmail,
    Webhook,
    Stripe,
];

export const Nodes: INodeDescription[] = Services.map((service) => service.description!);


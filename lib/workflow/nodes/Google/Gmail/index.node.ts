import { Mail } from "lucide-react";
import { INodeDescription, INodeType } from "../../interface";

class Gmail implements INodeType {
    description = {
        displayName: "Gmail",
        name: "gmail",
        icon: Mail
    };
}

export default Gmail
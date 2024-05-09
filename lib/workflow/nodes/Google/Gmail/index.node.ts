import { Mail } from "lucide-react";
import { INodeType } from "../../interface";

class Gmail implements INodeType {
    description = {
        displayName: "Gmail",
        name: "gmail",
        icon: Mail
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
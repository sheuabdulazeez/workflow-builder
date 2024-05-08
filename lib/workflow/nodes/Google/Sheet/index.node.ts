import { SheetIcon } from "lucide-react";
import { INodeType } from "../../interface";

class Sheet implements INodeType {
    description = {
        displayName: "Sheet",
        name: "gsheet",
        icon: SheetIcon
    };


    async createSheet(){
        
    }
}

export default Sheet
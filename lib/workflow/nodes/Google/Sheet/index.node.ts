import { SheetIcon } from "lucide-react";
import { EventType, INodeDescription, INodeType } from "../../interface";

class Sheet implements INodeType {
    static description: INodeDescription = {
        displayName: "Sheet",
        name: "gsheet",
        icon: SheetIcon,
        events: [
            {
                displayName: "Create Spreadsheet",
                name: "create_spreadsheet",
                type: EventType.action,
                description: "Create a blank spreadsheet"
            },
            {
                displayName: "Create Worksheet",
                name: "create_worksheet",
                type: EventType.action,
                description: "Create a blank worksheet with title"
            }
        ],
        authentication: {
            name: "google",
            type: "oauth",
            displayName: "Sheet"
        }
    };
}

export default Sheet

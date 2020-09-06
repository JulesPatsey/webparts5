import { ITaskExternalReference } from "../../services/ITaskExternalReference";
import spservices from "../../services/spservices";
import { ITaskDetails } from "../../services/ITaskDetails";

export interface IAddLinkProps {
onDismiss?: (references:ITaskDetails) => void;
displayDialog: boolean;
taskDetails:ITaskDetails;
spservice: spservices;

}

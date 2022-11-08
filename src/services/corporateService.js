import { controllers } from "../config/controllers";
import httpRequest from "../utils/httpRequest";


export const approveCorporate = async (id) => {
    return await httpRequest(controllers.backOfficeController + "/Corporate/Approve/" + id);
  };
  
  export const declineCorporate = async (payload) => {
    return await httpRequest(controllers.backOfficeController + "/Corporate/Reject", "post", payload);
  };
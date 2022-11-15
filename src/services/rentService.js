import { controllers } from "../config/controllers";
import httpRequest from "../utils/httpRequest";

export const deleteRent = async (id) => {
  return await httpRequest(controllers.rentController + "/Delete/" + id, "delete");
};
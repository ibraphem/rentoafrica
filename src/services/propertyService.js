import { controllers } from "../config/controllers";
import httpRequest from "../utils/httpRequest";

export const createProperty = async (payload) => {
    return await httpRequest(controllers.propertyController + "/Create", "post", payload);
  };

export const approveProperty = async (id) => {
  return await httpRequest(controllers.backOfficeController + "/Property/Approve/" + id);
};

export const declineProperty = async (payload) => {
  return await httpRequest(controllers.backOfficeController + "/Property/Reject", "post", payload);
};

export const propertyDetail = async (id) => {
  return await httpRequest(controllers.listingController + "/PropertyDetails/" + id);
};
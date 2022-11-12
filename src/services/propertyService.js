import { controllers } from "../config/controllers";
import httpRequest from "../utils/httpRequest";

export const createProperty = async (payload) => {
    return await httpRequest(controllers.propertyController + "/Create", "post", payload);
  };

  export const editProperty = async (payload) => {
    return await httpRequest(controllers.propertyController + "/edit", "put", payload);
  };

  export const deleteProperty = async (id) => {
    return await httpRequest(controllers.propertyController + "/delete/" + id, "delete");
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

export const propertyDetail2 = async (id) => {
  return await httpRequest(controllers.propertyController + "/Details/" + id);
};
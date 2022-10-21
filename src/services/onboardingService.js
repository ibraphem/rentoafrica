import { controllers } from "../config/controllers";
import httpRequest from "../utils/httpRequest";

export const onboardTenant = async (payload) => {
    return await httpRequest(controllers.authController + "/Onboarding", "post", payload);
  };

  export const onboardAgent = async (payload) => {
    return await httpRequest(controllers.authController + "/AgentOnboarding", "post", payload);
  };

  export const onboardCorporate = async (payload) => {
    return await httpRequest(controllers.authController + "/CorporateOnboarding", "post", payload);
  };

  export const login = async (payload) => {
    return await httpRequest(controllers.authController + "/Login", "post", payload);
  };

  export const verifyEmail = async (token) => {
    return await httpRequest(controllers.authController + `/ConfirmEmailToken/${token}`);
  };

  export const forgotPassword = async (email) => {
    return await httpRequest(controllers.authController + `/ForgotPassword?email=${email}`);
  };
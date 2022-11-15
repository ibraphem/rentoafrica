import { Switch } from "react-router";
import AgentDashboard from "../screens/agents/AgentDashboard";
import "../assets/scss/dashlite.scss";
import "../assets/scss/style-email.scss";
import AddRentApartment from "../screens/agents/AddRentApartment";
import { useSelector } from "react-redux";
import AgentTransactions from "../screens/agents/AgentTransactions";
import ApartmentListing from "../screens/agents/ApartmentListing";
import GatewayRoute from "./GatewayRoute";
import AdminDashboard from "../screens/admin/AdminDashboard";
import Apartments from "../screens/admin/Apartments";
import AvailableApartments from "../screens/AvailableApartments";
import CorporateList from "../screens/corporate/CorporateList";
import AgentRentDetails from "../screens/agents/AgentRentDetails";
import RentRequest from "../screens/agents/RentRequest";

const ProtectedRoutes = () => {
  const role = useSelector((state) => state.user?.user?.role)

  return (
    <Switch>
      <GatewayRoute path="/dashboard" component={role === "Agent" ? AgentDashboard : AdminDashboard} roles={["User", "Admin", "Corporate"]}/>
      <GatewayRoute path="/new-apartment" component={AddRentApartment} roles={["User"]} />
      <GatewayRoute path="/transactions" component={AgentTransactions} roles={["User"]}  />
      <GatewayRoute path="/apartment-listing" component={ApartmentListing} roles={["User"]} />
      <GatewayRoute path="/apartment/:status" component={Apartments} roles={["Admin"]} />
      <GatewayRoute path="/corporate/:status" component={CorporateList} roles={["Admin"]} />
      <GatewayRoute path="/apartmentdetails/:propertyId" component={AgentRentDetails} roles={["User", "Admin"]} />
      <GatewayRoute path="/apartmentedit/:propertyId" component={AddRentApartment} roles={["User", "Admin"]} />
      <GatewayRoute path="/apartments" component={AvailableApartments} roles={["Corporate", "User"]} />
      <GatewayRoute path="/rent-request" component={RentRequest} roles={["User"]} />
      
    </Switch> 
  );
};

export default ProtectedRoutes;

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

const ProtectedRoutes = () => {
  const role = useSelector((state) => state.user?.user?.role)

  return (
    <Switch>
      <GatewayRoute path="/dashboard" component={role === "Agent" ? AgentDashboard : AdminDashboard} roles={["Agent", "Admin", "Corporate"]}/>
      <GatewayRoute path="/new-apartment" component={AddRentApartment} roles={["Agent"]} />
      <GatewayRoute path="/transactions" component={AgentTransactions} roles={["Agent"]}  />
      <GatewayRoute path="/apartment-listing" component={ApartmentListing} roles={["Agent"]} />
      <GatewayRoute path="/apartment/:status" component={Apartments} roles={["Admin"]} />
      <GatewayRoute path="/corporate/:status" component={CorporateList} roles={["Admin"]} />
      <GatewayRoute path="/apartments" component={AvailableApartments} roles={["Corporate"]} />
    </Switch> 
  );
};

export default ProtectedRoutes;

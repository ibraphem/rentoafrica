import { Route, Switch, Redirect } from "react-router";
import AgentDashboard from "../screens/agents/AgentDashboard";
import "../assets/scss/dashlite.scss";
import "../assets/scss/style-email.scss";
import AddRentApartment from "../screens/agents/AddRentApartment";
import { useSelector } from "react-redux";
import AgentTransactions from "../screens/agents/AgentTransactions";
import ApartmentListing from "../screens/agents/ApartmentListing";
import GatewayRoute from "./GatewayRoute";

const ProtectedRoutes = () => {
  const user = useSelector((state) => state.user?.user)
  
  return (
    <Switch>
      <Route
        exact
        path="/dashboard"
        render={() => {
          return user?.token ? <AgentDashboard/> : <Redirect to="/login" />;
        }}
      />
      <GatewayRoute exact path="/new-apartment" component={AddRentApartment} />
      <GatewayRoute exact path="/transactions" component={AgentTransactions} />
      <GatewayRoute exact path="/apartment-listing" component={ApartmentListing} />
    </Switch>
  );
};

export default ProtectedRoutes;

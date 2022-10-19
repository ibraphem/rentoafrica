import { Route, Switch, Redirect } from "react-router";
import AgentDashboard from "../screens/AgentDashboard";
import "../assets/scss/dashlite.scss";
import "../assets/scss/style-email.scss";
import AddRentApartment from "../screens/AddRentApartment";
import { useSelector } from "react-redux";

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
      {/* <Route exact path="/dashboard" component={AgentDashboard} /> */}
      <Route exact path="/new-apartment" component={AddRentApartment} />
    </Switch>
  );
};

export default ProtectedRoutes;

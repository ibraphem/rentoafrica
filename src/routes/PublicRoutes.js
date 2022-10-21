import { Route, Switch, Redirect } from "react-router";
import "../assets/css/publicStyles/app.css";
import AgentRegister from "../screens/agents/AgentRegister";
import CorporateRegister from "../screens/CorporateRegister";
import FavouriteApartment from "../screens/FavouriteApartment";
import Home from "../screens/Home";
import Login from "../screens/Login";
import RentDetail from "../screens/RentDetail";
import EmailVerification from "../screens/EmailVerification";
import { useSelector } from "react-redux";

const PublicRoutes = () => {
    const token = useSelector((state) => state.user?.user?.token)
  return (
    <Switch>
      <div className="wrapper">
      <Route
        exact
        path="/login"
        render={() => {
          return token ? <Redirect to="/dashboard" /> : <Login/>;
        }}
      />
        <Route exact path="/" component={Home} />
        {/* <Route exact path="/login" component={Login} /> */}
        <Route exact path="/favorites" component={FavouriteApartment} />
        <Route exact path="/details/:id" component={RentDetail} />
        <Route exact path="/register/agent" component={AgentRegister} />
        <Route exact path="/register/corporate" component={CorporateRegister} />
        <Route exact path="/confirm/:code" component={EmailVerification} />
      </div>
    </Switch>
  );
};

export default PublicRoutes;

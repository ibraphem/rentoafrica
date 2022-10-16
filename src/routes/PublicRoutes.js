import { Route, Switch } from "react-router";
import "../assets/css/publicStyles/app.css"
import AgentRegister from "../screens/AgentRegister";
import CorporateRegister from "../screens/CorporateRegister";
import EmailVerification from "../screens/EmailVerification";
import FavouriteApartment from "../screens/FavouriteApartment";
import Home from "../screens/Home";
import Login from "../screens/Login";
import RentDetail from "../screens/RentDetail";

const PublicRoutes = () => {
    return (
        <Switch>
        <div className='wrapper'>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/favorites" component={FavouriteApartment}/>
            <Route exact path="/details/:id" component={RentDetail}/>
            <Route exact path="/register/agent" component={AgentRegister}/>
            <Route exact path="/confirm/:code" component={EmailVerification}/>
            
        </div>
        </Switch>
    );
};

export default PublicRoutes;
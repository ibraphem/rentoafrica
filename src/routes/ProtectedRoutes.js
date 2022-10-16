import { Route, Switch } from 'react-router';
import AgentDashboard from '../screens/AgentDashboard';
import "../assets/scss/dashlite.scss"
import "../assets/scss/style-email.scss"
import AddRentApartment from '../screens/AddRentApartment';


const ProtectedRoutes = () => {
    return (
        <Switch>
            <Route exact path="/dashboard" component={AgentDashboard}/>
            <Route exact path="/new-apartment" component={AddRentApartment}/>
        </Switch>
    );
};

export default ProtectedRoutes;
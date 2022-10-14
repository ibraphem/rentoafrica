import { Route, Switch } from 'react-router';
import AgentDashboard from '../screens/AgentDashboard';
import "../assets/scss/dashlite.scss"
import "../assets/scss/style-email.scss"


const ProtectedRoutes = () => {
    return (
        <Switch>
            <Route exact path="/dashboard" component={AgentDashboard}/>
        </Switch>
    );
};

export default ProtectedRoutes;
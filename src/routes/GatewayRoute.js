import { Route, Redirect } from 'react-router-dom';

const GatewayRoute = ({ component: Component, ...rest }) => {
    const user = localStorage.getItem('user');

    return (
        <Route {...rest} render={props => {
            if(user) {
                return <Component {...rest} {...props} />
            } else {
                return <Redirect to={
                    {
                        pathname: '/',
                    }
                } />
            }
        }} />
    );
};

export default GatewayRoute;

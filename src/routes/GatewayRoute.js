import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const GatewayRoute = ({ component: Component, ...rest }) => {
    const token = useSelector((state) => state.user?.user?.token)

    return (
        <Route {...rest} render={props => {
            if(token) {
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

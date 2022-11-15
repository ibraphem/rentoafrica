import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Error from '../layout/error/Error';
import Layout from '../layout/Index';
import { loginRedirect } from '../redux/slices/pageSlice';

const GatewayRoute = ({ component: Component, roles, ...rest }) => {
    const user = useSelector((state) => state.user?.user)
    const dispatch = useDispatch()

    return (
        <Route exact {...rest} render={props => {
            dispatch(loginRedirect(props.location.pathname))
            if(user?.token) {
                if(roles?.includes(user?.role)) {
                    return (
                        <Layout>
                        <Component {...rest} {...props} />
                        </Layout>
                    )
                }else{
                  return  <Error errorCode="419" errorTitle="Illegal Route" errorDesc="OOps, looks like you are not expected to be here. If you think this message is an error, please contact the system administrator." redir="/login"/>
                }
               
            } else {
                return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            }
        }} />
    );
};

export default GatewayRoute;

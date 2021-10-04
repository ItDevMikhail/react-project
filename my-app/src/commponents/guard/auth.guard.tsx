import { useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { useHttp } from '../../hooks/http.hook';


const AuthGaurd = ({ children }: any) => {
    const {auth} = useHttp();
    const history = useHistory();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname !== '/login' && location.pathname !== '/register' && !auth) {
            history.push("/register");
        }
        console.log(location);
    }, [location, auth, history]);
    return children;
}

const RootGaurd = ({ children }: any) => {
    return <AuthGaurd>{children}</AuthGaurd>;
};

export default RootGaurd;

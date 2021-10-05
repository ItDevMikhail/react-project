import { useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";


const AuthGaurd = ({ children, check }: any) => {
    const history = useHistory();
    const location = useLocation();
    useEffect(() => {
        const auth = check();
        if (location.pathname !== '/login' && location.pathname !== '/register' && !auth) {
            history.push("/login");
        }
    }, [location]);
    return children;
}
const RootGaurd = ({ children, logged }: any) => {
    return <AuthGaurd check={logged}>{children}</AuthGaurd>;
};

export default RootGaurd;

import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
    let cookieData;

    try {
        cookieData = JSON.parse(Cookies.get("cookieData") || '{}');
    } catch (error) {
        cookieData = {};
    }

    if (!cookieData || Object.keys(cookieData).length === 0) {
        return <Navigate to="/signin" />;
    }

    return children;
};

export default ProtectedRoute;

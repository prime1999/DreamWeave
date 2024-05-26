import { useAdminAuthStatus } from "@/hooks/useAuthStatus";
import { Navigate, Outlet } from "react-router-dom";

const PrivateAdminRoutes = () => {
	const { isLoggedIn, checkingStatus } = useAdminAuthStatus();

	if (checkingStatus) {
		return <h3>Loading...</h3>;
	}
	return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateAdminRoutes;

import { useUserAuthStatus } from "@/hooks/useAuthStatus";
import { Navigate, Outlet } from "react-router-dom";

const PrivateUserRoutes = () => {
	const { isLoggedIn, checkingStatus } = useUserAuthStatus();

	if (checkingStatus) {
		return <h3>Loading...</h3>;
	}
	return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateUserRoutes;

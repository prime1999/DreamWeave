import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useUserAuthStatus = () => {
	const [checkingStatus, setCheckingStatus] = useState<boolean>(true);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	const { userInfo } = useSelector((state: any) => state.auth);

	useEffect(() => {
		if (userInfo) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
		setCheckingStatus(false);
	}, [userInfo]);
	return { isLoggedIn, checkingStatus };
};

export const useAdminAuthStatus = () => {
	const [checkingStatus, setCheckingStatus] = useState<boolean>(true);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	const { userInfo } = useSelector((state: any) => state.auth);

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
		setCheckingStatus(false);
	}, [userInfo]);
	return { isLoggedIn, checkingStatus };
};

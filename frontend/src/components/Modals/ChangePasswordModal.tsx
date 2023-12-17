import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useUpdateUserMutation } from "@/slices/UserSlice";
import { setCredentials } from "@/slices/AuthSlice";

type Props = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type passwordType = {
	oldPassword: string;
	newPassword: string;
};

const ChangePasswordModal = ({ open, setOpen }: Props) => {
	const dispatch = useDispatch();
	const [updateUser, { isLoading: passwordLoading }] = useUpdateUserMutation(
		{}
	);
	// state for the password
	const [passwordState, setPassowrdState] = useState<passwordType>({
		oldPassword: "",
		newPassword: "",
	});

	// get the values of the state
	const { oldPassword, newPassword } = passwordState;
	// state to hide and show te password been inputted
	const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
	const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

	// function to handle the change event on te input in the form
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// set the input fields to the value that is been inputted
		setPassowrdState((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	// function to update the password
	const updateUserPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const password = {
				oldPassword,
				newPassword,
			};
			// send the reuest to update the user's password to the backend and get the response
			const res = await updateUser({ password }).unwrap();
			// set the credentials in the redux and local storage to be the updated user's info
			dispatch(setCredentials({ ...res }));
			// show the success message once the update is completed successfully
			toast.success("Password updated", {
				className: "bg-green-200",
				bodyClassName: "text-black font-poppins font-semibold",
				progressClassName: "bg-transparent",
			});
		} catch (err: any) {
			// show the error message once there is an error when updating the password
			toast.error(err?.data?.error, {
				className: "bg-red-200",
				bodyClassName: "text-black",
				progressClassName: "bg-transparent",
			});
		}
	};
	return (
		<>
			<div>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger className="w-full"></DialogTrigger>
					<DialogContent className="h-[250px] rounded-lg shadow-light text-black  overflow-y-auto md:w-[500px]">
						<DialogHeader>
							<DialogTitle className="mb-2 text-center font-bold">
								<h4>Change Password</h4>
							</DialogTitle>
							<hr />
							<DialogDescription className="text-black">
								<form className="mt-4">
									<div className="relative">
										<input
											type={showOldPassword ? "text" : "password"}
											placeholder="Enter current password"
											id="oldPassword"
											value={oldPassword}
											onChange={(e) => handleChange(e)}
											className="bg-light rounded-md px-4 py-2 mb-4 w-full focus:outline-none"
										/>
										<span
											onClick={() => setShowOldPassword(!showOldPassword)}
											className="absolute top-3 right-4 text-blue hover:cursor-pointer"
										>
											{showOldPassword ? <FaEyeSlash /> : <FaEye />}
										</span>
									</div>
									<div className="relative">
										<input
											type={showNewPassword ? "text" : "password"}
											placeholder="Enter new password"
											id="newPassword"
											value={newPassword}
											onChange={(e) => handleChange(e)}
											className="bg-light rounded-md px-4 py-2 mb-4 w-full focus:outline-none"
										/>
										<span
											onClick={() => setShowNewPassword(!showNewPassword)}
											className="absolute top-3 right-4 text-blue hover:cursor-pointer"
										>
											{showNewPassword ? <FaEyeSlash /> : <FaEye />}
										</span>
									</div>
									<button
										onClick={updateUserPassword}
										disabled={passwordLoading}
										className={`flex items-center justify-center w-full text-center py-2 text-light font-poppins font-semibold ${
											passwordLoading
												? "bg-other hover:shadow-none"
												: "bg-blue hover:shadow-blue"
										} rounded-md duration-500 hover:shadow-md`}
									>
										{passwordLoading && <span className="btnLoader"></span>}Save
										Changes
									</button>
								</form>
								<DialogClose asChild></DialogClose>
							</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</div>
		</>
	);
};

export default ChangePasswordModal;

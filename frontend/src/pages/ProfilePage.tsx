import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdEdit } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useGetUserOrderQuery } from "@/slices/OrderSlice";
import { useUpdateUserMutation } from "@/slices/UserSlice";
import { columns } from "@/components/table/Columns";
import { DataTable } from "@/components/table/TableData";
import Loader from "@/components/Loader";
import { setCredentials } from "@/slices/AuthSlice";
import { toast } from "react-toastify";
import ChangePasswordModal from "@/components/Modals/ChangePasswordModal";

const ProfilePage = () => {
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state: any) => state.auth);
	// state for name, email and password
	const [name, setName] = useState<string>(userInfo.name);
	const [email, setEmail] = useState<string>(userInfo.email);
	const [password, setPassowrd] = useState<string>("13456778");
	// state for the phone number value
	const [value, setValue] = useState<string>(userInfo.phoneNumber);
	// state to on and off edit mode
	const [edit, setEdit] = useState<boolean>(false);
	// state to open change password modal
	const [open, setOpen] = useState<boolean>(false);
	// get the current user's orders
	const {
		data: orders,
		isLoading: loadingOrder,
		refetch,
	} = useGetUserOrderQuery({});
	const [updateUser, { isLoading: userLoading }] = useUpdateUserMutation({});

	// function to handle the user update
	const handleUserUpdate = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const updateDetails = {
				name,
				email,
				phoneNumber: value,
			};
			const res = await updateUser(updateDetails).unwrap();
			dispatch(setCredentials({ ...res }));
			setEdit(false);
			// show a success message
			toast.success("welcome to DreamWeave", {
				className: "bg-green-200",
				bodyClassName: "text-black font-poppins font-semibold",
				progressClassName: "bg-transparent",
			});
		} catch (error) {
			toast.error("try again", {
				className: "bg-red-200",
				bodyClassName: "text-black",
				progressClassName: "bg-transparent",
			});
		}
	};

	return (
		<>
			{userLoading ? (
				<Loader />
			) : (
				<>
					<div className="w-11/12 mx-auto md:w-9/12">
						<div className="flex items-start">
							<div className="relative w-24">
								<img src={userInfo.pic} alt="" className="rounded-full" />
								<MdEdit className="absolute bottom-3 right-0 text-xl bg-light text-blue p-1 w-6 h-6 rounded-full hover:cursor-pointer" />
							</div>
							<div className="w-2/3 ml-4 font-poppins md:ml-12">
								<div className="flex items-end justify-end hover:cursor-pointer">
									<FiEdit onClick={() => setEdit(!edit)} />
								</div>

								<form className="w-full">
									<div className="flex flex-col">
										<label className="text-blue">Name</label>
										<input
											type="text"
											value={name}
											onChange={(e) => setName(e.target.value)}
											className={`border h-10 px-4 rounded-md focus:outline-none ${
												!edit ? "bg-light" : "bg-transparent"
											}`}
											disabled={!edit}
											id="name"
										/>
									</div>
									<div className="flex flex-col my-4">
										<label className="text-blue">Email</label>
										<input
											type="email"
											value={email}
											onChange={(e) => setName(e.target.value)}
											className={`border h-10 px-4 rounded-md focus:outline-none ${
												!edit ? "bg-light" : "bg-transparent"
											}`}
											disabled={!edit}
											id="email"
										/>
									</div>
									<div>
										<label className="text-blue">Phone-Number</label>
										<PhoneInput
											className={`custom-phone-input mb-4 rounded-md py-2 px-4 bg-transparent border border-gray-200 focus:outline-none ${
												!edit ? "bg-light" : "bg-transparent"
											}`}
											disabled={!edit}
											id="number"
											placeholder="Enter phone number"
											value={value}
											international={true}
											onChange={(newValue) => setValue(newValue as string)}
										/>
									</div>
									<div className="relative flex flex-col my-4">
										<label className="text-blue">Password</label>

										<input
											type="password"
											value={password}
											className="border h-10 px-4 rounded-md focus:outline-none bg-light"
											disabled={true}
											id="password"
										/>

										{edit && (
											<div className="absolute top-8 right-1">
												<span
													onClick={() => setOpen(true)}
													className="w-48 px-2 rounded-md bg-red-600 text-sm mt-4 py-2 text-light duration-500 hover:cursor-pointer hover:bg-red-700"
												>
													Change password
												</span>
											</div>
										)}
									</div>
									{edit && (
										<button
											onClick={handleUserUpdate}
											className="w-full py-2 bg-light text-blue font-semibold rounded-md duration-500 hover:bg-other"
										>
											Save Changes
										</button>
									)}
								</form>
							</div>
						</div>
						{/* -------------------- orders ------------------------ */}
						<div className="font-poppins mt-4">
							{loadingOrder ? (
								<Loader />
							) : (
								<>
									<div className="container mx-auto py-10">
										<h4 className="text-3xl text-blue font-semibold">
											My Orders
										</h4>
										<DataTable columns={columns} data={orders} />
									</div>
								</>
							)}
						</div>
					</div>
				</>
			)}
			{open && <ChangePasswordModal open={open} setOpen={setOpen} />}
		</>
	);
};

export default ProfilePage;

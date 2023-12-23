import Loader from "@/components/Loader";
import { columns } from "@/components/table/UsersTable/Columns";
import { DataTable } from "@/components/table/UsersTable/TableData";
import { useGetUsersQuery } from "@/slices/UserSlice";

const UsersPage = () => {
	const { data, isLoading } = useGetUsersQuery({});
	return (
		<div className="w-10/12 mx-auto mt-8">
			<h4 className="font-bold text-3xl text-blue">Active Users</h4>
			{isLoading ? <Loader /> : <DataTable columns={columns} data={data} />}
		</div>
	);
};

export default UsersPage;

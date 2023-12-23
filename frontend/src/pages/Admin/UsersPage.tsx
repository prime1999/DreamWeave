import Loader from "@/components/Loader";
import { columns } from "@/components/table/UsersTable/Columns";
import { DataTable } from "@/components/table/UsersTable/TableData";
import { useGetUsersQuery } from "@/slices/UserSlice";

const UsersPage = () => {
	const { data, isLoading } = useGetUsersQuery({});
	return (
		<div className="w-10/12 mx-auto">
			{isLoading ? <Loader /> : <DataTable columns={columns} data={data} />}
		</div>
	);
};

export default UsersPage;

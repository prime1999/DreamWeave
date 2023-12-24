import { Skeleton } from "@/components/ui/skeleton";

const UserPageCardsSkeleton = () => {
	return (
		<>
			<div className="w-11/12 mx-auto h-96 flex flex-col items-center p-2 mt-8 text-black md:flex-row md:w-full lg:w-11/12">
				<Skeleton className="flex flex-col items-center justify-center h-full p-4 rounded-md w-full bg-other md:w-1/2 lg:w-1/3" />
				<div className="w-full h-full mt-4 md:mt-0 md:ml-4">
					<div className="flex flex-col items-center h-1/2 md:flex-row">
						<Skeleton className="w-full h-full bg-other rounded-md p-8 md:p-4 md:w-1/2 lg:p-8" />
						<Skeleton className="w-full h-full bg-other rounded-md mt-4 p-8 md:ml-4 md:p-4 md:w-1/2 md:mt-0 lg:p-8" />
					</div>
					<div className="mt-2 w-full h-1/2 flex flex-col justify-between md:flex-row">
						<Skeleton className="bg-other p-8 rounded-md w-full h-full md:w-1/2 md:p-4 lg:p-8" />
						<Skeleton className="mt-4 bg-other w-full h-full p-8 rounded-md md:ml-4 md:mt-0 md:w-1/2 md:p-4 lg:p-8" />
					</div>
				</div>
			</div>
		</>
	);
};

export default UserPageCardsSkeleton;

import { Skeleton } from "@/components/ui/skeleton";

const SingleProductSkeleton = () => {
	return (
		<div className="container mx-auto">
			<Skeleton className="w-[900px] h-[50px] mb-8" />
			<div className="flex flex-col justify-between items-center container mx-auto md:flex-row">
				<div className="w-[200px] md:w-[300px] lg:w-[500px]">
					<Skeleton className="w-full h-[200px]" />
				</div>
				<div className="w-[500px] h-[380px] mt-4 md:ml-4 md:mt-0">
					<Skeleton className="max-w-full h-[60px] mx-auto" />
					<Skeleton className="w-full h-[120px] mt-4 rounded-md" />
					<Skeleton className="w-1/3 h-[30px] mt-4" />
					<Skeleton className="w-full h-[80px] mt-4" />
					<Skeleton className="w-2/3 h-[80px] mt-4" />
					<Skeleton className="w-full h-[80px] mt-2" />
					<Skeleton className="w-full h-[150px] mt-4" />
				</div>
			</div>
		</div>
	);
};

export default SingleProductSkeleton;

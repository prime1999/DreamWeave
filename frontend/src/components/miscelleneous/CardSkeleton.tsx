import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => {
	return (
		<div className="w-[300px] h-[380px] mb-16">
			<Skeleton className="w-full h-[250px]" />
			<Skeleton className="w-full h-[60px] mt-4 mx-auto" />
			<Skeleton className="w-1/2 h-[30px] mt-4" />
			<Skeleton className="w-1/2 h-[30px] mt-4 rounded-full" />
		</div>
	);
};

export default CardSkeleton;

import { Skeleton } from "@/components/ui/skeleton";
import CardSkeleton from "./CardSkeleton";

const HomePageSkeleton = () => {
	return (
		<div className="w-[88vw] h-[1800px]">
			<div className="flex justify-between">
				{[...Array(5)].map((_, i) => (
					<div
						key={i}
						className="flex flex-col items-center justify-center gap-2 w-[150px] h-[380px] mb-16"
					>
						<Skeleton className="w-full h-[150px] rounded-full" />
						<Skeleton className="w-full h-[30px] mt-4" />
						<Skeleton className="w-1/2 h-[30px] mt-4 rounded-full" />
					</div>
				))}
			</div>
			<div className="-mt-16 mx-auto grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{[...Array(12)].map((_, i) => (
					<div key={i}>
						<CardSkeleton />
					</div>
				))}
			</div>
		</div>
	);
};

export default HomePageSkeleton;

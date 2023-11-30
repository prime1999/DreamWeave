import { Skeleton } from "@/components/ui/skeleton";

const ProductImgSkeleton = () => {
	return (
		<div className="max-w-[500px]">
			<Skeleton className="w-full h-[200px] rounded-md" />
		</div>
	);
};

export default ProductImgSkeleton;

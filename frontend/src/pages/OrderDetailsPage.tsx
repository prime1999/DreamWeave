import { useParams } from "react-router-dom";
import { useGetAnOrderQuery } from "@/slices/OrderSlice";

const OrderDetailsPage = () => {
	const params = useParams();
	console.log(params);
	const { orderId } = params;
	console.log({ orderId });

	const { data, isLoading } = useGetAnOrderQuery({ orderId });
	console.log(isLoading);
	if (!isLoading) {
		console.log(data);
	}
	return <div>{data && data[0]._id}</div>;
};

export default OrderDetailsPage;

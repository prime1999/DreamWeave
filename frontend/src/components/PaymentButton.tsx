import { useEffect } from "react";
import { toast } from "react-toastify";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
//import { PayPalButtonsComponentProps } from "@paypal/paypal-js/types/components/buttons";
import { usePayOrderMutation } from "@/slices/OrderSlice";

type Props = {
	order: any;
	refetch: any;
};

const PaymentButton = ({ order, refetch }: Props) => {
	const [payOrder] = usePayOrderMutation();

	const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
	// useEffect(() => {

	// }, []);

	const onApprove = (data: any, actions: any) => {
		console.log(4546);
		return actions.order.capture().then(async function (details: any) {
			try {
				console.log(123);
				await payOrder({ orderId: order._id, details });
				refetch();
				console.log(99);
				toast.success("Order is paid");
			} catch (err: any) {
				toast.error(err?.data?.message || err.error);
				console.log(err);
			}
		});
	};

	const onError = (err: any) => {
		toast.error(err.message);
		console.log(err.message);
	};
	const createOrder = (data: any, actions: any) => {
		return actions.order
			.create({
				purchase_units: [
					{
						amount: { value: order.totalAmount },
					},
				],
			})
			.then((orderID: string) => {
				return orderID;
			});
	};

	return (
		<>
			{isPending && <h2>Loading paypal button ...</h2>}
			<PayPalButtons
				className="w-full"
				createOrder={createOrder}
				onApprove={onApprove}
				onError={onError}
			/>
		</>
	);
};
export default PaymentButton;

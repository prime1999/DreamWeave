import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
//import { PayPalButtonsComponentProps } from "@paypal/paypal-js/types/components/buttons";
import { usePayOrderMutation } from "@/slices/OrderSlice";

type Props = {
	order: any;
	refetch: any;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PaymentButton = ({ setOpen, order, refetch }: Props) => {
	const navigate = useNavigate();
	const [payOrder] = usePayOrderMutation();

	const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

	const onApprove = (data: any, actions: any) => {
		return actions.order.capture().then(async function (details: any) {
			try {
				await payOrder({ orderId: order._id, details });
				refetch();
				setOpen(false);
				toast.success("Order is paid");
				navigate("/account");
			} catch (err: any) {
				toast.error(err?.data?.message || err.error);
			}
		});
	};

	const onError = (err: any) => {
		toast.error(err.message);
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

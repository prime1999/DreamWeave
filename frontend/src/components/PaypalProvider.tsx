import React, { useEffect, useState } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useGetPayPalClientIdQuery } from "@/slices/OrderSlice";
import PaymentButton from "./PaymentButton";

type Props = {
	order: any;
	refetch: any;
};

const PaypalProvider: React.FC<Props> = ({ order, refetch }: Props) => {
	// const [payPalScriptOptions, setPayPalScriptOptions] = useState<any>({});
	// const {
	// 	data: paypal,
	// 	isLoading: paypalLoading,
	// 	error: paypalError,
	// } = useGetPayPalClientIdQuery({});

	// useEffect(() => {
	// 	if (!paypalLoading && !paypalError && paypal.clientId) {
	// 		console.log(paypal.clientId);

	// 		setPayPalScriptOptions({
	// 			"client-id": paypal.clientId,
	// 			currency: "USD",
	// 		});
	// 	}
	// }, [paypalLoading, paypalError, paypal?.clientId]);

	return (
		<PayPalScriptProvider
			options={{
				clientId:
					"AaUm8f_Ut40PpLrZhxY0xarBMX5LNRwwGOFOjkRIKFUcAjof8Bxv4a6qFFPiweJ8n9Z3uHVkcvIRhr9v",
				currency: "USD",
			}}
		>
			<PaymentButton order={order} refetch={refetch} />
		</PayPalScriptProvider>
	);
};

export default PaypalProvider;

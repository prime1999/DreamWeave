import dotenv from "dotenv";
dotenv.config();

const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET, PAYPAL_API_URL } = process.env;

// ------------------- function to fetch the access token from the paypal API ----------------------- //
export const getPayPalAccessToken = async () => {
	// Authorization header requires base64 encoding
	const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_APP_SECRET).toString(
		"base64"
	);
	// create the url to fetch the access token from
	const url = `${PAYPAL_API_URL}/v1/oauth2/token`;
	// define the request headers
	const headers = {
		Accept: "application/json",
		"Accept-Language": "en_US",
		Authorization: `Basic ${auth}`,
	};
	// define the body (the grant_type to be client_credetials)
	const body = "grant_type=client_credentials";
	// fecth the access token
	const response = await fetch(url, {
		method: "POST",
		headers,
		body,
	});
	// if the access token was not gotten
	if (!response.ok) throw new Error("Failed to get access token");
	// if the access token waws gotten then return it
	const paypalData = await response.json();

	return paypalData.access_token;
};

// ----------------------- function to check if the order is a new order ---------------------- //
export const checkIfNewTransaction = async (
	orderModel,
	paypalTransactionId
) => {
	try {
		// find the order that has the same payment result id has the payPalTransaction id
		const orders = await orderModel.find({
			"paymentResult.id": paypalTransactionId,
		});
		// if tere is such order the the ordder is a new transaction
		return orders.length === 0;
	} catch (error) {
		throw new Error(error);
	}
};

// ------------------------- function to verify a payment using the paypal API url ------------------------ //
export const verifyPayPalPayment = async (paypalTransactionId) => {
	// get the accesstoken from the getPayPalAccessToken function above
	const accessToken = await getPayPalAccessToken();
	// send the request to verify the payment
	const paypalResponse = await fetch(
		`${PAYPAL_API_URL}/v2/checkout/orders/${paypalTransactionId}`,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);
	// if the response status is not a 200 (ok), then:
	if (!paypalResponse.ok) throw new Error("Failed to verify payment");
	// if it is, et the paypal data by awaiting on the paypal response json object
	const paypalData = await paypalResponse.json();
	// return the data status as completed and also the amount paid
	return {
		verified: paypalData.status === "COMPLETED",
		value: paypalData.purchase_units[0].amount.value,
	};
};

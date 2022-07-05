import axios from "axios";
import { SERVER_URL } from "config/config";

export default async function displayRazorpay(
	name,
	email,
	contact,
	products,
	cb
) {
	const { data } = await axios.post(`${SERVER_URL}/razorpay`, {
		products: JSON.stringify(products),
	});

	const options = {
		key: "rzp_test_4Nx5Ado2yV3Au0",
		currency: data.currency,
		amount: data.amount,
		name: "ASR Interiors",
		description: `Payment transaction for your order.`,
		image: `${SERVER_URL}/logo.png`,
		order_id: data.id,
		handler: function () {
			cb({ paymentStatus: true });
		},
		prefill: {
			name,
			email,
			contact,
		},
	};

	const paymentObject = new window.Razorpay(options);
	paymentObject.open();
}

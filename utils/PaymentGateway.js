import axios from "axios";
import { CLIENT_URL, SERVER_URL } from "config/config";

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
		key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
		currency: data.currency,
		amount: data.amount,
		name: "ASR Interiors",
		description: `Payment transaction for your order.`,
		image: `${CLIENT_URL}/logo.png`,
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

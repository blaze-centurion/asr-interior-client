import { numberWithCommas } from "@/components/CartProductItem";
import { SERVER_URL } from "config/config";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import CardNavigation from "@/components/CardNavigation";
import CartBtnBox from "@/components/CartBtnBox";
import Header from "@/components/Header";
import Link from "next/link";
import PaymentMethodItem from "@/components/PaymentMethodItem";

import cod from "@/public/cod.png";
import instamojo from "@/public/instamojo.png";
import paypal from "@/public/paypal.png";
import stripe from "@/public/stripe.png";
import styles from "@/styles/Cart.module.css";
import Footer from "@/components/Footer";

export async function getServerSideProps(ctx) {
	const res = await fetch(`${SERVER_URL}/getCartItems`, {
		method: "GET",
		credentials: "include",
		headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined,
	});

	if (res.status !== 200)
		return {
			props: { data: null },
		};

	const { data } = await res.json();
	return {
		props: { data },
	};
}

const Payment = ({ data }) => {
	const router = useRouter();
	const subtotal = useRef(0);
	const dependencies = data ? data.length : data;

	useEffect(() => {
		if (!data) return;
		if (data.length === 0) router.push("/");
	}, [dependencies, router]);

	
	if (!data) {
		return (
			<>
				<Header />
				<div
					className="login_request_box"
					style={{ minHeight: "50vh" }}
				>
					<h3>Please log in to access this page!</h3>
					<Link href="/login" passHref>
						<button>Login Page</button>
					</Link>
				</div>
				<Footer />
			</>
		);
	}

	const orderProduct = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append(
			"products",
			JSON.stringify(
				data.map((product) => {
					return {
						productName: product.productName,
						pid: product._id,
						variation: product.variations[0].varId,
						qty: product.qty,
						price: product.discountedPrice,
					};
				})
			)
		);
		formData.append("totalPrice", subtotal.current);
		formData.append("paymentMethod", "Cash On Delivery");
		formData.append("shippingAddress", router.query.address);
		formData.append("paymentStatus", false);
		await toast.promise(
			axios.patch(`${SERVER_URL}/orderProduct`, formData, {
				withCredentials: true,
			}),
			{
				pending: "Placing your order.",
				success: "Order Placed Successfully!",
				error: "Something went wrong. Please try again!",
			}
		);
	};

	return (
		<>
			<Header />
			<ToastContainer position="bottom-left" />
			<div className={styles.cart_container}>
				<CardNavigation
					cart={styles.done}
					shipping={styles.done}
					payment={styles.active}
				/>
				<div className={styles.grid_card_container}>
					<div>
						<div className={styles.cart_card}>
							<div className={styles.cart_card_header}>
								Select a payment option
							</div>
							<div className={styles.cart_card_payment_box}>
								<PaymentMethodItem
									src={paypal}
									alt="Paypal"
									name="Paypal"
								/>
								<PaymentMethodItem
									src={stripe}
									alt="Stripe"
									name="Stripe"
								/>
								<PaymentMethodItem
									src={instamojo}
									alt="Instamojo"
									name="Instamojo"
								/>
								<PaymentMethodItem
									src={cod}
									alt="Cash On Delivery"
									name="Cash On Delivery"
								/>
							</div>
						</div>
					</div>
					<div className={styles.summary_card}>
						<div className={styles.cart_card}>
							<div className={styles.cart_card_header}>
								Summary
								<p className={styles.badge}>
									{data.length}{" "}
									{data.length <= 1 ? "item" : "items"}
								</p>
							</div>
							<div className={styles.cart_card_summary_box}>
								<ul>
									<li>
										<div>
											<label className={styles.labelName}>
												Product
											</label>
											<label
												className={`${styles.labelVal}`}
											>
												Total
											</label>
										</div>
										<ul
											className={styles.sub_products_list}
										>
											{data.map((product, ind) => {
												subtotal.current +=
													product.discountedPrice *
													product.qty;
												return (
													<li key={ind}>
														<label>
															<Link
																href={`/products/${product.slug}`}
															>
																<a>
																	{product
																		.productName
																		.length <=
																	35
																		? product.productName
																		: product.productName.substring(
																				0,
																				35
																		  ) +
																		  "..."}
																</a>
															</Link>{" "}
															<span>
																{" "}
																x {product.qty}
															</span>
														</label>
														<label
															className={`${styles.labelVal}`}
														>
															₹
															{numberWithCommas(
																product.discountedPrice *
																	product.qty
															)}
														</label>
													</li>
												);
											})}
										</ul>
									</li>
									<li className={styles.b_top}>
										<div>
											<label className={styles.labelName}>
												Subtotal:
											</label>
											<label
												className={`${styles.labelVal}`}
											>
												₹
												{numberWithCommas(
													subtotal.current
												)}
											</label>
										</div>
									</li>
									<li>
										<div>
											<label className={styles.labelName}>
												Tax:
											</label>
											<label
												className={`${styles.labelVal}`}
											>
												₹0.00
											</label>
										</div>
									</li>
									<li>
										<div>
											<label className={styles.labelName}>
												Total Shipping:
											</label>
											<label
												className={`${styles.labelVal}`}
											>
												₹0.00
											</label>
										</div>
									</li>
									<li>
										<div>
											<label className={styles.labelName}>
												Total:
											</label>
											<label
												className={`${styles.labelVal}`}
											>
												₹
												{numberWithCommas(
													subtotal.current
												)}
											</label>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<CartBtnBox
					returnTxt="Return to shipping"
					returnLink="/cart/shipping"
					continueLink="/cart/payment"
					continueTxt="Continue to payment"
					continueValidator={orderProduct}
					boxClass={styles.payment_cart_btn_box}
				/>
			</div>

			<Footer />
		</>
	);
};

export default Payment;

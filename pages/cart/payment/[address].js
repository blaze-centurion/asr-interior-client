import { numberWithCommas } from "utils/utils";
import { SERVER_URL } from "config/config";
import { toast, ToastContainer } from "react-toastify";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import CardNavigation from "@/components/CardNavigation";
import CartBtnBox from "@/components/CartBtnBox";
import Header from "@/components/Header";
import Link from "next/link";
import PaymentMethodItem from "@/components/PaymentMethodItem";

import cod from "@/public/cod.png";
import razorpay from "@/public/razorpay.svg";
import styles from "@/styles/Cart.module.css";
import Footer from "@/components/Footer";
import displayRazorpay from "utils/PaymentGateway";
import { GlobalUserContext } from "pages/_app";
import { loadScript } from "utils/utils";

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
	const [subtotal, setSubtotal] = useState(0);
	const dependencies = data ? data.length : data;
	const { currUserInfo } = useContext(GlobalUserContext);
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(0); // 0 - Cash on Delivery; 1 - Online Payment

	useEffect(() => {
		if (!data) return;
		if (data.length === 0) router.push("/");
	}, [dependencies, router]);

	useEffect(() => {
		loadScript("https://checkout.razorpay.com/v1/checkout.js");
		setSubtotal(
			data.reduce(
				(previousValue, currentValue) =>
					previousValue +
					currentValue.discountedPrice * currentValue.qty,
				0
			)
		);
	}, [data]);

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
		try {
			e && e.preventDefault();
			const products = data.map((product) => {
				return {
					productName: product.productName,
					pid: product._id,
					variation: product.variations[0].varId,
					qty: product.qty,
					price: product.discountedPrice,
				};
			});

			const formData = new FormData();
			formData.append("products", JSON.stringify(products));
			formData.append("totalPrice", subtotal);
			formData.append(
				"paymentMethod",
				selectedPaymentMethod === 0
					? "Cash On Delivery"
					: "Online Payment"
			);
			formData.append("shippingAddress", router.query.address);
			formData.append(
				"paymentStatus",
				e.paymentStatus ? e.paymentStatus : false
			);

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
		} catch (err) {
			console.log(err);
		}
	};

	const onlinePayment = async (e) => {
		try {
			e.preventDefault();
			const products = data.map((product) => {
				return {
					productName: product.productName,
					pid: product._id,
					variation: product.variations[0].varId,
					qty: product.qty,
					price: product.discountedPrice,
				};
			});
			displayRazorpay(
				currUserInfo.name,
				currUserInfo.email,
				currUserInfo.phone,
				products,
				orderProduct
			);
		} catch (err) {
			console.log(err);
		}
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
									src={razorpay}
									alt="Razorpay"
									name="Razorpay"
									id={1}
									selectedPaymentMethod={
										selectedPaymentMethod
									}
									setSelectedPaymentMethod={
										setSelectedPaymentMethod
									}
								/>
								<PaymentMethodItem
									src={cod}
									alt="Cash On Delivery"
									name="Cash On Delivery"
									id={0}
									selectedPaymentMethod={
										selectedPaymentMethod
									}
									setSelectedPaymentMethod={
										setSelectedPaymentMethod
									}
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
												₹{numberWithCommas(subtotal)}
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
												₹{numberWithCommas(subtotal)}
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
					continueValidator={
						selectedPaymentMethod === 0
							? orderProduct
							: onlinePayment
					}
					boxClass={styles.payment_cart_btn_box}
				/>
			</div>

			<Footer />
		</>
	);
};

export default Payment;

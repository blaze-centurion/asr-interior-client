import CardNavigation from "@/components/CardNavigation";
import Header from "@/components/Header";
import styles from "@/styles/Cart.module.css";
import CartBtnBox from "@/components/CartBtnBox";
import { SERVER_URL } from "config/config";
import CartProductItem from "@/components/CartProductItem";
import { numberWithCommas } from "utils/utils";
import React, { useState } from "react";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import Footer from "@/components/Footer";
import Link from "next/link";

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

const Index = ({ data }) => {
	const [totalPrice, setTotalPrice] = useState(0);
	const [products, setProducts] = useState(data);
	const [isEmpty, setIsEmpty] = useState(data ? data.length <= 0 : 0);

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

	return (
		<>
			<Header />
			<div className={styles.cart_container}>
				<CardNavigation cart={styles.active} />
				<div className={styles.cart_card}>
					{!isEmpty ? (
						<>
							<table
								className="order_table"
								style={{ boxShadow: "none" }}
							>
								<thead>
									<tr>
										<th>#</th>
										<th>Product</th>
										<th>Price</th>
										<th>Discount</th>
										<th>Quantity</th>
										<th>Total</th>
										<th>Remove</th>
									</tr>
								</thead>
								<tbody className="larger_font">
									{products.map((product, ind) => {
										return (
											<React.Fragment key={ind}>
												<CartProductItem
													setTotalPrice={
														setTotalPrice
													}
													productsLen={
														products.length
													}
													setProducts={setProducts}
													setIsEmpty={setIsEmpty}
													pid={product._id}
													pName={product.productName}
													src={
														product.variations[0]
															.images[0].url
													}
													alt={product.productName}
													qty={product.qty}
													stock={product.stock}
													price={product.basePrice}
													discount={
														product.basePrice -
														product.discountedPrice
													}
													total={
														product.discountedPrice
													}
													slug={product.slug}
												/>
												{ind !==
													products.length - 1 && (
													<tr className="empty"></tr>
												)}
											</React.Fragment>
										);
									})}
								</tbody>
							</table>
							<div className={styles.total_container}>
								<span className={styles.subtotal}>
									Subtotal:
								</span>
								<span className={styles.total}>
									₹{numberWithCommas(totalPrice)}
								</span>
							</div>
							<CartBtnBox
								returnLink="/gallery"
								continueLink="/cart/shipping"
								returnTxt="Return to shop"
								continueTxt="Continue to shipping"
							/>
						</>
					) : (
						<>
							<p className={styles.empty_cart}>
								Your Cart is empty!{" "}
								<SentimentVeryDissatisfiedIcon
									style={{
										width: "40px",
										height: "40px",
										marginLeft: "10px",
									}}
								/>
							</p>
							<CartBtnBox
								returnLink="/gallery"
								continueLink="/cart/shipping"
								returnTxt="Return to shop"
								continueTxt="Continue to shipping"
								hideContinueBtn={true}
							/>
						</>
					)}
				</div>
			</div>

			<Footer />
		</>
	);
};

export default Index;

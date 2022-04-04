import BadgeCard from "@/components/BadgeCard";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PanelLayout from "@/components/PanelLayout";

import styles from "@/styles/Dashboard.module.css";
import { SERVER_URL } from "config/config";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ModalBox from "@/components/ModalBox";
import OrderDetailsModalBoxContent from "@/components/OrderDetailsModalBoxContent";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useContext, useRef, useState } from "react";
import { GlobalUserContext } from "./_app";
import { numberWithCommas } from "@/components/CartProductItem";
import Link from "next/link";

export async function getServerSideProps(ctx) {
	const res = await fetch(`${SERVER_URL}/getUserData`, {
		method: "GET",
		credentials: "include",
		headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined,
	});
	const orderRes = await fetch(`${SERVER_URL}/orders/4`, {
		method: "GET",
		credentials: "include",
		headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined,
	});
	if (res.status !== 200 || orderRes.status !== 200)
		return { props: { userData: null, orders: null } };
	const userData = await res.json();
	const { data } = await orderRes.json();
	return {
		props: {
			userData: userData.data,
			orders: data,
		},
	};
}

const Dashboard = ({ userData, orders }) => {
	const modalRef = useRef();
	const [currOrder, setCurrOrder] = useState({
		orderCode: "",
		orderDate: "",
		customerName: "",
		customerEmail: "",
		orderStatus: "",
		totalPrice: "",
		shippingAddress: "",
		paymentMethod: "",
		product: {},
	});
	const { currUserInfo } = useContext(GlobalUserContext);

	if (!userData) {
		return (
			<>
				<Header />
				<PanelLayout topBarTitle="Dashboard">
					<div className="login_request_box">
						<h3>Please log in to access this page!</h3>
						<Link href="/login" passHref>
							<button>Login Page</button>
						</Link>
					</div>
				</PanelLayout>
			</>
		);
	}

	return (
		<>
			<Header />
			<ModalBox ref={modalRef} headerTitle="Order id: 20211013-08515896">
				<OrderDetailsModalBoxContent {...currOrder} />
			</ModalBox>
			<PanelLayout topBarTitle="Dashboard">
				<div className={styles.dashboard_container}>
					<div className={styles.card_container}>
						<BadgeCard
							bgColorStyle={{
								backgroundColor: "#47c5f4",
								background:
									"linear-gradient(315deg, #47c5f4 0%, #6791d9 74%)",
							}}
							title="in your cart"
							number={`${userData.cart.length} Products`}
						/>
						<BadgeCard
							bgColorStyle={{
								backgroundColor: "#eb4786",
								background:
									"linear-gradient(315deg, #eb4786 0%, #b854a6 74%)",
							}}
							title="in your wishlist"
							number={`${userData.wishlist.length} Products`}
						/>
						<BadgeCard
							bgColorStyle={{
								backgroundColor: "#875fc0",
								background:
									"linear-gradient(315deg, #875fc0 0%, #5346ba 74%)",
							}}
							title="you ordered"
							number={`${userData.orders.length} Products`}
						/>
					</div>

					<div className={`${styles.card_container} ${styles.col2}`}>
						<div>
							<Card title="Default Shipping Address">
								{userData.address
									.filter((val) => val.isDefault)
									.map((val, ind) => {
										return (
											<ul
												className={
													styles.address_detail
												}
												key={ind}
											>
												<li>Address : {val.address}</li>
												<li>Country : {val.country}</li>
												<li>State : {val.state}</li>
												<li>City : {val.city}</li>
												<li>
													Postal Code :{" "}
													{val.postalCode}
												</li>
												<li>Phone : {val.phone}</li>
											</ul>
										);
									})}
							</Card>
						</div>
						<div>
							<Card title="Your Recent Ordes">
								{orders.length <= 0 ? (
									<div className={styles.no_order_txt}>
										<p>You don&apos;t have any orders!</p>
									</div>
								) : (
									<table
										className="order_table"
										style={{ boxShadow: "none" }}
									>
										<thead>
											<tr>
												<th>S.No.</th>
												<th>Product</th>
												<th>Amount</th>
												<th>Options</th>
											</tr>
										</thead>
										<tbody className="border_bottom">
											{orders.map((order, i) => {
												let date = new Date(order.date);
												let orderDate =
													date.getDate() +
													"-" +
													date.getMonth() +
													"-" +
													date.getYear() +
													" " +
													date.toLocaleTimeString();
												return (
													<tr key={i}>
														<td data-label="S.No">
															{i + 1}
														</td>
														<td data-label="Product">
															{
																order.product
																	.productName
															}
														</td>
														<td data-label="Amount">
															₹
															{numberWithCommas(
																order.totalPrice
															)}
														</td>
														<td
															data-label="Options"
															className="options"
														>
															<button className="deleteBtn">
																<DeleteOutlinedIcon className="icon" />
															</button>
															<button
																className="viewBtn"
																onClick={() => {
																	setCurrOrder(
																		{
																			orderCode:
																				order.orderCode,
																			orderDate,
																			customerName:
																				currUserInfo.name
																					.charAt(
																						0
																					)
																					.toUpperCase() +
																				currUserInfo.name.slice(
																					1
																				),
																			customerEmail:
																				currUserInfo.email,
																			orderStatus:
																				order.orderStatus
																					? "Confirmed"
																					: "Not Confirmed",
																			totalPrice:
																				order.totalPrice,
																			shippingAddress:
																				order
																					.shippingAddress
																					.address,
																			paymentMethod:
																				order.paymentMethod,
																			product:
																				order.product,
																		}
																	);
																	modalRef.current.classList.add(
																		"active"
																	);
																}}
															>
																<VisibilityOutlinedIcon className="icon" />
															</button>
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								)}
								{orders.length > 0 ? (
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											marginTop: "10px",
										}}
									>
										<Link href="/orders">
											<a className="show_more_btn">
												Show More
											</a>
										</Link>
									</div>
								) : null}
							</Card>
						</div>
					</div>
				</div>
			</PanelLayout>
			<Footer />
		</>
	);
};

export default Dashboard;

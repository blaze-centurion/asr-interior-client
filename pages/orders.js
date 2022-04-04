import { useContext, useRef, useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ModalBox from "@/components/ModalBox";
import OrderDetailsModalBoxContent from "@/components/OrderDetailsModalBoxContent";
import PanelLayout from "@/components/PanelLayout";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { SERVER_URL } from "config/config";
import { numberWithCommas } from "../components/CartProductItem";
import { GlobalUserContext } from "./_app";
import Link from "next/link";

export async function getServerSideProps(ctx) {
	const res = await fetch(`${SERVER_URL}/orders`, {
		method: "GET",
		credentials: "include",
		headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined,
	});

	if (res.status !== 200) return { props: { data: null } };
	const { data } = await res.json();
	return {
		props: { data },
	};
}

const Orders = ({ data }) => {
	const { currUserInfo } = useContext(GlobalUserContext);
	const modalRef = useRef();
	const [currOrder, setCurrOrder] = useState({
		orderCode: "",
		orderDate: "",
		customerName: "",
		customerEmail: "",
		orderStatus: "",
		deliveryStatus: "",
		paymentStatus: "",
		totalPrice: "",
		shippingAddress: "",
		paymentMethod: "",
		product: {},
	});

	if (!data) {
		return (
			<>
				<Header />
				<PanelLayout topBarTitle="Orders">
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

	const configureOrderModalBox = (order, orderDate) => {
		setCurrOrder({
			orderCode: order.orderCode,
			orderDate,
			customerName: currUserInfo.name,
			customerEmail: currUserInfo.email,
			orderStatus: order.orderStatus ? "Confirmed" : "Not Confirmed",
			totalPrice: order.totalPrice,
			shippingAddress: order.shippingAddress.address,
			paymentMethod: order.paymentMethod,
			product: order.product,
			deliveryStatus: order.deliveryStatus,
			paymentStatus: order.paymentStatus,
		});
	};

	return (
		<>
			<Header />
			<ModalBox
				ref={modalRef}
				headerTitle={`Order id: ${currOrder.orderCode}`}
			>
				<OrderDetailsModalBoxContent {...currOrder} />
			</ModalBox>

			<PanelLayout topBarTitle="Orders">
				<div className="order_container">
					{data.length <= 0 ? (
						<h2
							style={{
								textAlign: "center",
								fontWeight: "400",
								fontFamily: "var(--poppins)",
								fontSize: "19px",
							}}
						>
							You don&apos;t have any orders yet!
						</h2>
					) : (
						<table className="order_table">
							<thead>
								<tr>
									<th>Code</th>
									<th>Product</th>
									<th>Date</th>
									<th>Amount</th>
									<th>Delivery Status</th>
									<th>Payment Status</th>
									<th>Options</th>
								</tr>
							</thead>
							<tbody>
								{data.map((order, i) => {
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
											<td
												data-label="Code"
												className="code"
												onClick={() => {
													configureOrderModalBox(
														order,
														orderDate
													);
													modalRef.current.classList.add(
														"active"
													);
												}}
											>
												{order.orderCode}
											</td>
											<td data-label="Product">
												<Link
													href={`/products/${order.product.productName}`}
												>
													<a>
														{order.product
															.productName
															.length > 23
															? order.product.productName.substring(
																	0,
																	26
															  ) + "..."
															: order.product
																	.productName}
													</a>
												</Link>
											</td>
											<td data-label="Date">{`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}</td>
											<td data-label="Amount">
												₹
												{numberWithCommas(
													order.totalPrice
												)}
											</td>
											<td data-label="Delivery Status">
												{order.deliveryStatus
													? "Delivered"
													: "Pending"}
											</td>
											<td data-label="Payment Status">
												<p className="badge">
													{order.paymentStatus
														? "Paid"
														: "Unpaid"}
												</p>{" "}
												<span className="asterrisk">
													*
												</span>
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
														configureOrderModalBox(
															order,
															orderDate
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
				</div>
			</PanelLayout>

			<Footer />
		</>
	);
};

export default Orders;

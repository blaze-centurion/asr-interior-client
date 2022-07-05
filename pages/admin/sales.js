import AdminOrderDetailModalBox from "@/components/AdminOrderDetailModalBox";
import AdminPanelLayout from "@/components/AdminPanelLayout";
import { numberWithCommas } from "utils/utils";
import ModalBox from "@/components/ModalBox";
import styles from "@/styles/AdminPanel/Product.module.css";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import axios from "axios";
import { SERVER_URL } from "config/config";
import { GlobalUserContext } from "pages/_app";
import React, { useContext, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";

export async function getServerSideProps() {
	const res = await axios.get(`${SERVER_URL}/getAllCustomersOrder`);
	return {
		props: { orders: res.status === 200 ? res.data.data : [] },
	};
}

const Sales = ({ orders }) => {
	const { currUserInfo } = useContext(GlobalUserContext);
	const modalRef = useRef();
	const [currOrder, setCurrOrder] = useState({
		orderCode: "",
		orderDate: "",
		customerName: "",
		customerEmail: "",
		orderStatus: "",
		deliveryStatus: false,
		paymentStatus: false,
		totalPrice: "",
		shippingAddress: "",
		paymentMethod: "",
		products: [],
	});

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
			products: order.products,
			deliveryStatus: order.deliveryStatus,
			paymentStatus: order.paymentStatus,
		});
	};

	return (
		<>
			<ToastContainer position="bottom-left" />
			<ModalBox
				ref={modalRef}
				headerTitle={`Order id: ${currOrder.orderCode}`}
			>
				<AdminOrderDetailModalBox {...currOrder} />
			</ModalBox>
			<AdminPanelLayout>
				<div className={styles.product_container}>
					<div className={styles.admin_panel_card}>
						<div className={styles.admin_panel_card_header}>
							<h1>All Sales</h1>
						</div>

						<div className={styles.admin_panel_card_content}>
							<table
								className="order_table"
								style={{ boxShadow: "none" }}
							>
								<thead>
									<tr>
										<th>#</th>
										<th>Order Code</th>
										<th>Num. of Products</th>
										<th>Customer</th>
										<th>Amount</th>
										<th>Delivery Status</th>
										<th>Payment Status</th>
										<th>Options</th>
									</tr>
								</thead>
								<tbody>
									{orders.map((order) => {
										return order.orders
											.reverse()
											.map((singleOrder, i) => {
												let date = new Date(
													singleOrder.date
												);
												let orderDate =
													date.getDate() +
													"-" +
													date.getMonth() +
													"-" +
													date.getYear() +
													" " +
													date.toLocaleTimeString();
												return (
													<React.Fragment
														key={Math.random()}
													>
														<tr>
															<td data-label="#">
																{i + 1}
															</td>
															<td data-label="Order Code">
																{
																	singleOrder.orderCode
																}
															</td>
															<td data-label="Num. of Products">
																1
															</td>
															<td data-label="Customer">
																{order.name}
															</td>
															<td data-label="Amount">
																{numberWithCommas(
																	singleOrder.totalPrice
																)}
															</td>
															<td data-label="Delivery Status">
																{singleOrder.deliveryStatus
																	? "Delivered"
																	: "Pending"}
															</td>
															<td data-label="Payment Status">
																<p className="badge">
																	{singleOrder.paymentStatus
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
																style={{
																	display:
																		"table-cell",
																}}
															>
																<div
																	style={{
																		display:
																			"flex",
																	}}
																>
																	<button
																		className="viewBtn"
																		onClick={() => {
																			configureOrderModalBox(
																				singleOrder,
																				orderDate
																			);
																			modalRef.current.classList.add(
																				"active"
																			);
																		}}
																	>
																		<VisibilityOutlinedIcon className="icon" />
																	</button>
																	<button className="deleteBtn">
																		<DeleteOutlinedIcon className="icon" />
																	</button>
																</div>
															</td>
														</tr>
													</React.Fragment>
												);
											});
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</AdminPanelLayout>
		</>
	);
};

export default Sales;

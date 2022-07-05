import Link from "next/link";
import { numberWithCommas } from "utils/utils";
import ModalCard from "./ModalCard";

const OrderDetailsModalBoxContent = ({
	orderCode,
	orderDate,
	customerName,
	customerEmail,
	orderStatus,
	totalPrice,
	shippingAddress,
	paymentMethod,
	products,
	deliveryStatus,
	paymentStatus,
}) => {
	return (
		<>
			<ModalCard cardTitle="Order Summary">
				<ul className="order_summary_box">
					<li>
						<label>Order Code:</label>
						<h4>{orderCode}</h4>
					</li>
					<li>
						<label>Order date:</label>
						<h4>{orderDate}</h4>
					</li>
					<li>
						<label>Customer:</label>
						<h4 className="text_capitalize">{customerName}</h4>
					</li>
					<li>
						<label>Order status:</label>
						<h4>{orderStatus}</h4>
					</li>
					<li>
						<label>Email:</label>
						<h4>{customerEmail}</h4>
					</li>
					<li>
						<label>Total order amount:</label>
						<h4>₹{numberWithCommas(totalPrice)}</h4>
					</li>
					<li>
						<label>Shipping address:</label>
						<h4>{shippingAddress}</h4>
					</li>
					<li>
						<label>Payment method:</label>
						<h4>{paymentMethod}</h4>
					</li>
					<li>
						<label>Delivery status:</label>
						<h4
							className={`h4_badge ${
								deliveryStatus ? "success" : undefined
							}`}
						>
							<p>{deliveryStatus ? "Delivered" : "Pending"}</p>
						</h4>
					</li>
					<li>
						<label>Payment status:</label>
						<h4
							className={`h4_badge ${
								paymentStatus ? "success" : undefined
							}`}
						>
							<p>{paymentStatus ? "Paid" : "Unpaid"}</p>
						</h4>
					</li>
				</ul>
			</ModalCard>

			<ModalCard cardTitle="Order Details">
				<table className="order_table" style={{ boxShadow: "none" }}>
					<thead>
						<tr>
							<th>#</th>
							<th>Product</th>
							<th>Variaton</th>
							<th>Quantity</th>
							<th>Rate</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product, i) => {
							return (
								<tr key={i}>
									<td data-label="#">{i + 1}</td>
									<td data-label="Product">
										<Link
											href={`/products/${product.productName}`}
										>
											<a>{product.productName}</a>
										</Link>
									</td>
									<td data-label="Variaton">
										{product.variation}
									</td>
									<td data-label="Quantity">{product.qty}</td>
									<td data-label="Rate">
										₹
										{numberWithCommas(
											product.price ? product.price : 0
										)}
									</td>
									<td data-label="Price">
										₹
										{numberWithCommas(
											product.price
												? product.price * product.qty
												: 0
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</ModalCard>
		</>
	);
};

export default OrderDetailsModalBoxContent;

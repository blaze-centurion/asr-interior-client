import { numberWithCommas } from "@/components/CartProductItem";
import { SERVER_URL } from "config/config";
import AdminPanelLayout from "@/components/AdminPanelLayout";
import axios from "axios";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import styles from "@/styles/AdminPanel/Product.module.css";
import { toast, ToastContainer } from "react-toastify";

export async function getServerSideProps() {
	const res = await axios.get(`${SERVER_URL}/getProducts`);
	return {
		props: { products: res.data.data },
	};
}

const Products = ({products}) => {
	// const [products, setProducts] = useState(props.products)
	const deleteProduct = async (_id) => {
		if (window.confirm("Are you sure you want to delete it.")) {
			const res = await axios.delete(`${SERVER_URL}/deleteProduct/${_id}`);
			if (res.status === 200) {
				window.location.reload()
			} else {
				toast.error("Something went wrong. Please try again!");
			}
		}
	};

	return (
		<>
			<ToastContainer position="bottom-left" />
			<AdminPanelLayout>
				<div className={styles.product_container}>
					<div className={styles.product_container_header}>
						<h1>All Products</h1>
						<Link href="/admin/product/newProduct" passHref>
							<button>Add New Product</button>
						</Link>
					</div>

					<div className={styles.admin_panel_card}>
						<div className={styles.admin_panel_card_header}>
							<h1>All Product</h1>
						</div>
						<div className={styles.admin_panel_card_content}>
							<table
								className="order_table"
								style={{ boxShadow: "none" }}
							>
								<thead>
									<tr>
										<th>#</th>
										<th>Name</th>
										<th>Num of Sale</th>
										<th>Base Price</th>
										<th>Discount</th>
										<th>Rating</th>
										<th>Stock</th>
										<th>Options</th>
									</tr>
								</thead>
								<tbody>
									{products.map((product, ind) => {
										return (
											<React.Fragment key={ind}>
												<tr>
													<td
														data-label="#"
														className="imgBx"
													>
														<Image
															src={
																product
																	.variations[0]
																	.images[0].url
															}
															alt={
																product.productName
															}
															layout="fill"
														/>
													</td>
													<td data-label="Name">
														<Link
															href={`/products/${product.slug}`}
														>
															<a>
																{
																	product.productName
																}
															</a>
														</Link>
													</td>
													<td data-label="Num of Sale">
														{product.rating}
													</td>
													<td data-label="Base Price">
														₹
														{numberWithCommas(
															product.basePrice
														)}
													</td>
													<td data-label="Discount">
														₹
														{numberWithCommas(
															product.basePrice -
																product.discountedPrice
														)}
													</td>
													<td data-label="Rating">
														{product.rating}
													</td>
													<td data-label="Stock">
														{product.stock}
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
																display: "flex",
															}}
														>
															<button className="deleteBtn" onClick={() => deleteProduct(product._id)}>
																<DeleteOutlinedIcon className="icon" />
															</button>
															<Link href={`/admin/product/edit/${product.slug}`} passHref>
																<button className="viewBtn">
																	<ModeEditOutlineOutlinedIcon className="icon" />
																</button>
															</Link>
														</div>
													</td>
												</tr>
												<tr className="empty"></tr>
											</React.Fragment>
										);
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

export default Products;

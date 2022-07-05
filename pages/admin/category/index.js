import { SERVER_URL } from "config/config";
import AdminPanelLayout from "@/components/AdminPanelLayout";
import axios from "axios";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Link from "next/link";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import React from "react";

import styles from "@/styles/AdminPanel/Product.module.css";
import { toast, ToastContainer } from "react-toastify";

export async function getServerSideProps() {
	const res = await axios.get(`${SERVER_URL}/getCategories`);
	return {
		props: { categories: res.data.data },
	};
}

const Category = ({ categories }) => {
	const deleteCategory = async (_id) => {
		if (window.confirm("Are you sure you want to delete it.")) {
			const res = await axios.delete(
				`${SERVER_URL}/deleteCategory/${_id}`
			);
			if (res.status === 200) {
				window.location.reload();
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
						<h1>All Categories</h1>
						<Link href="/admin/category/newCategory" passHref>
							<button>Add New Category</button>
						</Link>
					</div>

					<div className={styles.admin_panel_card}>
						<div className={styles.admin_panel_card_header}>
							<h1>All Categories</h1>
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
										<th>Parent Category</th>
										<th>Options</th>
									</tr>
								</thead>
								<tbody>
									{categories.map((category, ind) => {
										return (
											<React.Fragment key={ind}>
												<tr>
													<td data-label="#">
														{ind + 1}
													</td>
													<td data-label="Name">
														{category.name}
													</td>
													<td data-label="Parent Category">
														{category.parentName}
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
															<button
																className="deleteBtn"
																onClick={() =>
																	deleteCategory(
																		category._id
																	)
																}
															>
																<DeleteOutlinedIcon className="icon" />
															</button>
															<Link
																href={`/admin/category/edit/${category._id}`}
																passHref
															>
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

export default Category;

import AdminPanelLayout from "@/components/AdminPanelLayout";
import styles from "@/styles/AdminPanel/Product.module.css";
import Image from "next/image";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import axios from "axios";
import { SERVER_URL } from "config/config";
import React from "react";
import userProfilePic from "@/public/user.jpg";
import { toast, ToastContainer } from "react-toastify";

export async function getServerSideProps() {
	const res = await axios.get(`${SERVER_URL}/getAllCustomers`);
	return {
		props: { users: res.status === 200 ? res.data.data : [] },
	};
}

const Customers = ({ users }) => {
	const deleteUser = async (id) => {
		const res = await axios.delete(`${SERVER_URL}/deleteUser/${id}`);
		if (res.status === 200) {
			window.location.reload();
		} else {
			toast.error("Something went wrong. Please try again!");
		}
	};

	return (
		<>
			<ToastContainer position="bottom-left" />
			<AdminPanelLayout>
				<div className={styles.product_container}>
					<div className={styles.admin_panel_card}>
						<div className={styles.admin_panel_card_header}>
							<h1>All Customers</h1>
						</div>

						<div className={styles.admin_panel_card_content}>
							<table
								className="order_table"
								style={{ boxShadow: "none" }}
							>
								<thead>
									<tr>
										<th>#</th>
										<th>Profile</th>
										<th>Name</th>
										<th>Email</th>
										<th>Phone</th>
										<th>Role</th>
										<th>Options</th>
									</tr>
								</thead>
								<tbody>
									{users.map((user, ind) => {
										return (
											<React.Fragment key={ind}>
												<tr>
													<td data-label="#">
														{ind + 1}
													</td>
													<td
														data-label="Profile"
														className="imgBx"
													>
														<Image
															src={
																user.profilePic.url
																	? user.profilePic.url
																	: userProfilePic
															}
															alt={user.name}
															width="45px"
															height="45px"
														/>
													</td>
													<td data-label="Name">
														{user.name}
													</td>
													<td data-label="Email">
														{user.email}
													</td>
													<td data-label="Phone">
														{user.phone}
													</td>
													<td data-label="Role">
														{user.role
															.charAt(0)
															.toUpperCase() +
															user.role.slice(1)}
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
															<button className="viewBtn">
																<NotInterestedIcon className="icon" />
															</button>
															<button
																className="deleteBtn"
																onClick={() =>
																	deleteUser(
																		user._id
																	)
																}
															>
																<DeleteOutlinedIcon className="icon" />
															</button>
														</div>
													</td>
												</tr>
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

export default Customers;

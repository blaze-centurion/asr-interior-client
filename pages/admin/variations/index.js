import addVarstyles from "@/styles/AdminPanel/NewProduct.module.css";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import styles from "@/styles/AdminPanel/Product.module.css";
import AdminPanelLayout from "@/components/AdminPanelLayout";
import React, { useState } from "react";
import Selectbox from "@/components/Selectbox";
import axios from "axios";
import { SERVER_URL } from "config/config";
import { toast, ToastContainer } from "react-toastify";

export async function getStaticProps() {
	const varRes = await axios.get(`${SERVER_URL}/getVariations`);
	const parentVars = await axios.get(`${SERVER_URL}/getParentVariations`);
	return {
		props: {
			variations: varRes.data.data,
			parentVariations: parentVars.data.data,
		},
	};
}

const Variation = ({ variations, parentVariations }) => {
	const [varInput, setVarInput] = useState({
		name: "",
		parentVariation: "",
		value: "",
	});

	const handleInput = (e) =>
		setVarInput((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));

	const deleteVariation = async (_id) => {
		if (window.confirm("Are you sure you want to delete it.")) {
			const res = await axios.delete(
				`${SERVER_URL}/deleteVariation/${_id}`
			);
			if (res.status === 200) {
				window.location.reload();
			} else {
				toast.error("Something went wrong. Please try again!");
			}
		}
	};

	const addNewVariation = async () => {
		if (!varInput.name || !varInput.parentVariation || varInput.value)
			return;

		const res = await axios.post(`${SERVER_URL}/addNewVariation`, {
			...varInput,
		});
		if (res.status === 201) {
			window.location.reload();
		} else {
			toast.error("Something went wrong. Please try again!");
		}
	};

	return (
		<>
			<ToastContainer position="bottom-left" />
			<AdminPanelLayout>
				<div
					className={addVarstyles.product_grid_container}
					style={{ gridTemplateColumns: "1fr 1fr" }}
				>
					<div className={addVarstyles.left_col}>
						<div
							className={styles.admin_panel_card}
							style={{ margin: "10px 0" }}
						>
							<div className={styles.admin_panel_card_header}>
								<h1>All Variations</h1>
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
											<th>Parent Variation</th>
											<th>Value</th>
											<th>Options</th>
										</tr>
									</thead>
									<tbody>
										{variations.map((variation, ind) => {
											return (
												<React.Fragment key={ind}>
													<tr>
														<td data-label="#">
															{ind + 1}
														</td>
														<td data-label="Name">
															{variation.name}
														</td>
														<td data-label="Parent Variation">
															{
																variation.parentName
															}
														</td>
														<td data-label="Value">
															{variation.value
																? variation.value
																: "-"}
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
																	className="deleteBtn"
																	onClick={() =>
																		deleteVariation(
																			variation._id
																		)
																	}
																>
																	<DeleteOutlinedIcon className="icon" />
																</button>
																<button className="viewBtn">
																	<ModeEditOutlineOutlinedIcon className="icon" />
																</button>
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
					<div className={addVarstyles.right_col}>
						<div className={addVarstyles.card}>
							<div className={addVarstyles.card_header}>
								<h1>Add New Variation</h1>
							</div>
							<div className={addVarstyles.card_content}>
								<ul className={addVarstyles.card_input_item}>
									<li>
										<label>Name</label>
										<input
											type="text"
											placeholder="Name"
											name="name"
											value={varInput.name}
											onChange={handleInput}
										/>
									</li>
									<li>
										<label>Parent Variation</label>
										<Selectbox
											onClick={(id) =>
												setVarInput((prev) => ({
													...prev,
													parentVariation: id,
												}))
											}
											options={parentVariations}
											placeholder="Select a category"
										/>
									</li>
									<li>
										<label>Value</label>
										<input
											type="text"
											placeholder="Value"
											name="value"
											value={varInput.value}
											onChange={handleInput}
										/>
									</li>
									<div className={addVarstyles.btn_box}>
										<button onClick={addNewVariation}>
											Add New Variation
										</button>
									</div>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</AdminPanelLayout>
		</>
	);
};

export default Variation;

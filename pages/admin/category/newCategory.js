import AdminPanelLayout from "@/components/AdminPanelLayout";
import Selectbox from "@/components/Selectbox";
import styles from "@/styles/AdminPanel/NewProduct.module.css";
import axios from "axios";
import { SERVER_URL } from "config/config";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export async function getServerSideProps() {
	const res = await axios.get(`${SERVER_URL}/getCategories`);
	return {
		props: {
			categories: res.data.data,
		},
	};
}

const NewCategory = ({ categories }) => {
	const [input, setInput] = useState({
		name: "",
		parentCategory: "",
	});

	const handleInput = (e) =>
		setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));

	const saveCategory = async () => {
		if (!input.name)
			return toast.error("Please enter the valid category name.");
		const res = await axios.post(`${SERVER_URL}/addCategory`, { ...input });
		if (res.status === 201) {
			toast.success("Category added successfully");
		} else {
			toast.error("Something went wrong. Please try again!");
		}
	};

	return (
		<>
			<ToastContainer position="bottom-left" />
			<AdminPanelLayout>
				<div
					className={styles.product_grid_container}
					style={{ gridTemplateColumns: "1fr" }}
				>
					<div className={styles.card}>
						<div className={styles.card_header}>
							<h1>Category Information</h1>
						</div>
						<div className={styles.card_content}>
							<ul className={styles.card_input_item}>
								<li>
									<label>
										Category Name <span>*</span>
									</label>
									<input
										type="text"
										placeholder="Category Name"
										name="name"
										required
										value={input.name}
										onChange={handleInput}
									/>
								</li>
								<li>
									<label>Parent Category</label>
									<Selectbox
										onClick={(id) =>
											setInput((prev) => ({
												...prev,
												parentCategory: id,
											}))
										}
										options={categories}
										placeholder="Select a category"
									/>
								</li>
								<div className={styles.btn_box}>
									<button onClick={saveCategory}>
										Save &amp; Publish
									</button>
								</div>
							</ul>
						</div>
					</div>
				</div>
			</AdminPanelLayout>
		</>
	);
};

export default NewCategory;

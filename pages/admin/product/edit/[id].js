import { SERVER_URL } from "config/config";
import { Switch } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import AdminPanelLayout from "@/components/AdminPanelLayout";
import axios from "axios";
import dynamic from "next/dynamic";
import NewVariationItem from "@/components/NewVariationItem";
import Selectbox from "@/components/Selectbox";

import styles from "@/styles/AdminPanel/NewProduct.module.css";
import { formats, modules } from "data/quill";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
	ssr: false,
	loading: () => <p>Loading ...</p>,
});

export async function getServerSideProps(ctx) {
	const res = await axios.get(`${SERVER_URL}/getCategories`);
	const varRes = await axios.get(`${SERVER_URL}/getVariationsWithParent`);
	const productRes = await axios.get(`${SERVER_URL}/getProduct/${ctx.query.id}`)
	if (res.status !== 200 || varRes.status !== 200) {
		return { props: { categories: [], variationsData: [] } };
	}

	return {
		props: { categories: res.data.data, variationsData: varRes.data.data, product: productRes.data.data },
	};
}

const EditProduct = ({ categories, variationsData, product }) => {
	const [productInput, setProductInput] = useState({
		productName: product.productName,
		basePrice: product.basePrice,
		discountedPrice: product.discountedPrice,
		discountType: product.discountType,
		stock: product.stock,
		desc: product.desc,
		metaTitle: product.metaTitle,
		metaDesc: product.metaDesc,
		tags: product.tags,
		category: product.categories[0],
		showStock: product.showStock,
	});
	const [variations, setVariations] = useState(product.variations);
	const [currVarInd, setCurrVarInd] = useState(product.variations.map((_, ind) => ind));

	const handleInput = (e) => {
		setProductInput((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const saveProduct = async () => {
		if (
			!productInput.productName ||
			!productInput.category ||
			!productInput.basePrice ||
			!productInput.stock ||
			!productInput.desc ||
			variations.length === 0
		) {
			return toast.error(
				"Please fill all the required fields and set a variation also."
			);
		}
		const formData = new FormData();
		formData.append("productName", productInput.productName);
		formData.append("slug", productInput.productName);
		formData.append("basePrice", productInput.basePrice);
		formData.append("discountedPrice", productInput.discountedPrice);
		formData.append("discountType", productInput.discountType);
		formData.append("stock", productInput.stock);
		formData.append("desc", productInput.desc);
		formData.append("metaTitle", productInput.metaTitle);
		formData.append("metaDesc", productInput.metaDesc);
		formData.append("category", productInput.category);
		formData.append("showStock", productInput.showStock);
		formData.append(
			"tags",
			JSON.stringify([
				"Beds",
				"Double Beds",
				"White Beds",
				"White Double Beds",
				"Storage Beds",
			])
		);
		variations.forEach((variation) => {
			Array.from(variation.images).forEach((file) => {
				formData.append(variation.varId, file);
			});
		});
		formData.append("variations", JSON.stringify(variations));
		await toast.promise(
			axios.post(`${SERVER_URL}/addProduct`, formData, {
				withCredentials: true,
			}),
			{
				pending: "Adding a product",
				success: "Product Added Successfully!",
				error: "Something went wrong.",
			}
		);
	};

	return (
		<>
			<ToastContainer position="bottom-left" />
			<AdminPanelLayout>
				<div className={styles.product_grid_container}>
					<div className={styles.left_col}>
						<div className={styles.card}>
							<div className={styles.card_header}>
								<h1>Product Information</h1>
							</div>
							<div className={styles.card_content}>
								<ul className={styles.card_input_item}>
									<li>
										<label>
											Product Name <span>*</span>
										</label>
										<input
											type="text"
											placeholder="Product Name"
											name="productName"
											value={productInput.productName}
											onChange={handleInput}
										/>
									</li>
									<li>
										<label>
											Category <span>*</span>
										</label>
										<Selectbox
											onClick={(id) =>
												setProductInput((prev) => ({
													...prev,
													category: id,
												}))
											}
											options={categories}
											placeholder="Select a category"
										/>
									</li>
									<li>
										<label>Tags </label>
										<input
											type="text"
											placeholder="Type and hit enter to add a tag."
										/>
									</li>
								</ul>
							</div>
						</div>
						<div className={styles.card}>
							<div className={styles.card_header}>
								<h1>Product price + stock</h1>
							</div>
							<div className={styles.card_content}>
								<ul className={styles.card_input_item}>
									<li>
										<label>
											Unit price <span>*</span>
										</label>
										<input
											type="text"
											placeholder="Unit Price"
											name="basePrice"
											value={productInput.basePrice}
											onChange={handleInput}
										/>
									</li>
									<li>
										<label>Discount Date Range</label>
										<input
											type="date"
											placeholder="Product Name"
										/>
									</li>
									<li>
										<label>Discount</label>
										<input
											type="text"
											placeholder="Discount"
											name="discountedPrice"
											value={productInput.discountedPrice}
											onChange={handleInput}
										/>
									</li>
									<li>
										<label>Discount Type </label>
										<Selectbox
											onClick={(value) =>
												setProductInput((prev) => ({
													...prev,
													discountType: value,
												}))
											}
											options={[
												{ name: "Flat", value: "Flat" },
												{
													name: "Percent",
													value: "Percent",
												},
											]}
											placeholder="Select a discount type"
										/>
									</li>
									<li>
										<label>
											Quantity <span>*</span>{" "}
										</label>
										<input
											type="text"
											placeholder="Enter the product quantity"
											name="stock"
											value={productInput.stock}
											onChange={handleInput}
										/>
									</li>
								</ul>
							</div>
						</div>
						<div className={styles.card}>
							<div className={styles.card_header}>
								<h1>Product Description</h1>
							</div>
							<div className={styles.card_content}>
								<QuillNoSSRWrapper
									modules={modules}
									formats={formats}
									theme="snow"
									onChange={(content) => {
										setProductInput((prev) => ({
											...prev,
											desc: content,
										}));
									}}
								/>
							</div>
						</div>
						<div className={styles.card}>
							<div className={styles.card_header}>
								<h1>Product Variation Information</h1>
							</div>
							<div className={styles.card_content}>
								<ul className={styles.card_input_item}>
									<li className={styles.btn_item}>
										<button
											onClick={() =>
												setCurrVarInd((prev) =>
													prev.concat(
														currVarInd.length
													)
												)
											}
										>
											Add New Variation
										</button>
									</li>
									{currVarInd.map((item) => (
										<NewVariationItem
											variations={variations}
											setVariations={setVariations}
											ind={item}
											key={item}
											options={variationsData}
										/>
									))}
								</ul>
							</div>
						</div>
						<div className={styles.card}>
							<div className={styles.card_header}>
								<h1>SEO Meta Tags</h1>
							</div>
							<div className={styles.card_content}>
								<ul className={styles.card_input_item}>
									<li>
										<label>Meta Title</label>
										<input
											type="text"
											placeholder="Meta Title"
											name="metaTitle"
											value={productInput.metaTitle}
											onChange={handleInput}
										/>
									</li>
									<li>
										<label>Meta Description</label>
										<textarea
											placeholder="Meta Description"
											name="metaDesc"
											value={productInput.metaDesc}
											onChange={handleInput}
										/>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className={styles.right_col}>
						<div className={styles.card}>
							<div className={styles.card_header}>
								<h1>Stock Visibility State</h1>
							</div>
							<div className={styles.card_content}>
								<ul className={styles.card_input_item}>
									<li>
										<label>Show Stock Quantity</label>
										<div style={{ flex: "1" }}>
											<Switch
												defaultChecked={productInput.showStock}
												onChange={(e) =>
													setProductInput((prev) => ({
														...prev,
														showStock:
															e.target.checked,
													}))
												}
											/>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.btn_box}>
					<button onClick={saveProduct}>Save &amp; Publish</button>
				</div>
			</AdminPanelLayout>
		</>
	);
};

export default EditProduct;

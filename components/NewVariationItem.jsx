import Selectbox from "./Selectbox";
import styles from "@/styles/AdminPanel/NewProduct.module.css";

const NewVariationItem = ({ ind, setVariations, options, variations }) => {
	return (
		<>
			<li>
				<label>
					<Selectbox
						funcTwoParam={true}
						giveVal={true}
						onClick={(value, id) => {
							setVariations(() => {
								return variations.map((variation, i) => {
									return ind !== i
										? variation
										: {
												value,
												price: 0,
												varId: id,
												images:
													typeof variations[ind] ===
													"object"
														? variations[ind].images
														: [],
										  };
								});
							});
						}}
						options={options}
						placeholder="Select a Color"
					/>
				</label>
				<div className={styles.upload_file_item}>
					<span>Browse File</span>
					<p>{variations[ind].images.length} Files Selected</p>
					<input
						type="file"
						multiple
						onChange={(e) => {
							const files = e.target.files;
							if (files.length <= 0) return;
							setVariations(() => {
								return variations.map((variation, i) => {
									return ind !== i
										? variation
										: {
												...variation,
												images: files,
										  };
								});
							});
						}}
					/>
				</div>
			</li>
		</>
	);
};

export default NewVariationItem;

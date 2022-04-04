const ProductDescTab = ({ desc }) => {
	return (
		<>
			<div
				style={{ padding: "0 20px" }}
				dangerouslySetInnerHTML={{ __html: desc }}
			></div>
		</>
	);
};

export default ProductDescTab;

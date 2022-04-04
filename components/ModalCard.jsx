const ModalCard = ({ children, cardTitle }) => {
	return (
		<>
			<div className="modal_card">
				<div className="modal_card_header">
					<h3>{cardTitle}</h3>
				</div>
				<div className="modal_card_content">{children}</div>
			</div>
		</>
	);
};

export default ModalCard;

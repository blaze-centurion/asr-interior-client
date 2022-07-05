import { forwardRef } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const ModalBox = forwardRef(
	({ headerTitle, children, modalInnerStyle, setEditAddress }, ref) => {
		return (
			<>
				<section
					ref={ref}
					className="modal_container"
					onClick={(e) => {
						if (e.target === ref.current)
							ref.current.classList.remove("active");
						if (setEditAddress) {
							setEditAddress({
								isEditing: false,
								address: "",
								state: "",
								city: "",
								phone: "",
								postalCode: "",
								country: "",
								id: "",
							});
						}
					}}
				>
					<div className="modal_inner" style={modalInnerStyle}>
						<div className="modal_header">
							<h3>{headerTitle}</h3>
							<button
								onClick={() => {
									ref.current.classList.remove("active");
									if (setEditAddress) {
										setEditAddress({
											isEditing: false,
											address: "",
											state: "",
											city: "",
											phone: "",
											postalCode: "",
											country: "",
											id: "",
										});
									}
								}}
							>
								<CloseOutlinedIcon />
							</button>
						</div>
						<div className="modal_content_container">
							{children}
						</div>
					</div>
				</section>

				<style jsx>{`
					.modal_inner {
						overflow: auto;
					}
					@media (max-width: 1100px) {
						.modal_inner {
							width: 90vw !important;
						}
					}
					@media (max-width: 375px) {
						.modal_container .modal_inner .modal_content_container {
							padding: 1rem 5px;
						}
					}
					@media (max-width: 600px) {
						.modal_inner {
							width: 97vw !important;
						}
					}
				`}</style>
			</>
		);
	}
);

ModalBox.displayName = "ModalBox";

export default ModalBox;

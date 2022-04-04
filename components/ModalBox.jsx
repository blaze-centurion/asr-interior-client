import { forwardRef } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const ModalBox = forwardRef(
	({ headerTitle, children, modalInnerStyle }, ref) => {
		return (
			<>
				<section
					ref={ref}
					className="modal_container"
					onClick={(e) => {
						if (e.target === ref.current)
							ref.current.classList.remove("active");
					}}
				>
					<div className="modal_inner" style={modalInnerStyle}>
						<div className="modal_header">
							<h3>{headerTitle}</h3>
							<button
								onClick={() =>
									ref.current.classList.remove("active")
								}
							>
								<CloseOutlinedIcon />
							</button>
						</div>
						<div className="modal_content_container">
							{children}
						</div>
					</div>
				</section>
			</>
		);
	}
);

ModalBox.displayName = "ModalBox";

export default ModalBox;

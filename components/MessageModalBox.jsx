import { forwardRef } from "react";

const MessageModalBox = forwardRef((_, ref) => {
	return (
		<>
			{/* <div className="address_form_group">
				<input type="text" placeholder="Product Name" />
			</div> */}
			<div className="address_form_group">
				<textarea
					style={{ height: "150px" }}
					placeholder="Your Query"
				></textarea>
			</div>
			<div
				style={{
					borderTop: "1px solid #ebebeb",
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-end",
				}}
			>
				<button
					className="address_form_button_group cancel"
					onClick={() => ref.current.classList.remove("active")}
				>
					Cancel
				</button>
				<button className="address_form_button_group">Send</button>
			</div>

			<style jsx>{`
				@media (max-width: 430px) {
					.address_form_button_group {
						font-size: 13px;
					}
				}
			`}</style>
		</>
	);
});

MessageModalBox.displayName = "MessageModalBox";

export default MessageModalBox;

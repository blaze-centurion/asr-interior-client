import styles from "@/styles/Contact.module.css";
import axios from "axios";
import { SERVER_URL } from "config/config";
import { GlobalUserContext } from "pages/_app";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import validator from "validator";

const Contact = () => {
	const { currUserInfo } = useContext(GlobalUserContext);
	const [input, setInput] = useState({
		name: currUserInfo.name,
		phone: currUserInfo.phone,
		message: "",
	});
	const sendMessage = async (e) => {
		e.preventDefault();
		if (!validator.isMobilePhone(input.phone))
			return toast.error("Please fill valid phone number.");
		const res = await toast.promise(
			axios.patch(`${SERVER_URL}/contactToASR`, {
				...input,
			}),
			{
				pending: "Sending your message...",
				success: "Message send successfully. We'll contact you back.",
				error: "Something went wrong. Please try again.",
			}
		);
		if (res.status === 200) setInput({ name: "", phone: "", message: "" });
	};

	const handleInput = (e) => {
		setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	return (
		<>
			<section id="contact" className={styles.contact_section}>
				<div className={styles.contact_form_container}>
					<h3 className={styles.card_title}>Contact Us</h3>
					<div className={styles.card_content}>
						<h4>Phone Number: +91 9811212512</h4>
						<h4>Or</h4>
						<h4>Email Us:</h4>
						<form onSubmit={sendMessage}>
							<div className={styles.form_group}>
								<label htmlFor="name_input">Your Name</label>
								<input
									type="text"
									id="name_input"
									placeholder="Enter Your Name"
									name="name"
									value={input.name}
									onChange={handleInput}
								/>
							</div>
							<div className={styles.form_group}>
								<label htmlFor="phone_input">Your Phone</label>
								<input
									type="text"
									id="phone_input"
									placeholder="Enter Your Phone"
									name="phone"
									value={input.phone}
									onChange={handleInput}
								/>
							</div>
							<div className={styles.form_group}>
								<label htmlFor="email_to_input">Email To</label>
								<input
									type="text"
									id="email_to_input"
									value="vijaysharma09811@gmail.com"
									readOnly
									style={{ cursor: "not-allowed" }}
								/>
							</div>
							<div className={styles.form_group}>
								<label htmlFor="msg_input">Your Message</label>
								<textarea
									id="msg_input"
									placeholder="Enter Your Message"
									name="message"
									value={input.message}
									onChange={handleInput}
								></textarea>
							</div>
							<input type="submit" value="Submit" />
						</form>
					</div>
				</div>
			</section>
		</>
	);
};

export default Contact;

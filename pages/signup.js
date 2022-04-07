import { SERVER_URL } from "config/config";
import { ToastContainer, toast } from "react-toastify";
import { useContext, useState } from "react";
import axios from "axios";
import CallIcon from "@mui/icons-material/Call";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import LockIcon from "@mui/icons-material/Lock";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailIcon from "@mui/icons-material/MailOutlineOutlined";
import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import validator from "validator";

import signUpPic from "@/public/signup.svg";
import styles from "@/styles/Login.Signup.module.css";

import { GlobalUserContext } from "./_app";

const Signup = () => {
	const [users, setUsers] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
		cpassword: "",
	});
	const { currUserInfo } = useContext(GlobalUserContext);

	const handleInput = (event) => {
		const { name, value } = event.target;
		setUsers({ ...users, [name]: value });
	};

	const signUpUser = async (e) => {
		e.preventDefault();

		if (
			!users.name ||
			!users.email ||
			!users.password ||
			!users.cpassword ||
			!users.phone
		)
			return toast.error("Please fill all the required fields.");
		if (users.password !== users.cpassword)
			return toast.error(
				"Please enter same password in both the fields."
			);
		if (
			!validator.isMobilePhone(users.phone) ||
			!validator.isEmail(users.email)
		) {
			return toast.error("Enter a valid phone number and email.");
		}

		const res = await axios.post(`${SERVER_URL}/signUp`, {
			name: users.name,
			email: users.email,
			password: users.password,
			phone: users.phone,
		});

		if (res.status === 201) {
			toast.success(`User registered successfully.`);
			setUsers({
				name: "",
				email: "",
				password: "",
				phone: "",
				cpassword: "",
			});
		} else {
			toast.error(`Something went wrong. Please try again later.`);
		}
	};

	return (
		<>
			<Header />
			<ToastContainer position="bottom-left" />
			<div className={styles.box}>
				<section id={styles.signup_section}>
					<div className={styles.container}>
						<div className={styles.signupBx}>
							<div className={styles.formBx}>
								<form autoComplete="off" onSubmit={signUpUser}>
									<h2>Sign Up</h2>
									<div className={styles.form_div}>
										<label htmlFor="name">
											<PersonIcon />
										</label>
										<input
											type="text"
											placeholder="Your Name"
											value={users.name}
											onChange={handleInput}
											name="name"
											id="name"
										/>
									</div>
									<div className={styles.form_div}>
										<label htmlFor="email">
											<MailIcon />
										</label>
										<input
											type="email"
											placeholder="Your Email"
											value={users.email}
											onChange={handleInput}
											name="email"
											id="email"
										/>
									</div>
									<div className={styles.form_div}>
										<label htmlFor="phone">
											<CallIcon />
										</label>
										<input
											type="tel"
											placeholder="Your Phone No"
											value={users.phone}
											onChange={handleInput}
											name="phone"
											id="phone"
										/>
									</div>
									<div className={styles.form_div}>
										<label htmlFor="password">
											<LockIcon />
										</label>
										<input
											type="password"
											id="password"
											placeholder="Password"
											value={users.password}
											onChange={handleInput}
											name="password"
										/>
									</div>
									<div className={styles.form_div}>
										<label htmlFor="cpassword">
											<LockOutlinedIcon />
										</label>
										<input
											type="password"
											id="cpassword"
											placeholder="Confirm Password"
											value={users.cpassword}
											onChange={handleInput}
											name="cpassword"
										/>
									</div>
									<input
										type="submit"
										value="Sign Up"
										name="signup"
									/>
									{!currUserInfo.loggedIn && (
										<p className={styles.login_signup}>
											Already have an account.{" "}
											<Link href="/login">
												<a>Login.</a>
											</Link>
										</p>
									)}
								</form>
							</div>
							<div className={styles.imgBx}>
								<Image
									layout="fill"
									src={signUpPic}
									alt="Signup"
									priority={true}
								/>
							</div>
						</div>
					</div>
				</section>
			</div>

			<Footer />
		</>
	);
};

export default Signup;

import { SERVER_URL } from "config/config";
import { toast, ToastContainer } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import LockIcon from "@mui/icons-material/LockOutlined";
import MailIcon from "@mui/icons-material/MailOutlineOutlined";

import loginPic from "@/public/login.svg";
import styles from "@/styles/Login.Signup.module.css";
import { GlobalUserContext } from "./_app";
import { useRouter } from "next/router";
import axios from "axios";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { currUserInfo, setCurrUserInfo } = useContext(GlobalUserContext);
	const router = useRouter();

	const loginUser = async (e) => {
		e.preventDefault();

		if (!email || !password)
			return toast.error("Please fill all the required fields.");

		const res = await fetch(`${SERVER_URL}/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ email, password }),
		});

		const data = await res.json();
		if (res.status === 200) {
			document.cookie = `jwtoken=${data.token}; expires=${new Date(
				Date.now() + 25892000000
			)}`;
			setCurrUserInfo({
				email: data.data.email,
				name: data.data.name,
				phone: data.data.phone,
				loggedIn: true,
			});
			setPassword("");
			setEmail("");
			router.push("/");
		} else {
			toast.error(data.message);
		}
	};

	useEffect(() => {
		if (currUserInfo.loggedIn) router.push("/");
	}, [currUserInfo, router]);

	return (
		<>
			<Header />
			<ToastContainer position="bottom-left" />
			<div className={styles.box}>
				<section
					id={styles.signup_section}
					className={styles.login_section}
				>
					<div className={styles.container}>
						<div className={styles.signupBx}>
							<div className={styles.imgBx}>
								<Image src={loginPic} alt="Signup" />
							</div>
							<div className={styles.formBx}>
								<form autoComplete="off">
									<h2>Log In</h2>
									<div className={styles.form_div}>
										<label htmlFor="email">
											<MailIcon />
										</label>
										<input
											type="email"
											placeholder="Your Email"
											id="email"
											name="email"
											value={email}
											onChange={(event) =>
												setEmail(event.target.value)
											}
										/>
									</div>
									<div className={styles.form_div}>
										<label htmlFor="password">
											<LockIcon />
										</label>
										<input
											type="password"
											name="password"
											id="password"
											placeholder="Password"
											value={password}
											onChange={(event) =>
												setPassword(event.target.value)
											}
										/>
									</div>
									<input
										type="submit"
										value="Log In"
										onClick={loginUser}
									/>
									<p className={styles.login_signup}>
										Don&apos;t have an account ?{" "}
										<Link href="/signup">
											<a>Sign Up</a>
										</Link>
									</p>
								</form>
							</div>
						</div>
					</div>
				</section>
			</div>

			<Footer />
		</>
	);
};

export default Login;

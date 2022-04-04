import styles from "@/styles/Footer.module.css";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import facebook from "@/public/facebook.png";
import instagram from "@/public/instagram.png";
import pinterest from "@/public/pinterest.png";
import { GlobalUserContext } from "pages/_app";
import { useContext } from "react";
import { SERVER_URL } from "config/config";

const LinkBox = ({ children, headerTitle }) => {
	return (
		<>
			<div className={styles.link_box}>
				<h3 className={styles.header}>{headerTitle}</h3>
				<ul>{children}</ul>
			</div>
		</>
	);
};

const Footer = () => {
	const { currUserInfo, setCurrUserInfo } = useContext(GlobalUserContext);

	const logout = async (e) => {
		const res = await fetch(`${SERVER_URL}/logout`, {
			method: "GET",
			credentials: "include",
		});
		if (res.status === 200)
			setCurrUserInfo({
				name: "",
				email: "",
				phone: "",
				loggedIn: false,
			});
	};

	return (
		<>
			<section className={styles.footer_container}>
				<div className={styles.footer_top}>
					<div className={styles.link_container}>
						<LinkBox headerTitle="Top Categories">
							<li>
								<Link href="/">
									<a>Beds</a>
								</Link>
							</li>
							<li>
								<Link href="/">
									<a>Beds</a>
								</Link>
							</li>
							<li>
								<Link href="/">
									<a>Beds</a>
								</Link>
							</li>
						</LinkBox>
						<LinkBox headerTitle="Contact Info">
							<li>
								<label>Address:</label>
								<h3 style={{ textTransform: "none" }}>Demo</h3>
							</li>
							<li>
								<label>Phone:</label>
								<h3>+91 9811212512</h3>
							</li>
							<li>
								<label>Email:</label>
								<h3 style={{ textTransform: "none" }}>
									vijaysharma09811@gmail.com
								</h3>
							</li>
						</LinkBox>
						<LinkBox headerTitle="Quick Links">
							<li>
								<Link href="/">
									<a>Terms &amp; Conditions</a>
								</Link>
							</li>
							<li>
								<Link href="/">
									<a>Privacy Policy</a>
								</Link>
							</li>
							<li>
								<Link href="/about">
									<a>About Us</a>
								</Link>
							</li>
							<li>
								<Link href="/gallery">
									<a>Gallery</a>
								</Link>
							</li>
							<li>
								<Link href="/#services">
									<a>Services</a>
								</Link>
							</li>
						</LinkBox>
						<LinkBox headerTitle="My Account">
							<li>
								{currUserInfo.loggedIn ? (
									<Link href="/">
										<a onClick={logout}>Log out</a>
									</Link>
								) : (
									<Link href="/login">
										<a>Login</a>
									</Link>
								)}
							</li>
							<li>
								<Link href="/orders">
									<a>Order History</a>
								</Link>
							</li>
							<li>
								<Link href="/wishlist">
									<a>My Wishlist</a>
								</Link>
							</li>
							<li>
								<Link href="/cart">
									<a>My Cart</a>
								</Link>
							</li>
						</LinkBox>
					</div>
				</div>
				<div className={styles.footer_bottom}>
					<div className={styles.logo}>
						<Image
							src={logo}
							alt="ASR Interior Logo"
							width="60px"
							height="60px"
						/>
					</div>
					<p>© ASR Interior 2022</p>
					<div className={styles.social_icons}>
						<Link href="/">
							<a>
								<Image
									src={facebook}
									alt="Facebook"
									width="30px"
									height="30px"
								/>
							</a>
						</Link>
						<Link href="/">
							<a>
								<Image
									src={instagram}
									alt="Instagram"
									width="30px"
									height="30px"
								/>
							</a>
						</Link>
						<Link href="/">
							<a>
								<Image
									src={pinterest}
									alt="Pinterest"
									width="30px"
									height="30px"
								/>
							</a>
						</Link>
					</div>
				</div>
			</section>
		</>
	);
};

export default Footer;

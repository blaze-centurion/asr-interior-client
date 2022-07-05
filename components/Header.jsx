import styles from "@/styles/Header.module.css";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useContext, useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import CatMenuItem from "./CatMenuItem";
import { GlobalUserContext } from "pages/_app";
import { SERVER_URL } from "config/config";
import axios from "axios";
import pusherJs from "pusher-js";
import avatar from "@/public/avatar.png";
import menu from "@/public/menu (1).png";

const Header = () => {
	const router = useRouter();
	const searchInputRef = useRef();
	const searchInput = useRef();
	const { currUserInfo } = useContext(GlobalUserContext);
	const [categories, setCategories] = useState([]);
	const [cartLen, setCartLen] = useState(0);
	const [wishlistLen, setWishlistLen] = useState(0);
	const [notificationLen, setNotificationLen] = useState(0);
	const [profileItemState, setProfileItemState] = useState(false);
	const [hamburderMenuState, setHamburderMenuState] = useState(false);

	const logout = async () => {
		const res = await axios.get(`${SERVER_URL}/logout`, {
			withCredentials: true,
		});
		if (res.status === 200) {
			window.location.reload();
		}
	};

	useEffect(() => {
		async function getCategories() {
			try {
				const res = await axios.get(
					`${SERVER_URL}/getParentCategories`
				);
				if (res.status !== 200) return false;
				setCategories(res.data.data);
			} catch (err) {
				return false;
			}
		}
		async function getUserCartAndWishlistLen() {
			try {
				const res = await axios.get(
					`${SERVER_URL}/getUserCartAndWishLen`,
					{
						withCredentials: true,
					}
				);
				const data = res.data.data;
				setWishlistLen(data.wishlistLen);
				setCartLen(data.cartLen);
			} catch (err) {
				return false;
			}
		}

		async function getUnseenNotificationsLen() {
			const res = await axios.get(
				`${SERVER_URL}/getUnseenNotificationsLen`,
				{ withCredentials: true }
			);
			setNotificationLen(res.data.data);
		}

		getUnseenNotificationsLen();
		getCategories();
		getUserCartAndWishlistLen();

		function closeAllMenu() {
			setProfileItemState(false);
			setHamburderMenuState(false);
		}
		window.addEventListener("click", closeAllMenu);

		return () => {
			window.removeEventListener("click", closeAllMenu);
		};
	}, []);

	useEffect(() => {
		const pusher = new pusherJs(process.env.NEXT_PUBLIC_PUSHER_KEY, {
			cluster: "ap2",
		});
		const userChannel = pusher.subscribe("users");
		const notificationChannel = pusher.subscribe("notifications");
		userChannel.bind("update", (change) => {
			setCartLen(change.cart.length);
			setWishlistLen(change.wishlist.length);
		});
		notificationChannel.bind("insert", (change) => {
			if (!change.notification.seen)
				setNotificationLen((prev) => prev + 1);
		});

		return () => {
			userChannel.unbind_all();
			userChannel.unsubscribe();
			notificationChannel.unbind_all();
			notificationChannel.unsubscribe();
		};
	}, [cartLen, wishlistLen, notificationLen]);

	return (
		<>
			<div className="search_overlay" ref={searchInputRef}>
				<button
					className="close_btn"
					onClick={() =>
						searchInputRef.current.classList.remove("active")
					}
				>
					<CloseIcon />
				</button>
				<div>
					<form
						className="search_bar"
						onSubmit={(e) => {
							e.preventDefault();
							router.push({
								pathname: "/search",
								query: { q: searchInput.current.value },
							});
							searchInputRef.current.classList.remove("active");
						}}
					>
						<input
							ref={searchInput}
							type="text"
							placeholder="Search and press enter"
						/>
						<button type="submit">
							<SearchIcon />
						</button>
					</form>
				</div>
			</div>
			<div className={styles.navbar}>
				<div className={styles.logo}>
					<Link href="/">
						<a>
							<Image src={logo} alt="Logo" />
						</a>
					</Link>
				</div>
				<ul className={styles.menu_items}>
					<li className={styles.menu_item}>
						<Link href="/">
							<a
								className={
									router.asPath === "/"
										? styles.active
										: undefined
								}
							>
								Home
							</a>
						</Link>
					</li>
					<li className={styles.menu_item}>
						<Link href="/about">
							<a
								className={
									router.asPath === "/about"
										? styles.active
										: undefined
								}
							>
								About Us
							</a>
						</Link>
					</li>
					<li className={styles.menu_item}>
						<Link href="/#services">
							<a
								className={
									router.asPath === "/#services"
										? styles.active
										: undefined
								}
							>
								Services
							</a>
						</Link>
					</li>
					<li className={styles.menu_item}>
						<Link href="/gallery">
							<a
								className={
									router.asPath === "/gallery"
										? styles.active
										: undefined
								}
							>
								Gallery
							</a>
						</Link>
					</li>
					<li className={styles.menu_item}>
						<Link href="/#contact">
							<a
								className={
									router.asPath === "/#contact"
										? styles.active
										: undefined
								}
							>
								Contact Us
							</a>
						</Link>
					</li>
					{currUserInfo.loggedIn ? null : (
						<li className={styles.menu_item}>
							<Link href="/login">
								<a
									className={
										router.asPath === "/login"
											? styles.active
											: undefined
									}
								>
									Login
								</a>
							</Link>
						</li>
					)}
					<li className={styles.menu_item}>
						<Link href="/signup">
							<a
								className={`${styles.signUp} ${
									router.asPath === "/signup"
										? styles.active
										: undefined
								}`}
							>
								Sign Up
							</a>
						</Link>
					</li>
				</ul>
				<ul className={styles.menu_btns}>
					<li>
						<button
							title="Search"
							onClick={() =>
								searchInputRef.current.classList.add("active")
							}
						>
							<SearchIcon className={styles.btn_icon} />
						</button>
					</li>
					{!currUserInfo.loggedIn ? (
						<>
							<li>
								<Link href="/wishlist">
									<a
										title="Your Wishlist"
										className={
											router.asPath === "/wishlist"
												? styles.active
												: undefined
										}
									>
										<FavoriteBorderIcon
											className={styles.btn_icon}
										/>
										<span className={styles.badge}>
											{wishlistLen}
										</span>
									</a>
								</Link>
							</li>
							<li>
								<Link href="/cart">
									<a
										title="Your Cart"
										className={
											router.asPath === "/cart"
												? styles.active
												: undefined
										}
									>
										<ShoppingCartOutlinedIcon
											className={styles.btn_icon}
										/>
										<span className={styles.badge}>
											{cartLen}
										</span>
									</a>
								</Link>
							</li>
						</>
					) : (
						<li
							className={`${styles.profile_item} ${
								profileItemState ? styles.active : "non-active"
							}`}
							onClick={(e) => {
								e.stopPropagation();
								setProfileItemState((prev) => !prev);
							}}
						>
							<div className={styles.avatar}>
								<Image src={avatar} alt="Avatar" />
							</div>
							<ul className={styles.menu_box}>
								<li>
									<Link href="/dashboard">
										<a>
											<DesktopWindowsIcon
												className={styles.ico}
											/>{" "}
											My Panel
										</a>
									</Link>
								</li>
								<li>
									<Link href="/wishlist">
										<a>
											<FavoriteBorderIcon
												className={styles.ico}
											/>
											My Wishlist
											<span>{wishlistLen}</span>
										</a>
									</Link>
								</li>
								<li>
									<Link href="/cart">
										<a>
											<ShoppingCartOutlinedIcon
												className={styles.ico}
											/>
											My Cart
											<span>{cartLen}</span>
										</a>
									</Link>
								</li>
								<li>
									<Link href="/notifications">
										<a>
											<NotificationsNoneOutlinedIcon
												className={styles.ico}
											/>
											Notifications
											<span>{notificationLen}</span>
										</a>
									</Link>
								</li>
								<li>
									<Link href="/">
										<a onClick={logout}>
											<LogoutIcon
												className={styles.ico}
											/>
											Log Out
										</a>
									</Link>
								</li>
							</ul>
						</li>
					)}

					<li
						className={`${styles.profile_item} ${styles.mediaq} ${
							profileItemState ? styles.active : "non-active"
						}`}
						onClick={(e) => {
							e.stopPropagation();
							setProfileItemState((prev) => !prev);
						}}
					>
						<div className={styles.avatar}>
							<Image src={avatar} alt="Avatar" />
						</div>
						<ul className={styles.menu_box}>
							<li>
								<Link href="/dashboard">
									<a>
										<DesktopWindowsIcon
											className={styles.ico}
										/>{" "}
										My Panel
									</a>
								</Link>
							</li>
							<li>
								<Link href="/wishlist">
									<a>
										<FavoriteBorderIcon
											className={styles.ico}
										/>
										My Wishlist
										<span>{wishlistLen}</span>
									</a>
								</Link>
							</li>
							<li>
								<Link href="/cart">
									<a>
										<ShoppingCartOutlinedIcon
											className={styles.ico}
										/>
										My Cart
										<span>{cartLen}</span>
									</a>
								</Link>
							</li>
							<li>
								<Link href="/notifications">
									<a>
										<NotificationsNoneOutlinedIcon
											className={styles.ico}
										/>
										Notifications
										<span>{notificationLen}</span>
									</a>
								</Link>
							</li>
							<li>
								<Link href="/">
									<a onClick={logout}>
										<LogoutIcon className={styles.ico} />
										Log Out
									</a>
								</Link>
							</li>
						</ul>
					</li>
					<li
						className={`${styles.hamburger_menu} ${
							styles.profile_item
						} ${
							hamburderMenuState ? styles.hamactive : "non-active"
						}`}
						onClick={(e) => {
							e.stopPropagation();
							setHamburderMenuState((prev) => !prev);
						}}
					>
						<div className={`${styles.avatar} ${styles.nonborder}`}>
							<Image src={menu} alt="Avatar" />
						</div>
						<ul className={styles.menu_box}>
							<li>
								<Link href="/">
									<a>Home</a>
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
								<Link href="/#contact">
									<a>Contact Us</a>
								</Link>
							</li>
							{!currUserInfo.loggedIn && (
								<li>
									<Link href="/login">
										<a>Login</a>
									</Link>
								</li>
							)}
							<li>
								<Link href="/signup">
									<a>Sign Up</a>
								</Link>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<div className={styles.cat_navbar}>
				<ul>
					{categories.length > 0 ? (
						categories.map((cat, ind) => {
							return (
								<CatMenuItem
									link={`/gallery/${cat.name.toLowerCase()}`}
									title={cat.name}
									key={ind}
								/>
							);
						})
					) : (
						<li>
							<Link href="/">
								<a>Loading....</a>
							</Link>
						</li>
					)}
				</ul>
			</div>
		</>
	);
};

export default Header;

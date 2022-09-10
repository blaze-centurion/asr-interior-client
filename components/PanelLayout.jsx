import styles from "@/styles/PanelLayout.module.css";
import menuImg from "@/public/menu.png";
import userImg from "@/public/user.jpg";
import Image from "next/image";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { GlobalUserContext } from "pages/_app";
import CloseIcon from "@mui/icons-material/Close";

const PanelLayout = ({ children, topBarTitle }) => {
	const router = useRouter();
	const { currUserInfo } = useContext(GlobalUserContext);
	const [sidebarActive, setSidebarActive] = useState(false);

	return (
		<>
			<div className={styles.panelLayoutContainer}>
				<div
					className={`${styles.sidebar} ${
						sidebarActive ? styles.active : null
					}`}
				>
					<div className={styles.sidebar_topBox}>
						<div style={{ textAlign: "center" }}>
							<Image
								className={styles.img}
								src={
									currUserInfo.profilePic
										? currUserInfo.profilePic.url
											? currUserInfo.profilePic.url
											: userImg
										: userImg
								}
								width={64}
								height={64}
								alt={currUserInfo.name}
							/>
						</div>
						<button
							onClick={() => setSidebarActive(false)}
							className={styles.closeBtn}
						>
							<CloseIcon />
						</button>
						<h3 className={styles.userName}>{currUserInfo.name}</h3>
						<h4 className={styles.userEmail}>
							{currUserInfo.email}
						</h4>
						<h4 className={styles.userEmail}>
							{currUserInfo.phone && `+91 ${currUserInfo.phone}`}
						</h4>
					</div>
					<ul className={styles.menu_item_container}>
						<li
							className={`${styles.menu_item} ${
								router.asPath === "/dashboard"
									? styles.active
									: ""
							}`}
						>
							<HomeOutlinedIcon className={styles.item_icon} />
							<Link href="/dashboard">
								<a>Dashboard</a>
							</Link>
						</li>
						<li
							className={`${styles.menu_item} ${
								router.asPath === "/wishlist"
									? styles.active
									: ""
							}`}
						>
							<FavoriteBorderOutlinedIcon
								className={styles.item_icon}
							/>
							<Link href="/wishlist">
								<a>Wishlist</a>
							</Link>
						</li>
						<li
							className={`${styles.menu_item} ${
								router.asPath === "/orders" ? styles.active : ""
							}`}
						>
							<LocalShippingOutlinedIcon
								className={styles.item_icon}
							/>
							<Link href="/orders">
								<a>Orders</a>
							</Link>
						</li>
						<li
							className={`${styles.menu_item} ${
								router.asPath === "/conversations"
									? styles.active
									: ""
							}`}
						>
							<CommentOutlinedIcon className={styles.item_icon} />
							<Link href="/conversations">
								<a>Conversations</a>
							</Link>
						</li>
						<li
							className={`${styles.menu_item} ${
								router.asPath === "/notifications"
									? styles.active
									: ""
							}`}
						>
							<NotificationsNoneOutlinedIcon
								className={styles.item_icon}
							/>
							<Link href="/notifications">
								<a>Notifications</a>
							</Link>
						</li>
						<li
							className={`${styles.menu_item} ${
								router.asPath === "/settings"
									? styles.active
									: ""
							}`}
						>
							<SettingsOutlinedIcon
								className={styles.item_icon}
							/>
							<Link href="/settings">
								<a>Settings</a>
							</Link>
						</li>
					</ul>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							borderTop: "1px solid #ebebeb",
							padding: "10px 0",
						}}
					>
						<Link href="/#contact" passHref>
							<button>Contact Us</button>
						</Link>
					</div>
				</div>
				<div className={styles.main_container}>
					<div className={styles.topBar}>
						<button
							onClick={() => setSidebarActive((prev) => !prev)}
						>
							<Image src={menuImg} alt="menu icon"></Image>
						</button>
						<h3>{topBarTitle}</h3>
					</div>

					{children}
				</div>
			</div>
		</>
	);
};

export default PanelLayout;

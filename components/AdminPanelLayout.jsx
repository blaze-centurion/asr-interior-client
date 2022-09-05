import styles from "@/styles/AdminPanel/admin.module.css";
import logo from "@/public/logo.png";
import Image from "next/image";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import SidebarMenuItem from "@/components/SidebarMenuItem";
import menu from "@/public/menu.png";
import user from "@/public/user.jpg";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import AbcOutlinedIcon from "@mui/icons-material/AbcOutlined";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useRef } from "react";
import Link from "next/link";

const MENU_LINK_DATA = [
	{
		title: "Dashboard",
		icon: <HomeOutlinedIcon className={styles.icon} />,
		link: "/admin/dashboard",
		dropdown: [],
	},
	{
		title: "Products",
		icon: <ShoppingCartOutlinedIcon className={styles.icon} />,
		link: "/admin/dashboard",
		dropdown: [
			{
				title: "All Products",
				link: "/admin/product",
			},
			{
				title: "Add New Product",
				link: "/admin/product/newProduct",
			},
			{
				title: "Product Reviews",
				link: "/admin/dashboard",
			},
		],
	},
	{
		title: "Category",
		icon: <SummarizeOutlinedIcon className={styles.icon} />,
		link: "/admin/category",
		dropdown: [],
	},
	{
		title: "Variations",
		icon: <AbcOutlinedIcon className={styles.icon} />,
		link: "/admin/variations",
		dropdown: [],
	},
	{
		title: "Sales",
		icon: <MonetizationOnOutlinedIcon className={styles.icon} />,
		link: "/admin/sales",
		dropdown: [],
	},
	{
		title: "Customers",
		icon: <PersonOutlinedIcon className={styles.icon} />,
		link: "/admin/customers",
		dropdown: [],
	},
	{
		title: "Notifications",
		icon: <NotificationsNoneOutlinedIcon className={styles.icon} />,
		link: "/admin/notifications",
		dropdown: [],
	},
	{
		title: "Website Setup",
		icon: <DesktopWindowsOutlinedIcon className={styles.icon} />,
		link: "/admin/notifications",
		dropdown: [],
	},
];

const AdminPanelLayout = ({ children }) => {
	const sidebarRef = useRef();

	return (
		<>
			<div className={styles.admin_panel}>
				<div
					className={`${styles.sidebar} ${styles.active}`}
					ref={sidebarRef}
				>
					<div className={styles.logo}>
						<button
							className={styles.closeBtn}
							onClick={() =>
								sidebarRef.current.classList.toggle(
									styles.active
								)
							}
						>
							<CloseIcon />
						</button>
						<Link href="/">
							<a>
								<Image src={logo} alt="logo" />
							</a>
						</Link>
					</div>
					<div className={styles.menuBox}>
						<ul>
							{MENU_LINK_DATA.map((data, index) => (
								<SidebarMenuItem
									key={index}
									title={data.title}
									link={data.link}
									dropdown={data.dropdown}
									icon={data.icon}
								/>
							))}
						</ul>
					</div>
				</div>
				<div className={styles.main_container}>
					<div className={styles.topbar}>
						<button
							className={styles.toggleBtn}
							onClick={() =>
								sidebarRef.current.classList.toggle(
									styles.active
								)
							}
						>
							<Image
								src={menu}
								alt="menu"
								width="24px"
								height="24px"
							/>
						</button>
						<div className={styles.userDetails}>
							<NotificationsNoneOutlinedIcon
								className={styles.notification}
							/>
							<div>
								<Image
									src={user}
									alt="user"
									className={styles.avatar}
									width="40px"
									height="40px"
								/>
								<span>
									<p className={styles.name}>admin</p>
									<p className={styles.role}>admin</p>
								</span>
							</div>
						</div>
					</div>
					<div style={{ width: "100%", height: "100%" }}>
						{children}
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminPanelLayout;

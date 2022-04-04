import Link from "next/link";
import { useState } from "react";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import styles from "@/styles/AdminPanel/admin.module.css";

const SidebarMenuItem = ({ title, link, dropdown, icon }) => {
	const [active, setActive] = useState(false);
	return (
		<>
			<li className={active ? styles.active : undefined}>
				<div className={styles.item}>
					{icon}
					<Link href={link}>
						<a
							onClick={(e) => {
								if (dropdown.length > 0) e.preventDefault();
							}}
						>
							{title}
						</a>
					</Link>
					{dropdown.length > 0 ? (
						<KeyboardArrowDownOutlinedIcon
							className={styles.arrow_icon}
							onClick={() => setActive((prev) => !prev)}
						/>
					) : (
						""
					)}
				</div>
				<ul className={styles.submenu}>
					{dropdown.map((val, ind) => {
						return (
							<li key={ind}>
								<Link href={val.link}>
									<a>{val.title}</a>
								</Link>
							</li>
						);
					})}
				</ul>
			</li>
		</>
	);
};

export default SidebarMenuItem;

import { ClipLoader } from "react-spinners";
import { numberWithCommas } from "utils/utils";
import { SERVER_URL } from "config/config";
import { useEffect } from "react";
import { useState } from "react";
import AdminPanelLayout from "@/components/AdminPanelLayout";
import axios from "axios";
import BadgeCard from "@/components/BadgeCard";

import styles from "@/styles/AdminPanel/Dashboard.module.css";

const Dashboard = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		async function getRevenue() {
			const res = await axios.get(`${SERVER_URL}/getAdminDashboardData`);
			if (res.status === 200) {
				setData(res.data.data);
			}
		}
		getRevenue();
	}, []);

	if (!data) {
		return (
			<>
				<AdminPanelLayout>
					<div
						style={{
							width: "100%",
							height: "50vh",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<ClipLoader size="80px" color="#ff6d6d" />
					</div>
				</AdminPanelLayout>
			</>
		);
	}

	return (
		<>
			<AdminPanelLayout>
				<div className={styles.dashboard_container}>
					<div className={styles.card_container}>
						<BadgeCard
							bgColorStyle={{
								backgroundColor: "#eb4786",
								background:
									"linear-gradient(315deg, #eb4786 0%, #b854a6 74%)",
							}}
							title="Total Sales"
							number={data.totalSales}
						/>
						<BadgeCard
							bgColorStyle={{
								backgroundColor: "#ffb72c",
								background:
									"linear-gradient(315deg, #ffb72c 0%, #f57f59 74%)",
							}}
							title="Total Revenue Generated"
							number={`₹${numberWithCommas(data.totalRevenue)}`}
						/>
						<BadgeCard
							bgColorStyle={{
								backgroundColor: "#47c5f4",
								background:
									"linear-gradient(315deg, #47c5f4 0%, #6791d9 74%)",
							}}
							title="Total Customers"
							number={data.customers}
						/>
						<BadgeCard
							bgColorStyle={{
								backgroundColor: "#875fc0",
								background:
									"linear-gradient(315deg, #875fc0 0%, #5346ba 74%)",
							}}
							title="Total Products"
							number={data.products}
						/>
					</div>
				</div>
			</AdminPanelLayout>
		</>
	);
};

export default Dashboard;

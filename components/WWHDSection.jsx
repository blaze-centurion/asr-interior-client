import styles from "@/styles/WWHD_WCU_Section.module.css";
import CountUp from "react-countup";
import home from "@/public/house.png";
import renovated_home from "@/public/renovated_house.png";
import furnitures from "@/public/furniture.png";
import Image from "next/image";
import Fade from "react-reveal/Fade";
import VisibilitySensor from "react-visibility-sensor";

const WWHDSection = () => {
	return (
		<>
			<div
				className={`${styles.section_container} ${styles.wwhdSection}`}
			>
				<h3
					className={`section_title ${styles.secTitle}`}
					style={{ marginBottom: "0" }}
				>
					What We have done?
				</h3>
				<div className={styles.item_container}>
					<Fade bottom>
						<div className={styles.counter_item}>
							<Image
								src={home}
								alt="New House"
								width={55}
								height={55}
							/>
							<CountUp
								start={0}
								end={80}
								duration={1.5}
								preserveValue={true}
								decimal=","
								suffix="+"
								className={styles.countUp}
							>
								{({ countUpRef, start }) => (
									<VisibilitySensor
										onChange={start}
										delayedCall
									>
										<span
											ref={countUpRef}
											className={styles.countUp}
										/>
									</VisibilitySensor>
								)}
							</CountUp>
							<h3>New house are constructed by ASR Interior.</h3>
						</div>
						<div className={styles.counter_item}>
							<Image
								src={renovated_home}
								alt="New House"
								width={55}
								height={55}
							/>
							<CountUp
								start={0}
								end={100}
								duration={1.5}
								preserveValue={true}
								decimal=","
								suffix="+"
								className={styles.countUp}
							>
								{({ countUpRef, start }) => (
									<VisibilitySensor
										onChange={start}
										delayedCall
									>
										<span
											ref={countUpRef}
											className={styles.countUp}
										/>
									</VisibilitySensor>
								)}
							</CountUp>
							<h3>
								Old house are turn into new one by ASR Interior.
							</h3>
						</div>
						<div className={styles.counter_item}>
							<Image
								src={furnitures}
								alt="New House"
								width={55}
								height={55}
							/>
							<CountUp
								start={0}
								end={300}
								duration={1.5}
								preserveValue={true}
								decimal=","
								suffix="+"
								className={styles.countUp}
							>
								{({ countUpRef, start }) => (
									<VisibilitySensor
										onChange={start}
										delayedCall
									>
										<span
											ref={countUpRef}
											className={styles.countUp}
										/>
									</VisibilitySensor>
								)}
							</CountUp>
							<h3>
								Modern Furnitures are build by ASR Interiors.
							</h3>
						</div>
					</Fade>
				</div>
			</div>
		</>
	);
};

export default WWHDSection;

import styles from "@/styles/Product.module.css";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Rating } from "react-simple-star-rating";

const TopSellingProductItem = ({
	src,
	pName,
	basePrice,
	discountedPrice,
	alt,
}) => {
	return (
		<>
			<li>
				<div>
					<Image src={src} alt={alt} width={100} height={90} />
				</div>
				<div className={styles.descBox}>
					<Link href="/">
						<a>{pName}</a>
					</Link>
					<br />
					<Rating size={15} initialValue={4} readonly={true} />
					<div className={styles.price_box}>
						<p className={styles.basePrice}>{basePrice}</p>
						<p className={styles.discountedPrice}>
							{discountedPrice}
						</p>
					</div>
				</div>
			</li>
		</>
	);
};

export default TopSellingProductItem;

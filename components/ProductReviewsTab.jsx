import styles from "@/styles/Product.module.css";
import Image from "next/image";
import user from "@/public/user.jpg";
import { Rating } from "react-simple-star-rating";
import React, { useEffect, useRef, useState } from "react";
import { SERVER_URL } from "config/config";
import ModalBox from "./ModalBox";
import { toast } from "react-toastify";

const ProductReviewsTab = ({ reviews, pid }) => {
	const modalRef = useRef();
	const [ratingValue, setRatingValue] = useState();
	const [reviewDesc, setReviewDesc] = useState("");

	const addNewReview = async () => {
		if (ratingValue === 0 || !reviewDesc)
			return toast.error("Please fill all the required fields.");
		const res = await fetch(`${SERVER_URL}/addNewReview`, {
			method: "PATCH",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				rating: ratingValue / 20,
				review: reviewDesc,
				pid,
			}),
		});

		if (res.status === 200) {
			window.location.reload();
		} else {
			toast.error("Something went wrong. Please try again!");
		}
	};

	return (
		<>
			<ModalBox
				headerTitle="Add new review"
				ref={modalRef}
				modalInnerStyle={{ width: "35vw", height: "auto" }}
			>
				<div className="address_form_group">
					<label>Review:</label>
					<textarea
						style={{ height: "150px" }}
						placeholder="Write your review here..."
						value={reviewDesc}
						onChange={(e) => setReviewDesc(e.target.value)}
					></textarea>
				</div>
				<div className="address_form_group">
					<label>Ratings:</label>
					<Rating
						size="30"
						transition
						onClick={(r) => setRatingValue(r)}
						ratingValue={ratingValue}
						allowHalfIcon
					/>
				</div>
				<div
					style={{
						borderTop: "1px solid #ebebeb",
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-end",
					}}
				>
					<button
						className="address_form_button_group cancel"
						onClick={() =>
							modalRef.current.classList.remove("active")
						}
					>
						Cancel
					</button>
					<button
						className="address_form_button_group"
						onClick={addNewReview}
					>
						Save
					</button>
				</div>
			</ModalBox>

			{reviews.length > 0 ? (
				reviews.map((review, ind) => {
					const date = new Date(review.date);
					return (
						<React.Fragment key={ind}>
							<div className={styles.reviewItem}>
								<div className={styles.imageBox}>
									<Image
										src={user}
										layout="fill"
										alt={review.userName}
									/>
								</div>
								<div className={styles.content}>
									<div className={styles.userDetails}>
										<div style={{ flex: "1" }}>
											<h3 className={styles.username}>
												{review.userName}
											</h3>
											<h4 className={styles.date}>
												{`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}
											</h4>
										</div>
										<Rating
											readonly
											initialValue={review.rating}
											size={15}
										/>
									</div>
									<p>{review.review}</p>
								</div>
							</div>
						</React.Fragment>
					);
				})
			) : (
				<div
					style={{
						display: "grid",
						placeItems: "center",
						fontSize: "16px",
						fontWeight: "500",
						fontFamily: "var(--poppins)",
					}}
				>
					No Reviews Yet.
				</div>
			)}

			<div className={styles.reviewBtnBox}>
				<button
					className={styles.reviewBtn}
					onClick={() => modalRef.current.classList.add("active")}
				>
					Add a Review
				</button>
			</div>
		</>
	);
};

export default ProductReviewsTab;

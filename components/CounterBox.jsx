import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CounterBox = ({ qty, setQty, stock, setTotalPrice, price }) => {
	return (
		<>
			<div className="counter_box">
				<button
					onClick={() => {
						if (qty > 1) {
							setQty((prev) => prev - 1);
							if (setTotalPrice)
								setTotalPrice((prev) => prev - price);
						}
					}}
				>
					<RemoveIcon className="ic" />
				</button>
				<input
					type="number"
					value={qty}
					onChange={(e) => {
						let p = parseInt(e.target.value);
						if (p <= stock && p > 0) {
							setQty(p);
							if (setTotalPrice)
								setTotalPrice((prev) => prev + price * p);
						} else {
							if (setTotalPrice)
								setTotalPrice((prev) => prev + price * qty);
						}
						// setQty((prev) => (p <= stock && p > 0 ? p : prev));
						// if (setTotalPrice)
						// 	setTotalPrice((prev) => prev + (price * qty));
					}}
				/>
				<button
					onClick={() => {
						if (qty < stock) {
							setQty((prev) => prev + 1);
							if (setTotalPrice)
								setTotalPrice((prev) => prev + price);
						}
					}}
				>
					<AddIcon className="ic" />
				</button>
			</div>
		</>
	);
};

export default CounterBox;

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRef, useState } from "react";

const Selectbox = ({
	options,
	placeholder,
	onClick,
	funcTwoParam,
	giveVal,
	selected,
}) => {
	const selectBoxRef = useRef();
	const [value, setValue] = useState(selected);

	return (
		<>
			<div
				className="selectBox"
				onClick={() => selectBoxRef.current.classList.toggle("active")}
				ref={selectBoxRef}
			>
				<KeyboardArrowDownIcon className="arrow_icon" />
				<p className={value ? "" : "placeholder"}>
					{value ? value : placeholder}
				</p>
				<ul>
					{options.map((option, index) => {
						return (
							<li
								key={index}
								onClick={() => {
									onClick(
										giveVal
											? option.value
											: option._id
											? option._id
											: option.value,
										funcTwoParam ? option._id : null
									);
									setValue(option.name);
								}}
							>
								{option.name}
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);
};

export default Selectbox;

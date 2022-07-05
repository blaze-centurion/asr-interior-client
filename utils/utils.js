import months from "data/months";

function getCurrentTime(date) {
	const currentDate = new Date(parseInt(date));
	var hour24 = currentDate.getHours();
	const meridiem = hour24 >= 12 ? "PM" : "AM";
	const hour = ((hour24 + 11) % 12) + 1;
	return `${
		months[currentDate.getMonth()]
	} ${currentDate.getDate()} ${currentDate.getFullYear()}, ${hour}:${currentDate.getMinutes()} ${meridiem}`;
}

const loadScript = (src) => {
	return new Promise((resolve) => {
		const script = document.createElement("script");
		script.src = src;
		script.onload = () => {
			resolve(true);
		};
		script.onerror = () => {
			resolve(false);
		};
		document.body.appendChild(script);
	});
};

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export { getCurrentTime, loadScript, numberWithCommas };

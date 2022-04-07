import img from "@/public/working_on_website.jpg";
import Image from "next/image";
import Link from "next/link";

const WorkingPage = () => {
	return (
		<>
			<div>
				<Image
					src={img}
					alt="Working on the page"
					height="450"
					width="700"
				/>
				<h1>Working on the page!</h1>
				<Link href="/">
					<a>Go to Home</a>
				</Link>
			</div>

			<style jsx>{`
				div {
					min-height: 50vh;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 2rem 0;
				}
				h1 {
					font-weight: 500;
					font-family: var(--poppins);
					font-size: 25px;
				}
				a {
					display: flex;
					align-items: center;
					justify-content: center;
					background: #fe6948;
					color: #fff;
					padding: 10px 20px;
					font-family: var(--poppins);
					font-size: 13px;
					border-radius: 10pc;
					margin: 10px 0;
				}
			`}</style>
		</>
	);
};

export default WorkingPage;

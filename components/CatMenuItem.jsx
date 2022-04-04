import Link from "next/link";

const CatMenuItem = ({ link, title }) => {
	return (
		<>
			<li>
				<Link href={link}>
					<a>{title}</a>
				</Link>
			</li>
		</>
	);
};

export default CatMenuItem;

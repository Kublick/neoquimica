import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";
import { useRouter } from "next/router";

const Header = ({ showSidebar, setShowSidebar }) => {
	const router = useRouter();

	const text = router.pathname;

	return (
		<>
			<nav className="px-3 py-6 bg-light-blue-500 md:ml-64">
				<div className="container flex items-center justify-between max-w-full mx-auto md:pr-8 md:pl-10">
					<div className="md:hidden">
						<Button
							color="transparent"
							buttonType="link"
							size="lg"
							iconOnly
							rounded
							ripple="light"
							onClick={() => setShowSidebar("left-0")}
						>
							<Icon name="menu" size="2xl" color="white" />
						</Button>
						<div
							className={`absolute top-2 md:hidden ${
								showSidebar === "left-0" ? "left-64" : "-left-64"
							} z-50 transition-all duration-300`}
						>
							<Button
								color="transparent"
								buttonType="link"
								size="lg"
								iconOnly
								rounded
								ripple="light"
								onClick={() => setShowSidebar("-left-64")}
							>
								<Icon name="close" size="2xl" color="white" />
							</Button>
						</div>
					</div>

					<div className="flex items-center justify-between w-full">
						<h4 className="mt-1 text-sm tracking-wider text-white uppercase">
							{text.substring(1)}
						</h4>

						<div className="flex">
							<div className="ml-6 -mr-4">
								<Dropdown
									color="transparent"
									buttonText={<div className="w-12 text-white">User</div>}
									rounded
									style={{
										padding: 0,
										color: "transparent",
									}}
								>
									<DropdownItem color="lightBlue">Logout</DropdownItem>
								</Dropdown>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Header;

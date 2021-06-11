import { useState } from "react";
import Link from "next/link";
import Icon from "@material-tailwind/react/Icon";
import H6 from "@material-tailwind/react/Heading6";
import { useRouter } from "next/router";
import Header from "./Header";

export default function Sidebar() {
	const router = useRouter();

	const [showSidebar, setShowSidebar] = useState("-left-64");

	return (
		<>
			<Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

			<div
				className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
			>
				<div className="relative flex-col items-stretch min-h-full px-0 flex-nowrap">
					<H6 color="gray">Menu</H6>
					<div className="flex flex-col">
						<hr className="min-w-full my-4" />
						<ul className="flex flex-col min-w-full list-none">
							{/* <li className="mb-4 rounded-lg">
								<div
									className={
										router.pathname === "/"
											? "flex items-center bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md gap-4 px-4 py-3 text-sm font-light rounded-lg"
											: "flex items-center gap-4 px-4 py-3 text-sm font-light text-gray-700 rounded-lg"
									}
								>
									<Icon name="dashboard" size="2xl" />
									<Link href="/">
										<a> Dashboard</a>
									</Link>
								</div>
							</li> */}

							<li className="mb-4 rounded-lg">
								<div
									className={
										router.pathname === "/pacientes"
											? "flex items-center bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md gap-4 px-4 py-3 text-sm font-light rounded-lg"
											: "flex items-center gap-4 px-4 py-3 text-sm font-light text-gray-700 rounded-lg"
									}
								>
									<Icon name="account_circle" size="2xl" />
									<Link href="/pacientes">
										<a>Pacientes</a>
									</Link>
								</div>
							</li>
							<li className="mb-4 rounded-lg">
								<div
									className={
										router.pathname === "/medicos"
											? "flex items-center bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md gap-4 px-4 py-3 text-sm font-light rounded-lg"
											: "flex items-center gap-4 px-4 py-3 text-sm font-light text-gray-700 rounded-lg"
									}
								>
									<Icon name="medical_services" size="2xl" />
									<Link href="/medicos">
										<a>Medicos</a>
									</Link>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}

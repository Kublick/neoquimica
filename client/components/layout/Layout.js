import { useState } from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
	const [showSidebar, setShowSidebar] = useState("-left-64");
	return (
		<>
			<Sidebar />
			<div className="md:ml-64">{children}</div>
		</>
	);
};

export default Layout;

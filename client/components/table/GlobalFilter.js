import Input from "@material-tailwind/react/Input";

const GlobalFilter = ({ filter, setFilter }) => {
	return (
		<div className="mb-8">
			<Input
				type="text"
				color="lightBlue"
				size="regular"
				value={filter || ""}
				placeholder="Busqueda"
				onChange={(e) => setFilter(e.target.value)}
			/>
		</div>
	);
};

export default GlobalFilter;

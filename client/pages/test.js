import Select from "react-select";

function Test() {
	const options = [
		{ value: "chocolate", label: "Chocolate" },
		{ value: "strawberry", label: "Strawberry" },
		{ value: "vanilla", label: "Vanilla" },
	];

	return (
		<>
			<div className="grid grid-cols-1 mb-4 lg:grid-cols-2 xl:grid-cols-4">
				<div>1</div>
				<div>2</div>
				<div>3</div>
				<div>4</div>
				<div>5</div>
				<div>6</div>
				<div>7</div>
				<div>8</div>
				<div>9</div>
			</div>
			<div className="grid h-64 grid-cols-2 gap-4 text-center bg-red-600">
				<div>1</div>
				<div>2</div>
				<div>3</div>
				<div>4</div>
				<div>5</div>
				<div>6</div>
				<div>7</div>
				<div>8</div>
				<div>9</div>
			</div>
		</>
	);
}

export default Test;

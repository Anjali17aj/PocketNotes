import { createContext, useState } from "react";

const PocketContext = createContext({
	notes: [],
	setNotes: () => {},
	selected: "",
	setSelected: () => {},
});

const Provider = ({ children }) => {
	const [selected, setSelected] = useState("");
	const [notes, setNotes] = useState([]);

	const valueToShare = {
		notes,
		setNotes,
		selected,
		setSelected,
	};

	return (
		<PocketContext.Provider value={valueToShare}>
			{children}
		</PocketContext.Provider>
	);
};

export { Provider };

export default PocketContext;

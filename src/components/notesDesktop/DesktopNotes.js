import React, { useEffect, useState, useRef } from "react";
import "./DesktopNotes.css";
import enter from "../../assets/icons/enter.png";
import enterB from "../../assets/icons/enter-b.png";
import DesktopNotesContent from "../notesContentDesktop/DesktopNotesContent";
import usePocketContext from "../../hooks/usePocketContext";

function DesktopNotes() {
	const [text, setText] = useState("");
	const [bgColor, setBgColor] = useState("#fff");
	const [initials, setInitials] = useState("");
	const [selectedTitle, setSelectedTitle] = useState("");
	const { notes, setNotes, selected } = usePocketContext();
	const lastNoteRef = useRef(null);

	useEffect(() => {
		const savedNotes = JSON.parse(localStorage.getItem(selected)) || [];
		setNotes(savedNotes);
		const groupNames = JSON.parse(localStorage.getItem("groupNames"));
		const selectedGroup = groupNames.find(
			(group) => group.name === selected
		);
		if (selectedGroup) {
			setBgColor(selectedGroup.color);
			setInitials(
				selectedGroup.name
					.split(" ")
					.map((word) => word.charAt(0))
					.join("")
					.toUpperCase()
			);
			setSelectedTitle(
				selectedGroup.name
					.split(" ")
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(" ")
			);
		}
	}, [selected, setNotes]);

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleSaveNotes();
		}
	};

	const handleSaveNotes = () => {
		if (!text.trim()) {
			return;
		}
		const savedNotes = JSON.parse(localStorage.getItem(selected)) || [];
		const newNoteObj = {
			id: Date.now(),
			title: selected,
			content: text.trim(),
			date: new Date().toLocaleDateString("en-GB", {
				day: "numeric",
				month: "numeric",
				year: "numeric",
			}),
			time: new Date().toLocaleTimeString(),
		};

		const updatedNotes = [...savedNotes, newNoteObj];
		localStorage.setItem(selected, JSON.stringify(updatedNotes));

		setNotes(updatedNotes);
		setText("");
	};

	const handleChange = (e) => {
		setText(e.target.value);
	};

	useEffect(() => {
		if (lastNoteRef.current) {
			lastNoteRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [notes]);

	return (
		<div className="desktop__notes">
			<div className="desktop__notes__title">
				<div
					className="desktop__notes__title__color"
					style={{ backgroundColor: bgColor }}
				>
					{initials}
				</div>
				<div className="desktop__notes__title__text">
					{selectedTitle}
				</div>
			</div>
			<div className="desktop__notes__content">
				{notes && notes.length > 0 ? (
					notes.map((note, index) => (
						<div
							key={note.id}
							ref={
								index === notes.length - 1 ? lastNoteRef : null
							}
						>
							<DesktopNotesContent note={note} />
						</div>
					))
				) : (
					<p>No notes available.</p>
				)}
			</div>
			<div className="desktop__notes__input">
				<textarea
					value={text}
					placeholder="Here’s the sample text for sample work"
					onChange={handleChange}
					onKeyDown={handleKeyDown}
				></textarea>
				{text ? (
					<img src={enterB} alt="enter" onClick={handleSaveNotes} />
				) : (
					<img src={enter} alt="enter" onClick={handleSaveNotes} />
				)}
			</div>
		</div>
	);
}

export default DesktopNotes;

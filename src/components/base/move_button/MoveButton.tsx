import "./MoveButton.css";

interface MoveButtonProps {
	onMove: () => void;
}

function MoveButton({ onMove }: MoveButtonProps) {
	return (
		<button type="button" onClick={onMove} className="btn-style-stone">
			Tour actuel
		</button>
	);
}

export default MoveButton;

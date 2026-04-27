interface MoveButtonProps {
	onMove: () => void;
}

function MoveButton({ onMove }: MoveButtonProps) {
	return (
		<button type="button" onClick={onMove}>
			Move tiles
		</button>
	);
}

export default MoveButton;

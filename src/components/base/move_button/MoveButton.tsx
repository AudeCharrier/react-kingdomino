interface MoveButtonProps {
	onMove: () => void;
}

function MoveButton({ onMove }: MoveButtonProps) {
	return (
		<button type="button" onClick={onMove}>
			Tour actuel
		</button>
	);
}

export default MoveButton;

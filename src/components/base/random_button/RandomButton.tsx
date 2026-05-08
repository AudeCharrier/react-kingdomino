interface RandomButtonProps {
	onDraw: () => void;
}

function RandomButton({ onDraw }: RandomButtonProps) {
	return (
		<button type="button" onClick={onDraw}>
			Tirer le prochain tour
		</button>
	);
}

export default RandomButton;

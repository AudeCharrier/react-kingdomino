/* import baseTilesArray from "../../../data/baseTiles"; */

interface RandomButtonProps {
	onDraw: () => void;
}

function RandomButton({ onDraw }: RandomButtonProps) {
	return (
		<button type="button" onClick={onDraw}>
			Draw 4 tiles
		</button>
	);
}

export default RandomButton;

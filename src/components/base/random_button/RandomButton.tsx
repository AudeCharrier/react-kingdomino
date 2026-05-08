import "./RandomButton.css";

interface RandomButtonProps {
	onDraw: () => void;
}

function RandomButton({ onDraw }: RandomButtonProps) {
	return (
		<button type="button" onClick={onDraw} className="btn-style-stone">
			Prochain tour
		</button>
	);
}

export default RandomButton;

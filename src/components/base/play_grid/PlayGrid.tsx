import "./PlayGrid.css";

//on évite le render de ça
const array: number[] = [];
for (let i = 1; i < 50; i++) {
	array[i] = i;
}
function PlayGrid() {
	return (
		<div className="play-grid">
			{array.map((cell) => (
				<div data-id={cell} key={cell} className="cell-play-grid">
					{cell}
				</div>
			))}
		</div>
	);
}

export default PlayGrid;

//supprimer le contenu de la div, c juste pour tester

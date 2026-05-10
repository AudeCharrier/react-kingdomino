import "./PlayGrid.css";

//on évite le re-render de ça :
const arrayCellId: number[] = [];
for (let i = 1; i < 50; i++) {
	arrayCellId[i] = i;
}
interface CellData {
	cellId: number;
	landscape: string;
	flames: number;
	volcanoFire?: number;
	resource?: string;
	alt: string;
	imgSrc: string;
	part: "left-part" | "right-part";
	rotation: number;
}

interface PlayGridProps {
	gridContent: { [key: string]: CellData };
}

function PlayGrid({ gridContent }: PlayGridProps) {
	return (
		<div className="board-container">
			<div className="play-grid">
				{arrayCellId.map((cellId) => {
					const infoTile = gridContent[cellId];

					return (
						<div key={cellId} className="cell-play-grid" data-cell-id={cellId}>
							{infoTile ? (
								<div
									className="img-container-single"
									style={{ transform: `rotate(${infoTile.rotation}deg)` }}
								>
									<div
										className={`placed-img-bg ${infoTile.part === "left-part" ? "left-part" : "right-part"}`}
										style={{ backgroundImage: `url(${infoTile.imgSrc})` }}
										data-landscape={infoTile.landscape}
										data-flames={infoTile.flames}
									></div>
								</div>
							) : null}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default PlayGrid;

//supprimer le contenu de la div, c juste pour tester

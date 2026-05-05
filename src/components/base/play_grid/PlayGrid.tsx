import "./PlayGrid.css";

//on évite le re-render de ça :
const array: number[] = [];
for (let i = 1; i < 50; i++) {
	array[i] = i;
}
interface CellData {
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
		<div className="play-grid">
			{array.map((cellId) => {
				const data = gridContent[cellId];

				return (
					<div key={cellId} className="cell-play-grid" data-cell-id={cellId}>
						{data ? (
							<div
								className="img-container-single"
								style={{ transform: `rotate(${data.rotation}deg)` }}
							>
								<div
									className={`placed-img-bg ${data.part === "left-part" ? "left-part" : "right-part"}`}
									style={{ backgroundImage: `url(${data.imgSrc})` }}
									data-landscape={data.landscape}
									data-flames={data.flames}
								></div>
							</div>
						) : (
							cellId
						)}
					</div>
				);
			})}
		</div>
	);
}

export default PlayGrid;

//supprimer le contenu de la div, c juste pour tester

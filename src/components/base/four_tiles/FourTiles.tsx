import { useState } from "react";
import BaseTile from "../base_tiles/BaseTile";
import "./FourTiles.css";

interface TileProps {
	id?: number; //pas olbigé d'exister dans l'objet de ce type, ou pas obligé d'être passé en prop
	imgSrcRecto: string;
	imgSrcVerso?: string;

	left: {
		landscape: string;
		flames: number;
		volcanoFire?: number;
		resource?: string;
		alt: string;
	};
	right: {
		landscape: string;
		flames: number;
		volcanoFire?: number;
		resource?: string;
		alt: string;
	};
}

interface NextTilesProps {
	tiles: TileProps[];
}

function FourTiles({ tiles }: NextTilesProps) {
	const [tilePosition, setTilePosition] = useState({ left: 0, top: 0 });
	const [dragged, setDragged] = useState<TileProps>();

	const visibilityTrueTile = {
		visibility: dragged ? "hidden" : "visible",
	};
	function PlayerMoveTile(e, tile) {
		const positionX = e.clientX;
		const positionY = e.clientY;
		setDragged(tile);
		setTilePosition({ left: positionX, top: positionY });
		return;
	}
	return (
		<>
			<div className="four-tiles-container">
				{tiles.map((tile) => (
					/*désactiver biome*/
					<div
						onMouseDown={(e) => PlayerMoveTile(e, tile)}
						style={visibilityTrueTile}
					>
						<BaseTile
							key={tile.id}
							id={tile.id}
							imgSrcRecto={tile.imgSrcRecto}
							left={tile.left}
							right={tile.right}
						/>
					</div>
				))}
			</div>
			{dragged && (
				<BaseTile
					id={dragged.id}
					imgSrcRecto={dragged.imgSrcRecto}
					left={dragged.left}
					right={dragged.right}
					style={{
						position: "fixed",
						left: tilePosition.left,
						top: tilePosition.top,
						pointerEvents: "none",
					}}
				/>
			)}
		</>
	);
}

export default FourTiles;

//onmousedown
//récup en event la position du pointeur
//actualiser position de départ tuile

//on mouse move
//créer un ghost
//hidden l'original
//recup infos pointeur
//le passer en state au ghost

/*sur app
onmousemove : 
récup e -> settileposition avec e

onmouseup : setdragged(false)   mais et l'original alors ??*/

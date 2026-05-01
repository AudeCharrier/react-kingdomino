import { useState } from "react";
import BaseTile from "../base_tiles/BaseTile";
import { useDrag } from "../../../contexts/DragContext";
import type React from "react";
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
	style?: React.CSSProperties;
}

interface NextTilesProps {
	tiles: TileProps[];
}

function FourTiles({
	tiles,
	draggable,
}: NextTilesProps & { draggable: boolean }) {
	const { dragged, setDragged, setTilePosition } = useDrag();

	function PlayerMoveTile(e: React.MouseEvent, tile: TileProps) {
		const positionX = e.clientX;
		const positionY = e.clientY;
		setDragged(tile);
		setTilePosition({ left: positionX, top: positionY });
		return;
	}

	return (
		<div className="four-tiles-container">
			{tiles.map((tile) => (
				<div
					key={tile.id}
					onMouseDown={draggable ? (e) => PlayerMoveTile(e, tile) : undefined}
					style={{ visibility: dragged?.id === tile.id ? "hidden" : "visible" }}
				>
					<BaseTile
						id={tile.id}
						imgSrcRecto={tile.imgSrcRecto}
						left={tile.left}
						right={tile.right}
					/>
				</div>
			))}
		</div>
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

//onMouseMove={(e) =>MovePositionTile(e)}


	function MovePositionTile(e: React.MouseEvent) {
		if(!dragged) {
		return
		}
		else {
		const positionX = e.clientX;
		const positionY = e.clientY;
		setTilePosition({ left: positionX, top: positionY });
		return;
	}
onmouseup : setdragged(false)   mais et l'original alors ??*/

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
	return (
		<div className="four-tiles-container">
			{tiles.map((tile) => (
				<BaseTile
					key={tile.id}
					id={tile.id}
					imgSrcRecto={tile.imgSrcRecto}
					imgSrcVerso={tile.imgSrcVerso}
					left={tile.left}
					right={tile.right}
				/>
			))}
		</div>
	);
}

export default FourTiles;

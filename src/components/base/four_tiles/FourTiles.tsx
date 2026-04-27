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
	nextTiles: TileProps[];
}

function FourTiles({ nextTiles }: NextTilesProps) {
	return (
		<div className="four-tiles-container">
			{nextTiles.map((nextTile) => (
				<BaseTile
					key={nextTile.id}
					id={nextTile.id}
					imgSrcRecto={nextTile.imgSrcRecto}
					imgSrcVerso={nextTile.imgSrcVerso}
					left={nextTile.left}
					right={nextTile.right}
				/>
			))}
		</div>
	);
}

export default FourTiles;

import BaseTile from "../base_tiles/BaseTile";

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

function NextTiles({ nextTiles }: NextTilesProps) {
	return (
		<>
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
		</>
	);
}

export default NextTiles;

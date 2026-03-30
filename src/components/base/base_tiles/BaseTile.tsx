import "./BaseTile.css"; /*
import { baseTilesArray } from "../data/baseTiles";     probleme a l import*/

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

function BaseTile(props: TileProps) {
	return (
		<div className="img-container" id={String(props.id)}>
			<img
				src={props.imgSrcRecto}
				alt={props.left.alt}
				className="left-tile"
				data-landscape={props.left.landscape}
				data-flames={props.left.flames}
			/>
			<img
				src={props.imgSrcRecto}
				alt={props.right.alt}
				className="right-tile"
				data-landscape={props.right.landscape}
				data-flames={props.right.flames}
			/>
		</div>
	);
}
//là ce sont de vraies balises, on doit respecter les bons attributs qui existent

export default BaseTile;

import type { TileProps } from "../../../types/game.types";

import "./BaseTile.css";

function BaseTile(props: TileProps) {
	return (
		<div className="img-container" id={String(props.id)} style={props.style}>
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

export default BaseTile;

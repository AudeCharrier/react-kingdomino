import "./App.css";

import Tile1Recto from "./components/base/base_tiles/assets/tile_1_recto.webp";
import Tile1Verso from "./components/base/base_tiles/assets/tile_1_verso.webp";
import BaseTile from "./components/base/base_tiles/BaseTile";

function App() {
	const tileUn = {
		id: 1,
		imgSrcRecto: Tile1Recto,
		imgSrcVerso: Tile1Verso,

		left: {
			landscape: "desert",
			crowns: 0,
			alt: "tile#1 recto left",
		},
		right: {
			landscape: "forest",
			crowns: 1,
			alt: "tile#1 recto right",
		},
	};
	return (
		<div>
			<BaseTile
				imgSrcRecto={tileUn.imgSrcRecto}
				imgSrcVerso={tileUn.imgSrcVerso}
				left={tileUn.left}
				right={tileUn.right}
			/>
		</div>
	);
}
//balise-composant tout est inventé : le nom de la balise et les attributs
//c'est là que je mets le nom du props

export default App;

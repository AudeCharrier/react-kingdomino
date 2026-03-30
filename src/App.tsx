import "./App.css";

import Tile4Recto from "./components/base/base_tiles/assets/tile_4_recto.webp";
import Tile4Verso from "./components/base/base_tiles/assets/tile_4_verso.webp";
import BaseTile from "./components/base/base_tiles/BaseTile";

function App() {
	const tileFour = {
		id: 4,
		imgSrcRecto: Tile4Recto,
		imgSrcVerso: Tile4Verso,

		left: {
			landscape: "desert",
			flames: 0,
			alt: "tile#4 recto left",
		},
		right: {
			landscape: "meadow",
			flames: 0,
			resource: "mammoth",
			alt: "tile#4 recto right",
		},
	};
	return (
		<BaseTile
			id={tileFour.id}
			imgSrcRecto={tileFour.imgSrcRecto}
			imgSrcVerso={tileFour.imgSrcVerso}
			left={tileFour.left}
			right={tileFour.right}
		/>
	);
}
//balise-composant tout est inventé : le nom de la balise et les attributs
//c'est là que je mets le nom du props

export default App;

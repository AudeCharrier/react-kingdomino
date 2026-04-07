import { useState } from "react";

import BaseTile from "./components/base/base_tiles/BaseTile";
import RandomButton from "./components/base/random_button/RandomButton";
import baseTilesArray from "./data/baseTiles.js";
import { randomId } from "./utils/utils.js";

import "./App.css";

function App() {
	const [usedId, setUsedId] = useState<number[]>([]);

	function drawRandomTiles() {
		const minId = baseTilesArray[0].id;
		const maxId = baseTilesArray[baseTilesArray.length - 1].id;

		const randomIdArray = randomId(minId, maxId, usedId);
		//A REVOIR !!

		//tri des id par ordre croissant
		const randomIdSorted = randomIdArray.sort((a, b) => a - b);

		//récupérer les 4 tiles dont l'id correspond
		const nextTilesToPlay = baseTilesArray.filter((tile) =>
			randomIdArray.includes(tile.id),
		);
		setUsedId(randomIdSorted);
		//mettre a jour le state used pour exclure les id des prochains tirages et descendre en props ces memes id pour actualiser afficha de basetiles</>
	}
	return (
		<section>
			<RandomButton onDraw={drawRandomTiles} />

			{nextTilesToPlay.map((nextTile) => (
				<BaseTile
					key={nextTile.id}
					id={nextTile.id}
					imgSrcRecto={nextTile.imgSrcRecto}
					imgSrcVerso={nextTile.imgSrcVerso}
					left={nextTile.left}
					right={nextTile.right}
				/>
			))}
		</section>
	);
}

//balise-composant tout est inventé : le nom de la balise et les attributs
//c'est là que je mets le nom du props

export default App;

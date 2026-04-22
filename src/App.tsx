import { useState } from "react";

import BaseTile from "./components/base/base_tiles/BaseTile";
import RandomButton from "./components/base/random_button/RandomButton";
import baseTilesArray from "./data/baseTiles.js"; //future api
import { randomId } from "./utils/utils.js";
import DrawRandomTiles from "./components/base/random_button/DrawRandomTiles.js";
import "./App.css";

function App() {
	const minId = baseTilesArray[0].id;
	const maxId = baseTilesArray[baseTilesArray.length - 1].id;

	const allIds = new Array<number>(maxId);
	for (let i = minId; i <= maxId; i++) {
		allIds.push(i);
	}
	const [usedIds, setUsedIds] = useState<number[]>([]);
	const [availableIds, setAvailableIds] = useState<number[]>(allIds);
	const [nextTilesToPlay, setNextTilesToPlay] = useState<>();    ///   attention contient des base tiles

	/* function DrawFourTiles(available: number[]) {
		const randomIdArray = randomId(available);

		//tri des id par ordre croissant
		const randomIdSorted = randomIdArray.sort((a, b) => a - b);

		//récupérer les 4 tiles dont l'id correspond
		const nextTilesToPlay = baseTilesArray.filter((tile) =>
			randomIdArray.includes(tile.id),
		);

		//mettre a jour les states used pour exclure les id des prochains tirages
		setUsedIds(...prev, ...randomIdSorted);
		const newAvailableIds = allIds.filter((id) => !usedIds.includes(id));
		setAvailableIds(newAvailableIds);

		return fourTiles
	} */
	return (
		<section>
			<RandomButton onDraw={DrawFourTiles(availableIds)} />

			<NextTiles props = nextTilesToPlay/>
		</section>
	);
}

//balise-composant tout est inventé : le nom de la balise et les attributs
//c'est là que je mets le nom du props

export default App;


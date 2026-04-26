import { useState } from "react";
import RandomButton from "./components/base/random_button/RandomButton";
import baseTilesArray from "./data/baseTiles.js"; //future api
import PlayGrid from "./components/base/play_grid/PlayGrid.js";
import DrawRandomTiles from "./components/base/random_button/DrawRandomTiles.js";

import "./App.css";

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

const minId = baseTilesArray[0].id;
const maxId = baseTilesArray[baseTilesArray.length - 1].id;

const allIds: number[] = [];
for (let i = minId; i <= maxId; i++) {
	allIds.push(i);
}
function App() {
	const [usedIds, setUsedIds] = useState<number[]>([]);
	const [availableIds, setAvailableIds] = useState<number[]>(allIds);
	const [nextTilesToPlay, setNextTilesToPlay] = useState<TileProps[]>([]); ///   attention contient des base tiles

	function randomId(available: number[]) {
		const remaining = [...available];
		const randomIdsArray: number[] = [];

		for (let i = 0; i < 4; i++) {
			const randomIndex = Math.floor(Math.random() * remaining.length); //prend entre 0 et length (48)
			randomIdsArray[i] = remaining[randomIndex];
			remaining.splice(randomIndex, 1);
			//je dois actualiser le tableau des id availabel pour la prochaine boucle (mais le state est pas encore à jour)
		}
		console.log("ids tirés :", randomIdsArray);
		return randomIdsArray;
	}

	//la fonction appelée à l'event gère le sstates à la fin
	function DrawFourTiles(available: number[]) {
		const randomIdsArray = randomId(available);

		//tri des id par ordre croissant
		const randomIdsSorted = randomIdsArray.sort((a, b) => a - b);

		//récupérer les 4 tiles dont l'id correspond
		const nextTilesToPlay = baseTilesArray.filter((tile) =>
			randomIdsSorted.includes(tile.id),
		);

		//mettre a jour les states used pour exclure les id des prochains tirages
		//en passant par une valeur intermédiaire, parce que les state se mettreont à jour APRES le render
		const newUsedIds = [...usedIds, ...randomIdsSorted];
		setUsedIds(newUsedIds);
		const newAvailableIds = allIds.filter((id) => !newUsedIds.includes(id));
		setAvailableIds(newAvailableIds);
		setNextTilesToPlay(nextTilesToPlay);

		return nextTilesToPlay;
	}

	return (
		<body>
			<section>
				<RandomButton onDraw={() => DrawFourTiles(availableIds)} />

				<DrawRandomTiles nextTiles={nextTilesToPlay} />
			</section>
			<section className="section-play">
				<PlayGrid />
			</section>
		</body>
	);
}

export default App;

//tirer une branche depuis dev pour faire le composant fourtiles (i.e. drawrandomtiles) + css placement et taille
//tirer une branche pour composant grid zone de jeu (mapper une div bordered et gérer le placement avec grid-template-area ?)

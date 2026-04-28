import { useState } from "react";
import RandomButton from "./components/base/random_button/RandomButton";
import baseTilesArray from "./data/baseTiles.js"; //future api
import PlayGrid from "./components/base/play_grid/PlayGrid.js";
import FourTiles from "./components/base/four_tiles/FourTiles";
import MoveButton from "./components/base/move_button/MoveButton.js";

/*faire un import types */

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
	const [nextTiles, setNextTiles] = useState<TileProps[]>([]); ///   attention contient des base tiles
	const [currentTiles, setCurrentTiles] = useState<TileProps[]>([]);

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
		const nextTiles = baseTilesArray.filter((tile) =>
			randomIdsSorted.includes(tile.id),
		);

		//mettre a jour les states used pour exclure les id des prochains tirages
		//en passant par une valeur intermédiaire, parce que les state se mettreont à jour APRES le render
		const newUsedIds = [...usedIds, ...randomIdsSorted];
		setUsedIds(newUsedIds);
		const newAvailableIds = allIds.filter((id) => !newUsedIds.includes(id));
		setAvailableIds(newAvailableIds);
		setNextTiles(nextTiles);

		return nextTiles;
	}

	function MoveTiles() {
		const newCurrent = nextTiles;
		setCurrentTiles(newCurrent);
		const newNext: TileProps[] = [];
		setNextTiles(newNext);
		return;
	}

	return (
		<main>
			<header className="kingdo-header"></header>
			<section className="draw-tiles">
				<div className="buttons-and-meeples">
					<RandomButton onDraw={() => DrawFourTiles(availableIds)} />
					<MoveButton onMove={() => MoveTiles()} />
				</div>
				<FourTiles tiles={nextTiles} />
				<FourTiles tiles={currentTiles} />
			</section>

			<section className="section-play">
				<PlayGrid />
			</section>
		</main>
	);
}

export default App;

//si mauvaise manip d'un joueur ?? 2*move ?..... comment annuler le dernier coup

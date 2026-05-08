import type { ScoreDetails, ScoreResult } from "../types/game.types";

interface AlgoTileProps {
	cellId: number;
	landscape?: string;
	flames?: number;
	volcanoFire?: number;
	resource?: string;
}

interface CellData {
	cellId: number;
	landscape: string;
	flames: number;
	volcanoFire?: number;
	resource?: string;
	alt: string;
	imgSrc: string;
	part: "left-part" | "right-part";
	rotation: number;
}

const landscapes = ["desert", "meadow", "jungle", "lake", "rocky"];

function gridContentToAlgoArray(
	gridContent: Record<string, CellData>,
): AlgoTileProps[] {
	const endGame: AlgoTileProps[] = [];
	for (let i = 1; i < 50; i++) {
		const halfTile = gridContent[String(i)];
		if (!halfTile) {
			endGame.push({ cellId: i });
		} else {
			endGame.push({
				cellId: halfTile.cellId,
				landscape: halfTile.landscape,
				flames: halfTile.flames,
				volcanoFire: halfTile.volcanoFire,
				resource: halfTile.resource,
			});
		}
	}
	return endGame;
}

function separateLandscapes(endGame: AlgoTileProps[], landscape: string) {
	const endGameOneLandscape = endGame.filter(
		(cell) => cell.landscape === landscape,
	);
	return endGameOneLandscape;
}

const potentialZones: AlgoTileProps[][] = [];

function isAdjacent(endGameOneLandscape: AlgoTileProps[]) {
	potentialZones.length = 0; // reset
	potentialZones.push([endGameOneLandscape[0]]);

	for (let i = 1; i < endGameOneLandscape.length; i++) {
		const potentialAdjIds = endGameOneLandscape[i].cellId
			? [
					endGameOneLandscape[i].cellId - 1,
					endGameOneLandscape[i].cellId + 1,
					endGameOneLandscape[i].cellId - 7,
					endGameOneLandscape[i].cellId + 7,
				]
			: [];
		let matched = false;
		const indexesJ: number[] = [];

		for (let j = 0; j < potentialZones.length; j++) {
			const pot = potentialZones[j].some((cell) => {
				if (!potentialAdjIds.includes(cell.cellId)) return false;
				if (cell.cellId % 7 === 0 && endGameOneLandscape[i].cellId % 7 === 1)
					return false;
				if (endGameOneLandscape[i].cellId % 7 === 0 && cell.cellId % 7 === 1)
					return false;
				return true;
			});
			if (pot) {
				matched = true;
				indexesJ.push(j);
			}
		}

		let oneZone: AlgoTileProps[] = [];
		if (!matched) {
			potentialZones.push([endGameOneLandscape[i]]);
		} else if (indexesJ.length === 1) {
			potentialZones[indexesJ[0]] = [
				...potentialZones[indexesJ[0]],
				endGameOneLandscape[i],
			];
		} else if (indexesJ.length > 1) {
			[...indexesJ].reverse().forEach((index) => {
				oneZone = [...oneZone, ...potentialZones[index]];
				potentialZones.splice(index, 1);
			});
			oneZone.push(endGameOneLandscape[i]);
			potentialZones.push(oneZone);
		}
	}
	return potentialZones;
}

function landscapeScore(potentialZones: AlgoTileProps[][]) {
	const zonesInfos = potentialZones.map((zone) => ({
		landscape: zone[0].landscape,
		length: zone.length,
		sumFlames: zone.reduce((sum, cell) => sum + (cell.flames ?? 0), 0),
	}));
	const zonesScores = zonesInfos.map((zone) => zone.length * zone.sumFlames);
	return zonesScores.reduce((sum, score) => sum + score, 0);
}

export function calculateScore(
	gridContent: Record<string, CellData>,
): ScoreResult {
	const endGame = gridContentToAlgoArray(gridContent);
	const details: ScoreDetails[] = [];
	let total = 0;

	landscapes.forEach((landscape) => {
		const endGameOneLandscape = separateLandscapes(endGame, landscape);
		if (endGameOneLandscape.length === 0) return;
		const zones = isAdjacent(endGameOneLandscape);
		const score = landscapeScore(zones);
		total += score;
		details.push({ landscape, score });
	});

	return { details, total };
}

// filtrer pour liste d'id par paysage
// comparer premier id et 2e id
// si les deux id sont de types : id%7 = 0 et i%7 = 1 -> adajcence impossible -> mettre le 2e dans un tableau séparé
// si écart !== -1 +1 -7 +7 : pas adjacence
// si écart = -1, +1, -7 ou +7 : adjacence (on peut dire |1| en valeur absolue ?) -> un new tableau avec ceux-là

// comparer le 3e id : aux tableaux précédents générés
// si matche avec aucun tableau : créer un new
// si matche un seul tableau on le rajoute
// si match avec plusieurs, on l'ajoute et on fusionne les tableaux
//on compare les tableaux.length pour trouver la plus grande

/*  Option 1 — vérifier que landscape existe
jsconst forest = array.filter(cell => cell.landscape && cell.landscape === "forest");
Option 2 — optional chaining (plus moderne)
jsconst forest = array.filter(cell => cell.landscape === "forest");
// si cell.landscape est undefined, === "forest" retourne false automatiquement ✅
En fait le === gère déjà le cas undefined — undefined === "forest" retourne false sans planter !
Option 3 — si la cellule vide n'a pas de propriété landscape du tout
jsconst forest = array.filter(cell => cell.landscape?.includes("forest"));
// ?. = optional chaining, retourne undefined si landscape n'existe pas */

const tiles = [
	{ cellId: 1 },
	{
		cellId: 2,
		tileId: 49, //CHANGER LA CLE DANS LES AUTRES TYPAGES !!!!!
		imgSrcRecto: "blabla",
		left: {
			landscape: "prairie",
			flames: 0,
		},
	},
	{ cellId: 3, landscape: "forest", flames: 1 },
	{ cellId: 4, landscape: "forest", flames: 0 },
	{ cellId: 5, landscape: "desert", flames: 0 },
	{ cellId: 6 },
	{ cellId: 7, landscape: "desert", flames: 0 },
	{ cellId: 8, landscape: "desert", flames: 0 },
	{ cellId: 9, landscape: "lake", flames: 0 },
	{ cellId: 10, landscape: "lake", flames: 1 },
	{ cellId: 11, landscape: "forest", flames: 0 },
	{ cellId: 12, landscape: "forest", flames: 0 },
	{ cellId: 13, landscape: "lake", flames: 1 },
	{ cellId: 14, landscape: "forest", flames: 1 },
	{ cellId: 15, landscape: "forest", flames: 1 },
	{ cellId: 16, landscape: "forest", flames: 1 },
	{ cellId: 17, landscape: "forest", flames: 0 },
	{ cellId: 18, landscape: "forest", flames: 0 },
	{ cellId: 19, landscape: "lake", flames: 0 },
	{ cellId: 20, landscape: "lake", flames: 1 },
	{ cellId: 21, landscape: "forest", flames: 0 },
	{ cellId: 22, landscape: "forest", flames: 1 },
	{ cellId: 23, landscape: "forest", flames: 0 },
	{ cellId: 24, landscape: "forest", flames: 0 },
	{ cellId: 25 },
	{ cellId: 26, landscape: "lake", flames: 0 },
	{ cellId: 27, landscape: "cave", flames: 2 },
	{ cellId: 28, landscape: "lake", flames: 0 },
	{ cellId: 29, landscape: "desert", flames: 0 },
	{ cellId: 30, landscape: "desert", flames: 0 },
	{ cellId: 31, landscape: "prairie", flames: 1 },
	{ cellId: 32, landscape: "prairie", flames: 0 },
	{ cellId: 33, landscape: "marais", flames: 2 },
	{ cellId: 34, landscape: "marais", flames: 0 },
	{ cellId: 35, landscape: "lake", flames: 0 },
	{ cellId: 36, landscape: "desert", flames: 0 },
	{ cellId: 37, landscape: "desert", flames: 0 },
	{ cellId: 38, landscape: "desert", flames: 0 },
	{ cellId: 39, landscape: "prairie", flames: 0 },
	{ cellId: 40, landscape: "prairie", flames: 0 },
	{ cellId: 41, landscape: "prairie", flames: 2 },
	{ cellId: 42, landscape: "lake", flames: 0 },
	{ cellId: 43, landscape: "cave", flames: 1 },
	{ cellId: 44, landscape: "cave", flames: 2 },
	{ cellId: 45, landscape: "desert", flames: 0 },
	{ cellId: 46, landscape: "desert", flames: 1 },
	{ cellId: 47, landscape: "prairie", flames: 0 },
	{ cellId: 48, landscape: "prairie", flames: 2 },
	{ cellId: 49, landscape: "desert", flames: 0 },
];

export interface AlgoTileProps {
	cellId: number;
	id?: number; //y'aura des cases vides
	imgSrcRecto?: string; //y'aura des cases vides   //inutile, ne pas passer la props ?

	left?: {
		landscape: string;
		flames: number;
		volcanoFire?: number;
		resource?: string;
	};
	right?: {
		landscape: string;
		flames: number;
		volcanoFire?: number;
		resource?: string;
	};
}
//ou passer tileprops en Partial<TileProps> (met un ? à chaque props)

// gérer si pas de landscape car pas de tuile/ tuile du centre :
// le === gère déjà le cas undefined donc undefined === "forest" retourne false sans planter

function separateLandscapes(tiles: AlgoTileProps[]) {
	const forest = tiles.filter(
		(cell) =>
			cell.left?.landscape === "forest" || cell.right?.landscape === "forest",
	);
	return forest;
}

const forest = separateLandscapes(tiles);
console.log(forest);

const potentialZones = [[forest[0]]];

function isAdjacent(forest: AlgoTileProps[]) {
	for (let i = 1; i < forest.length; i++) {
		const potentialAdjIds = forest[i].cellId
			? [
					forest[i].cellId - 1,
					forest[i].cellId + 1,
					forest[i].cellId - 7,
					forest[i].cellId + 7,
				]
			: [];
		let matched = false;
		const indexesJ = [];
		for (let j = 0; j < potentialZones.length; j++) {
			const pot = potentialZones[j].some((cell) => {
				if (!potentialAdjIds.includes(cell.cellId)) return false;
				// Vérifier le wrap-around (id7 en bout de ligne et 8 au début de la suivante)
				if (cell.cellId % 7 === 0 && forest[i].cellId % 7 === 1) return false;
				if (forest[i].cellId % 7 === 0 && cell.cellId % 7 === 1) return false;
				return true;
			});

			if (pot) {
				matched = true;
				indexesJ.push(j);
			}
		}

		let oneZone: AlgoTileProps[] = [];
		if (!matched) {
			potentialZones.push([forest[i]]);
		} else if (indexesJ.length === 1) {
			potentialZones[indexesJ[0]] = [...potentialZones[indexesJ[0]], forest[i]];
		} else if (indexesJ.length > 1) {
			[...indexesJ].reverse().forEach((index) => {
				oneZone = [...oneZone, ...potentialZones[index]];
				potentialZones.splice(index, 1);
			});

			oneZone.push(forest[i]);
			potentialZones.push(oneZone);
		}
	}
	return potentialZones;
}
console.log(isAdjacent(forest));

function landscapeScore(potentialZones: AlgoTileProps[][]) {
	const zonesInfos = potentialZones.map((zone) => ({
		landscape: zone[0].left?.landscape || zone[0].right?.landscape, // même paysage pour toute la zone
		length: zone.length,
		sumFlames: zone.reduce(
			(sum, cell) => sum + (cell.left?.flames ?? cell.right?.flames ?? 0),
			0,
		), // total flammes
		//(sum + cell.left?.flames) || (sum + cell.right?.flames)
		// si left.flames = 0, c'est falsy → il prend right inutilement !
		// ?? = nullish coalescing : prend la valeur suivante seulement si undefined/null)
	}));
	const zonesScores = zonesInfos.map((zone) => zone.length * zone.sumFlames); // score par zone
	console.log(zonesScores);
	const totalLandscapeScore = zonesScores.reduce((sum, cell) => sum + cell, 0); // score total
	return totalLandscapeScore;
}

const totalLandscapeScore = landscapeScore(potentialZones);
console.log(totalLandscapeScore);

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

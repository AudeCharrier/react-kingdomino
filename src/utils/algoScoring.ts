const array = [
	{ id: 1 },
	{ id: 2, landscape: "prairie", crowns: 0 },
	{ id: 3, landscape: "forest", crowns: 1 },
	{ id: 4, landscape: "forest", crowns: 0 },
	{ id: 5, landscape: "desert", crowns: 0 },
	{ id: 6 },
	{ id: 7, landscape: "desert", crowns: 0 },
	{ id: 8, landscape: "desert", crowns: 0 },
	{ id: 9, landscape: "lake", crowns: 0 },
	{ id: 10, landscape: "lake", crowns: 1 },
	{ id: 11, landscape: "forest", crowns: 0 },
	{ id: 12, landscape: "forest", crowns: 0 },
	{ id: 13, landscape: "lake", crowns: 1 },
	{ id: 14, landscape: "forest", crowns: 1 },
	{ id: 15, landscape: "forest", crowns: 1 },
	{ id: 16, landscape: "forest", crowns: 1 },
	{ id: 17, landscape: "forest", crowns: 0 },
	{ id: 18, landscape: "forest", crowns: 0 },
	{ id: 19, landscape: "lake", crowns: 0 },
	{ id: 20, landscape: "lake", crowns: 1 },
	{ id: 21, landscape: "forest", crowns: 0 },
	{ id: 22, landscape: "forest", crowns: 1 },
	{ id: 23, landscape: "forest", crowns: 0 },
	{ id: 24, landscape: "forest", crowns: 0 },
	{ id: 25 },
	{ id: 26, landscape: "lake", crowns: 0 },
	{ id: 27, landscape: "cave", crowns: 2 },
	{ id: 28, landscape: "lake", crowns: 0 },
	{ id: 29, landscape: "desert", crowns: 0 },
	{ id: 30, landscape: "desert", crowns: 0 },
	{ id: 31, landscape: "prairie", crowns: 1 },
	{ id: 32, landscape: "prairie", crowns: 0 },
	{ id: 33, landscape: "marais", crowns: 2 },
	{ id: 34, landscape: "marais", crowns: 0 },
	{ id: 35, landscape: "lake", crowns: 0 },
	{ id: 36, landscape: "desert", crowns: 0 },
	{ id: 37, landscape: "desert", crowns: 0 },
	{ id: 38, landscape: "desert", crowns: 0 },
	{ id: 39, landscape: "prairie", crowns: 0 },
	{ id: 40, landscape: "prairie", crowns: 0 },
	{ id: 41, landscape: "prairie", crowns: 2 },
	{ id: 42, landscape: "lake", crowns: 0 },
	{ id: 43, landscape: "cave", crowns: 1 },
	{ id: 44, landscape: "cave", crowns: 2 },
	{ id: 45, landscape: "desert", crowns: 0 },
	{ id: 46, landscape: "desert", crowns: 1 },
	{ id: 47, landscape: "prairie", crowns: 0 },
	{ id: 48, landscape: "prairie", crowns: 2 },
	{ id: 49, landscape: "desert", crowns: 0 },
];

// gérer si pas de lanscape car pas de tuile/ tuile du centre :
// le === gère déjà le cas undefined donc undefined === "forest" retourne false sans planter

function separateLandscapes(array) {
	const forest = array.filter((cell) => cell.landscape === "forest");
	return forest;
}

const forest = separateLandscapes(array);
console.log(forest);

const potentialZones = [[forest[0]]];

function isAdjacent(forest) {
	for (let i = 1; i < forest.length; i++) {
		const potentialAdjIds = [
			forest[i].id - 1,
			forest[i].id + 1,
			forest[i].id - 7,
			forest[i].id + 7,
		];
		let matched = false;
		let indexesJ = [];
		for (let j = 0; j < potentialZones.length; j++) {
			const pot = potentialZones[j].some((cell) => {
				if (!potentialAdjIds.includes(cell.id)) return false;
				// Vérifier le wrap-around
				if (cell.id % 7 === 0 && forest[i].id % 7 === 1) return false;
				if (forest[i].id % 7 === 0 && cell.id % 7 === 1) return false;
				return true;
			});

			if (pot) {
				matched = true;
				indexesJ.push(j);
			}
		}

		let oneZone = [];
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

function landscapeScore(potentialZones) {
	const zonesInfos = potentialZones.map((zone) => ({
		landscape: zone[0].landscape, // même paysage pour toute la zone
		length: zone.length,
		sumCrowns: zone.reduce((sum, cell) => sum + cell.crowns, 0), // total couronnes
	}));
	const zonesScores = zonesInfos.map((zone) => zone.length * zone.sumCrowns); // score par zone
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

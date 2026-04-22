//dans utils

export function randomId(available) {
	const randomIdArray = new Array(4);

	for (let i = 0; i < randomIdArray.length; i++) {
		const randomIndex = Math.floor(Math.random() * available.length); //prend entre 0 et length (48)
		randomIdArray[i] = available[randomIndex];
		//je dois virer l'id de available MTN or je suis dans utils.ts -> je le fais avec usestate ou avec slice ?
	}
	return randomIdArray;
}

//dans app
function DrawFourTiles(available: number[]) {
	const randomIdArray = randomId(available);

	//tri des id par ordre croissant
	const randomIdSorted = randomIdArray.sort((a, b) => a - b);

	//récupérer les 4 tiles dont l'id correspond
	const fourTilesToPlay = baseTilesArray.filter((tile) =>
		randomIdArray.includes(tile.id),
	);

	//mettre a jour les states used pour exclure les id des prochains tirages : QUAND ?
	setUsedIds(...prev, ...randomIdSorted);
	const newAvailableIds = allIds.filter((id) => !usedIds.includes(id));
	setAvailableIds(newAvailableIds);

	setFourTilesToPlay(fourTilesToPlay);

	return fourTilesToPlay;
}

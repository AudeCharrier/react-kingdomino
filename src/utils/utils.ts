//dans utils

export function randomId(available: number[]) {
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

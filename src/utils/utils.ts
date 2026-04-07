//types number min et max et usedid

const usedId = [1, 5, 48, 13];

//générer 4 id aléatoires
export function randomId(min, max, usedId) {
	const randomIdArray = new Array(4); // créer array de taille 4
	for (let i = 0; i < randomIdArray.length; i++) {
		randomIdArray[i] = Math.floor(Math.random() * (max - min + 1)) + min;
		while (usedId.includes(randomIdArray[i])) {
			randomIdArray[i] = Math.floor(Math.random() * (max - min + 1)) + min;
		}
	}
	return randomIdArray;
}

//récupérer les 4 tiles dont l'id correspond
/* const nextTilesToPlay = baseTilesArray.filter((tile) =>
	randomIdArray.includes(tile.id),
);
 */

//problem 1 : je compare pas les valeurs de randomIdArray entre elles !
//problme 2 : je ne maitrise pas le nb de tours de boucle du while...risque faible que ça plante, mais risque !
//idée : cadrer le while (comment ??)
//alternative : créer un tableau des id autorisés, et tirer dedans (je peux faire un tableau de 1 à 48, mais si j'en avais 500....)

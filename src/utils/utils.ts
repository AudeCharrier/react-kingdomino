const usedId = [1, 5, 48, 13];
const min = 1;
const max = 48;

/* const allIds = Array.from({ length: max - min + 1 }, (_, i) => i + min);
 */ //taille : 48 , mapping intégré : il prend la valeur de la case d'index i (_, i) et il la remplace par i+min

const allIds = new Array(max);
for (let i = min; i <= max; i++) {
	allIds.push(i);
}

const availableIds = allIds.filter((id) => !usedId.includes(id));

//générer 4 id aléatoires

export function randomId(min, max, available, used) {
	const randomIdArray = new Array(4);

	for (let i = 0; i < randomIdArray.length; i++) {
		let randomIndex = Math.floor(Math.random() * available.length); //prend entre 0 et length (48)
		while (randomIdArray.includes(available[randomIndex])) {
			randomIndex = Math.floor(Math.random() * available.length);
		}

		randomIdArray[i] = available[randomIndex];
	}
	return randomIdArray;
}

/* export function randomId(min, max, usedId) {
	const randomIdArray = new Array(4); // créer array de taille 4
	for (let i = 0; i < randomIdArray.length; i++) {
		randomIdArray[i] = Math.floor(Math.random() * (max - min + 1)) + min;
		while (usedId.includes(randomIdArray[i])) {
			randomIdArray[i] = Math.floor(Math.random() * (max - min + 1)) + min
		}
	}
	return randomIdArray;
}
 */

/* 
if (randomIdArray.includes(available[randomIndex])) {

		} else {
			randomIdArray[i] = available[randomIndex]
		} */

console.log(randomId(min, max, usedId));

//récupérer les 4 tiles dont l'id correspond
/* const nextTilesToPlay = baseTilesArray.filter((tile) =>
	randomIdArray.includes(tile.id),
);
 */

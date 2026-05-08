export function randomId(available: number[]) {
	const remaining = [...available];
	const randomIdsArray: number[] = [];
	for (let i = 0; i < 4; i++) {
		const randomIndex = Math.floor(Math.random() * remaining.length);
		randomIdsArray[i] = remaining[randomIndex];
		remaining.splice(randomIndex, 1);
	}
	return randomIdsArray;
}

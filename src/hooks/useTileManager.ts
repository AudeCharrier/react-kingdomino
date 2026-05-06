import { useState } from "react";
import baseTilesArray from "../data/baseTiles.js";
import type { TileProps } from "../types/game.types";
import { randomId } from "../utils/gameLogic";

const minId = baseTilesArray[0].id;
const maxId = baseTilesArray[baseTilesArray.length - 1].id;
const allIds: number[] = [];
for (let i = minId; i <= maxId; i++) {
	allIds.push(i);
}

export function useTileManager() {
	const [usedIds, setUsedIds] = useState<number[]>([]);
	const [availableIds, setAvailableIds] = useState<number[]>(allIds);
	const [nextTiles, setNextTiles] = useState<TileProps[]>([]);
	const [currentTiles, setCurrentTiles] = useState<TileProps[]>([]);

	function DrawFourTiles(available: number[]) {
		const randomIdsArray = randomId(available);
		const randomIdsSorted = randomIdsArray.sort((a, b) => a - b);
		const next = baseTilesArray.filter((tile) =>
			randomIdsSorted.includes(tile.id),
		);
		const newUsedIds = [...usedIds, ...randomIdsSorted];
		setUsedIds(newUsedIds);
		const newAvailableIds = allIds.filter((id) => !newUsedIds.includes(id));
		setAvailableIds(newAvailableIds);
		setNextTiles(next as unknown as TileProps[]);
		return next;
	}

	function MoveButtonTiles() {
		setCurrentTiles(nextTiles);
		setNextTiles([]);
	}

	return {
		usedIds,
		availableIds,
		nextTiles,
		currentTiles,
		setCurrentTiles,
		DrawFourTiles,
		MoveButtonTiles,
	};
}

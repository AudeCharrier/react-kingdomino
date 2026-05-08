import { useEffect, useState } from "react";
import baseTilesArray from "../data/baseTiles.js";
import type { TileProps } from "../types/game.types";
import { randomId } from "../utils/gameLogic";

export function useTileManager() {
	const [usedIds, setUsedIds] = useState<number[]>([]);
	const [availableIds, setAvailableIds] = useState<number[]>([]);
	const [nextTiles, setNextTiles] = useState<TileProps[]>([]);
	const [currentTiles, setCurrentTiles] = useState<TileProps[]>([]);
	const [baseTiles, setBaseTiles] = useState<TileProps[]>([]);

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/api/basetiles`)
			.then((res) => {
				// Fetch ne considère pas une erreur 404 ou 500 comme une erreur de Promise.
				// On doit vérifier manuellement si la réponse est "ok".
				if (!res.ok) {
					throw new Error(`Erreur HTTP : ${res.status}`);
				}
				return res.json();
			})
			.then((data: TileProps[]) => {
				setBaseTiles(data);

				// On extrait les IDs et on nettoie les "undefined" d'un coup
				const idsFromApi = data
					.map((t) => t.id)
					.filter((id): id is number => id !== undefined);

				// On initialise nos IDs disponibles pour le jeu
				setAvailableIds(idsFromApi);
			})
			.catch((err) => {
				// C'est ici que tu gères les erreurs (serveur éteint, 404, etc.)
				console.error("Problème avec le fetch :", err.message);
			});
	}, []);

	function DrawFourTiles(available: number[]) {
		const randomIdsArray = randomId(available);
		const randomIdsSorted = randomIdsArray.sort((a, b) => a - b);
		const next = baseTilesArray.filter((tile) =>
			randomIdsSorted.includes(tile.id),
		);
		const newUsedIds = [...usedIds, ...randomIdsSorted];
		setUsedIds(newUsedIds);
		const allIds = baseTiles.map((t) => t.id);

		//On filtre pour ne garder QUE les nombres qui existent ET qui ne sont pas utilisés
		const newAvailableIds = allIds.filter(
			(id): id is number => id !== undefined && !newUsedIds.includes(id),
		);
		setAvailableIds(newAvailableIds);
		setNextTiles(next);
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

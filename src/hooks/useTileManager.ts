import { useEffect, useState } from "react";
import type { TileProps } from "../types/game.types";
import { randomId } from "../utils/gameLogic";

export function useTileManager() {
	const [usedIds, setUsedIds] = useState<number[]>([]);
	const [availableIds, setAvailableIds] = useState<number[]>([]);
	const [nextTiles, setNextTiles] = useState<TileProps[]>([]);
	const [currentTiles, setCurrentTiles] = useState<TileProps[]>([]);
	const [baseTiles, setBaseTiles] = useState<TileProps[]>([]);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

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

				setError(
					"Le serveur met du temps à démarrer ou une erreur est survenue.",
				);
				setIsLoading(false); // On coupe le chargement pour libérer l'affichage de l'erreur !
			});
	}, []);

	useEffect(() => {
		// Si l'utilisateur a cliqué (isLoading est true) ET que les tuiles viennent enfin d'arriver
		if (isLoading && baseTiles.length > 0 && nextTiles.length === 0) {
			DrawFourTiles(availableIds);
		}
	}, [baseTiles, isLoading]); // S'active uniquement quand baseTiles ou isLoading changent

	function DrawFourTiles(available: number[]) {
		if (baseTiles.length === 0) {
			setIsLoading(true); // On dit à l'application qu'on attend le serveur
			return []; // On stoppe la fonction ici, on ne calcule rien sur du vide !
		}
		const randomIdsArray = randomId(available);
		const randomIdsSorted = randomIdsArray.sort((a, b) => a - b);
		const next = baseTiles.filter((tile) =>
			randomIdsSorted.includes(tile.id as number),
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

		// 5. On s'assure que isLoading repasse bien à false dès qu'on a réussi à piocher
		setIsLoading(false);

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
		error,
		isLoading,
	};
}

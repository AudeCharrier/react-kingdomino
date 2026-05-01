import { useState, useEffect } from "react";
import RandomButton from "./components/base/random_button/RandomButton";
import baseTilesArray from "./data/baseTiles.js"; //future api
import { useDrag } from "./contexts/DragContext";
import PlayGrid from "./components/base/play_grid/PlayGrid.js";
import FourTiles from "./components/base/four_tiles/FourTiles";
import MoveButton from "./components/base/move_button/MoveButton.js";
import type { CSSProperties } from "react";
import BaseTile from "./components/base/base_tiles/BaseTile";
/*faire un import types */

import "./App.css";

interface TileProps {
	id?: number; //pas olbigé d'exister dans l'objet de ce type, ou pas obligé d'être passé en prop
	imgSrcRecto: string;
	imgSrcVerso?: string;

	left: {
		landscape: string;
		flames: number;
		volcanoFire?: number;
		resource?: string;
		alt: string;
	};
	right: {
		landscape: string;
		flames: number;
		volcanoFire?: number;
		resource?: string;
		alt: string;
	};
	style?: CSSProperties;
}
const minId = baseTilesArray[0].id;
const maxId = baseTilesArray[baseTilesArray.length - 1].id;

const allIds: number[] = [];
for (let i = minId; i <= maxId; i++) {
	allIds.push(i);
}
function App() {
	const [rotation, setRotation] = useState<number>(0);
	const rotate = () => setRotation((r) => r + 90);

	const { dragged, setDragged, tilePosition, setTilePosition } = useDrag();
	const [usedIds, setUsedIds] = useState<number[]>([]);
	const [availableIds, setAvailableIds] = useState<number[]>(allIds);
	const [nextTiles, setNextTiles] = useState<TileProps[]>([]); ///   attention contient des base tiles
	const [currentTiles, setCurrentTiles] = useState<TileProps[]>([]);

	const [snappedCell, setSnappedCell] = useState<{
		left: number;
		top: number;
		cellIdLeft: string | null;
		cellIdRight: string | null;
	} | null>(null);

	function randomId(available: number[]) {
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

	//la fonction appelée à l'event gère les states à la fin
	function DrawFourTiles(available: number[]) {
		const randomIdsArray = randomId(available);

		//tri des id par ordre croissant
		const randomIdsSorted = randomIdsArray.sort((a, b) => a - b);

		//récupérer les 4 tiles dont l'id correspond
		const nextTiles = baseTilesArray.filter((tile) =>
			randomIdsSorted.includes(tile.id),
		);

		//mettre a jour les states used pour exclure les id des prochains tirages
		//en passant par une valeur intermédiaire, parce que les state se mettreont à jour APRES le render
		const newUsedIds = [...usedIds, ...randomIdsSorted];
		setUsedIds(newUsedIds);
		const newAvailableIds = allIds.filter((id) => !newUsedIds.includes(id));
		setAvailableIds(newAvailableIds);
		setNextTiles(nextTiles);

		return nextTiles;
	}

	function MoveButtonTiles() {
		const newCurrent = nextTiles;
		setCurrentTiles(newCurrent);
		const newNext: TileProps[] = [];
		setNextTiles(newNext);
		return;
	}

	function handleMouseDown(e: React.MouseEvent, tile: TileProps) {
		if (e.button !== 0) return;
		e.preventDefault(); // désactiver le réflexe du navigateur qui va capter et interférer

		//centrer le curseur sur la tuile
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		setDragged(tile);
		setTilePosition({
			left: e.clientX - rect.width / 2,
			top: e.clientY - rect.height / 2,
		});

		const onMove = (ev: MouseEvent) => {
			//garder le curseur centré au déplacement
			setTilePosition({
				left: ev.clientX - rect.width / 2,
				top: ev.clientY - rect.height / 2,
			});

			//on détecte la rotation pour savoir si ce sera g/d ou h/b sur la grid
			const isVertical = rotation % 180 !== 0;

			//éléments les plus proches
			const elLeft = !isVertical
				? document.elementFromPoint(ev.clientX - 37.5, ev.clientY) //horiz g
				: document.elementFromPoint(ev.clientX, ev.clientY - 37.5); //vert g
			const elRight = !isVertical
				? document.elementFromPoint(ev.clientX + 37.5, ev.clientY) //horiz d
				: document.elementFromPoint(ev.clientX, ev.clientY + 37.5); //vert d

			//voir la diff avec au dessus ?!
			const cellLeft = elLeft?.closest(".cell-play-grid");
			const cellRight = elRight?.closest(".cell-play-grid");

			//on a trouvé les deux cellules
			if (cellLeft && cellRight) {
				const rectLeft = cellLeft.getBoundingClientRect(); //on prend les dimensions/positions d'une cellule
				setSnappedCell({
					left: rectLeft.left, //le ghost va prendre cette position
					top: rectLeft.top,
					cellIdLeft: cellLeft.getAttribute("data-cellId"), // claude a pas compris : c'est les props de la basetile qui doivent aller dans la grid
					cellIdRight: cellRight.getAttribute("data-cellId"),
				});
			} else {
				setSnappedCell(null);
			}
		};
		/* 		const onMove = (ev: MouseEvent) => {
			setTilePosition({ left: ev.clientX, top: ev.clientY });
		}; */

		const onUp = () => {
			setDragged(null);
			setRotation(0);
			window.removeEventListener("mousemove", onMove);
			window.removeEventListener("mouseup", onUp);
		};

		window.addEventListener("mousemove", onMove);
		window.addEventListener("mouseup", onUp);
	}
	const ghostPos = snappedCell ?? tilePosition;
	return (
		<main
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === "r" && dragged) rotate();
			}}
		>
			<header className="kingdo-header"></header>
			<section className="draw-tiles">
				<div className="buttons-and-meeples">
					<RandomButton onDraw={() => DrawFourTiles(availableIds)} />
					<MoveButton onMove={() => MoveButtonTiles()} />
				</div>
				<FourTiles tiles={nextTiles} draggable={false} />
				<FourTiles
					tiles={currentTiles}
					draggable={true}
					onMouseDown={handleMouseDown}
				/>
			</section>

			<section className="section-play">
				<PlayGrid />
			</section>
			{dragged && (
				<div
					style={{
						position: "fixed",
						left: ghostPos.left,
						top: ghostPos.top,
						pointerEvents: "auto",
						zIndex: 1,
						backgroundColor: "red",
						transform: `rotate(${rotation}deg)`,
					}}
				>
					<BaseTile
						id={dragged.id}
						imgSrcRecto={dragged.imgSrcRecto}
						left={dragged.left}
						right={dragged.right}
						style={{
							pointerEvents: "none",
						}}
					/>
				</div>
			)}
		</main>
	);
}

export default App;

//draggable : pour activer la fonction de drag&drop seulement sur les current tiles
//si mauvaise manip d'un joueur ?? 2*move ?..... comment annuler le dernier coup ? avec localstroage ?
//revoir la syntaxe des set (prev => blabla) DANS TOUS LES FICHIERS

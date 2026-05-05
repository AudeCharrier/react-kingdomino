import { useState, useRef } from "react";
import RandomButton from "./components/base/random_button/RandomButton";
import baseTilesArray from "./data/baseTiles.js";
import { useDrag } from "./contexts/DragContext";
import PlayGrid from "./components/base/play_grid/PlayGrid.js";
import FourTiles from "./components/base/four_tiles/FourTiles";
import MoveButton from "./components/base/move_button/MoveButton.js";
import type { CSSProperties } from "react";
import BaseTile from "./components/base/base_tiles/BaseTile";
import "./App.css";
import { calculateScore } from "./utils/algoScoring";

interface TileProps {
	id?: number;
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
	const { dragged, setDragged, tilePosition, setTilePosition } = useDrag();
	const [usedIds, setUsedIds] = useState<number[]>([]);
	const [availableIds, setAvailableIds] = useState<number[]>(allIds);
	const [nextTiles, setNextTiles] = useState<TileProps[]>([]);
	const [currentTiles, setCurrentTiles] = useState<TileProps[]>([]);
	const [snappedCell, setSnappedCell] = useState<{
		left: number;
		top: number;
		cellLeft: string | null;
		cellRight: string | null;
	} | null>(null);
	const rotationRef = useRef(0);
	const offsetRef = useRef({ x: 0, y: 0 });

	const rotate = () => {
		setRotation((r) => {
			const newR = (r + 90) % 360;
			rotationRef.current = newR;
			return newR;
		});
	};
	// État pour stocker les tuiles posées sur la grille
	const [gridContent, setGridContent] = useState<Record<string, any>>({});
	const [score, setScore] = useState<ScoreResult | null>(null);

	function randomId(available: number[]) {
		const remaining = [...available];
		const randomIdsArray: number[] = [];
		for (let i = 0; i < 4; i++) {
			const randomIndex = Math.floor(Math.random() * remaining.length);
			randomIdsArray[i] = remaining[randomIndex];
			remaining.splice(randomIndex, 1);
		}
		return randomIdsArray;
	}

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

	function handleMouseDown(e: React.MouseEvent, tile: TileProps) {
		if (e.button !== 0) return;
		e.preventDefault();

		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

		offsetRef.current = {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		};

		setDragged(tile);
		setTilePosition({
			left: rect.left,
			top: rect.top,
		});

		const onMove = (ev: MouseEvent) => {
			const currentLeft = ev.clientX - offsetRef.current.x;
			const currentTop = ev.clientY - offsetRef.current.y;

			setTilePosition({ left: currentLeft, top: currentTop });

			const cellUnder = document
				.elementFromPoint(ev.clientX, ev.clientY)
				?.closest(".cell-play-grid");

			if (cellUnder) {
				const id = Number(cellUnder.getAttribute("data-cell-id"));
				const rectCell = cellUnder.getBoundingClientRect();
				const r = rotationRef.current % 360;
				const isVertical = r === 90 || r === 270;

				if (isVertical) {
					// Snap Vertical
					if (id <= 42) {
						// 49 - 7
						setSnappedCell({
							left: rectCell.left,
							top: rectCell.top,
							cellLeft: String(id),
							cellRight: String(id + 7),
						});
					}
				} else {
					// Snap Horizontal
					if (id % 7 !== 0) {
						setSnappedCell({
							left: rectCell.left,
							top: rectCell.top,
							cellLeft: String(id),
							cellRight: String(id + 1),
						});
					}
				}
			} else {
				setSnappedCell(null);
			}
		};
		const onUp = () => {
			// 1. On capture la rotation ACTUELLE avant tout reset
			const finalRotation = rotationRef.current % 360;

			setSnappedCell((currentSnap) => {
				if (
					currentSnap &&
					currentSnap.cellLeft &&
					currentSnap.cellRight &&
					tile
				) {
					const { cellLeft, cellRight } = currentSnap;

					let data1: TileProps["left"];
					let data2: TileProps["right"];

					if (finalRotation === 0 || finalRotation === 90) {
						data1 = tile.left;
						data2 = tile.right;
					} else {
						data1 = tile.right;
						data2 = tile.left;
					}

					setGridContent((prev) => ({
						...prev,
						[cellLeft]: {
							...data1,
							cellId: Number(cellLeft),
							imgSrc: tile.imgSrcRecto,
							// On utilise finalRotation pour le CSS et la logique
							part:
								finalRotation === 0 || finalRotation === 90
									? "left-part"
									: "right-part",
							rotation: finalRotation,
						},
						[cellRight]: {
							...data2,
							cellId: Number(cellRight),
							imgSrc: tile.imgSrcRecto,
							part:
								finalRotation === 0 || finalRotation === 90
									? "right-part"
									: "left-part",
							rotation: finalRotation,
						},
					}));

					setCurrentTiles((prev) => prev.filter((t) => t.id !== tile.id));
				}
				return null;
			});

			// 2. Le reset ne se fait qu'APRÈS
			setDragged(null);
			setRotation(0);
			rotationRef.current = 0;
			window.removeEventListener("mousemove", onMove);
			window.removeEventListener("mouseup", onUp);
		};
		window.addEventListener("mousemove", onMove);
		window.addEventListener("mouseup", onUp);
	}

	const ghostPos = snappedCell
		? { left: snappedCell.left, top: snappedCell.top }
		: tilePosition;

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
				<PlayGrid gridContent={gridContent} />
			</section>

			{dragged && (
				<div
					className="drag-container"
					style={{
						position: "fixed",
						left: ghostPos.left,
						top: ghostPos.top,
						pointerEvents: "none",
						zIndex: 1000,
						transformOrigin: "top left",
						transform: `rotate(${rotation}deg) ${
							rotation === 90
								? "translate(0, -100%)"
								: rotation === 180
									? "translate(-100%, -100%)"
									: rotation === 270
										? "translate(-100%, 0)"
										: "translate(0, 0)"
						}`,
					}}
				>
					<BaseTile
						id={dragged.id}
						imgSrcRecto={dragged.imgSrcRecto}
						left={dragged.left}
						right={dragged.right}
						style={{ pointerEvents: "none" }}
					/>
				</div>
			)}
			<section className="section-score">
				<button
					type="button"
					onClick={() => setScore(calculateScore(gridContent))}
				>
					Calculer le score
				</button>

				{score && (
					<>
						{score.details.map((scodetail) => (
							<p key={scodetail.landscape}>
								{scodetail.landscape} : {scodetail.score}
							</p>
						))}
						<p>Total : {score.total}</p>
					</>
				)}
			</section>
		</main>
	);
}

export default App;

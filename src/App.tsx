import { useRef, useState } from "react";
import { calculateScore } from "./utils/algoScoring";
import { useDrag } from "./contexts/DragContext";
import BaseTile from "./components/base/base_tiles/BaseTile";
import FourTiles from "./components/base/four_tiles/FourTiles";
import MoveButton from "./components/base/move_button/MoveButton.js";
import PlayGrid from "./components/base/play_grid/PlayGrid.js";
import RandomButton from "./components/base/random_button/RandomButton";
import PlayerHelper from "./components/common/player_helper/PlayerHelper.js";
import type { TileProps, ScoreResult } from "./types/game.types";
import "./App.css";

import { useTileManager } from "./hooks/useTileManager";

function App() {
	const {
		availableIds,
		nextTiles,
		currentTiles,
		setCurrentTiles,
		DrawFourTiles,
		MoveButtonTiles,
	} = useTileManager();

	const { dragged, setDragged, tilePosition, setTilePosition } = useDrag();
	const [rotation, setRotation] = useState<number>(0);
	const [snappedCell, setSnappedCell] = useState<{
		left: number;
		top: number;
		cellLeft: string | null;
		cellRight: string | null;
	} | null>(null);

	// État pour stocker les tuiles posées sur la grille
	const [gridContent, setGridContent] = useState<Record<string, any>>({});
	const [score, setScore] = useState<ScoreResult | null>(null);

	const rotationRef = useRef(0);
	const offsetRef = useRef({ x: 0, y: 0 });

	const rotate = () => {
		setRotation((r) => {
			const newR = (r + 90) % 360;
			rotationRef.current = newR;
			return newR;
		});
	};

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
			className="app-container"
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === "r" && dragged) rotate();
			}}
		>
			<header className="kingdo-header">
				<h1>Kingdomino Origins</h1>
			</header>
			<div className="game-layout">
				<section className="draw-tiles">
					<div className="four-tiles">
						<RandomButton onDraw={() => DrawFourTiles(availableIds)} />
						<FourTiles tiles={nextTiles} draggable={false} />
					</div>
					<div className="four-tiles">
						<MoveButton onMove={() => MoveButtonTiles()} />
						<FourTiles
							tiles={currentTiles}
							draggable={true}
							onMouseDown={handleMouseDown}
						/>
					</div>
				</section>

				<section className="section-play">
					<PlayGrid gridContent={gridContent} />
				</section>
				<aside className="playerhelper-container">
					<PlayerHelper />
					<button type="button" className="fake-btn-rotation">
						<span className="kbd">R</span>
						<span className="arrow">&#10227;</span>{" "}
						<span className="text-rotation">Pivote la tuile à 90°</span>
					</button>
					<button
						type="button"
						className="btn-style-stone"
						onClick={() => setScore(calculateScore(gridContent))}
					>
						Calculer le score
					</button>
				</aside>
			</div>
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

			{score && (
				<div className="endgame-overlay">
					<div className="endgame-popup">
						<h2 className="endgame-title">Fin de partie</h2>
						{score.details.map((scodetail) => (
							<div className="score-line" key={scodetail.landscape}>
								<span className="score-label">
									{scodetail.landscape} : {scodetail.score}
								</span>
							</div>
						))}

						<div className="final-total">
							<span>Total : {score.total}</span>
						</div>

						<button type="button" className="close-button">
							Fermer
						</button>
					</div>
				</div>
			)}
		</main>
	);
}

export default App;

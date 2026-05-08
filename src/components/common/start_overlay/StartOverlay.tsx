import React, { useState } from "react";
import "./StartOverlay.css";

const steps = [
	{ time: 0, text: "Mise en place : tire 4 tuiles du prochain tour" },
	{
		time: 1,
		text: "Début d’un tour : mets les tuiles en jeu puis tire 4 nouvelles tuiles.",
	},
	{
		time: 3,
		text: "Choisis une tuile et amène-la sur la grille. Pivote avec R.",
	},
	{
		time: 4,
		text: "Connecte au moins un paysage commun. Attention, posé c’est posé !",
	},
	{ time: 5, text: "Optimise ton score avec les flammes (multiplicateurs)." },
	{
		time: 6,
		text: "Score final : nombre de cases × nombre de flammes par zone.",
	},
];

function StartOverlay({ onStart }: { onStart: () => void }) {
	const [currentText, setCurrentText] = useState(steps[0].text);

	const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
		const t = e.currentTarget.currentTime;
		// On cherche le dernier step dont le temps est inférieur au temps actuel
		const step = [...steps].reverse().find((s) => t >= s.time);
		if (step) {
			setCurrentText(step.text);
		}
	};

	return (
		<div className="overlay">
			<div className="start-popup">
				<h2 className="title">Tutoriel</h2>

				<div className="video-container">
					<video
						src="/tuto.mp4" // Le "/" est important pour Netlify
						autoPlay
						muted
						loop
						onTimeUpdate={handleTimeUpdate}
						className="video-player"
					/>

					<div className="subtitle-box">
						<p className="subtitle">{currentText}</p>
					</div>
				</div>

				<div className="controls">
					<button
						type="button"
						className="btn-style-stone start-button"
						onClick={onStart}
					>
						JOUER
					</button>
				</div>
			</div>
		</div>
	);
}

export default StartOverlay;

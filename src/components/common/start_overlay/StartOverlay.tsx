import { useState } from "react";
import type React from "react";
import "./StartOverlay.css";

const steps = [
	{
		time: 0,
		text: "Mise en place : tire 4 tuiles du prochain tour. Le chargement peut prendre quelques secondes...",
	},
	{
		time: 8,
		text: "Début d’un tour : mets les tuiles en jeu puis tire 4 nouvelles tuiles.",
	},
	{
		time: 14,
		text: "Choisis une tuile et amène-la sur la grille. Pivote avec R.",
	},
	{
		time: 26,
		text: "Connecte au moins un paysage commun à une tuile déjà posée. Sois précis avec la souris. Attention, posé c’est posé !",
	},

	{
		time: 33,
		text: "En mode solo, dès que tu as joué 2 tuiles, le tour est fini.",
	},
	{
		time: 44,
		text: "Marque des points : une zone de même paysage = nombre de cases * nombre de flammes. Plusieurs zones possibles par paysage.",
	},
	{
		time: 65,
		text: "Découvre ton score final ! Pourras-tu battre ton record ?...",
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
						src="/tuto_kingdo.mp4" // Le "/" est important pour Netlify
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

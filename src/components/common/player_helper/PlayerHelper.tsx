import "./PlayerHelper.css";

function PlayerHelper() {
	return (
		<div className="playerhelper-compo">
			<p className="playerhelper-title">Déroulé du tour - mode Solo</p>
			<ol className="playerhelper-list">
				<li className="player-instruction">Actualiser le "Tour actuel" </li>
				<li className="player-instruction">Tirer le prochain tour</li>
				<li className="player-instruction">Sélectionner une tuile</li>
				<li className="player-instruction">
					Pivoter avec <span className="kbd">R</span>
				</li>
				<li className="player-instruction">
					S'il reste 2 tuiles : fin du tour
				</li>
				<li className="player-instruction">
					Fin du jeu : Calcule ton score !{" "}
				</li>
			</ol>
		</div>
	);
}

export default PlayerHelper;

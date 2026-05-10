import "./Header.css";

function Header() {
	return (
		<header className="kingdo-header">
			<div className="reset-game">
				<p>🠕 Rafraîchis la page pour rejouer</p>
				<p> (Bouton Reset coming soon !)</p>
			</div>
			<h1>Kingdomino Origins</h1>
			<div className="credits">
				<p>Un jeu de Bruno Cathala</p>
				<a href="https://www.youtube.com/watch?v=e6UFh9tLAiA">
					➞ La règle en vidéo pour plusieurs joueurs
				</a>
			</div>
		</header>
	);
}

export default Header;

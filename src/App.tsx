import "./App.css";

import BaseTile from "./components/base/base_tiles/BaseTile";
import baseTilesArray from "./data/baseTiles.js";

function App() {
	const testId = 6;
	const aleatoireTile = baseTilesArray.find((tile) => tile.id === testId);
	//faire un usestate à la place de la variable

	//TypeScript a besoin d'etre sur que la cible existe, il aime pas ça avec find
	//TypeScript ne peut pas savoir à la compilation si l'id 6 existe dans ton tableau. Donc il te force à gérer le cas où rien n'est trouvé.

	if (!aleatoireTile) {
		return <p>Tile not found !</p>;
	} else
		return (
			/* 		<section>
			{baseTilesArray.map((tile) => (
				<BaseTile
					key={tile.id}
					id={tile.id}
					imgSrcRecto={tile.imgSrcRecto}
					imgSrcVerso={tile.imgSrcVerso}
					left={tile.left}
					right={tile.right}
				/>
			))}

		</section> */
			<BaseTile
				id={aleatoireTile.id}
				imgSrcRecto={aleatoireTile.imgSrcRecto}
				imgSrcVerso={aleatoireTile.imgSrcVerso}
				left={aleatoireTile.left}
				right={aleatoireTile.right}
			/>
		);
}

//balise-composant tout est inventé : le nom de la balise et les attributs
//c'est là que je mets le nom du props

export default App;

/* const minId = baseTilesArray[0].id;
const maxId = baseTilesArray[baseTilesArray.length - 1].id; 

function randomId(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

randomId(minId, maxId);
 */

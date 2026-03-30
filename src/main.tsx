import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const rootElement = document.getElementById("root");

if (rootElement == null) {
	throw new Error(`Your HTML Document must contain a <div id="root"></div>`);
}

createRoot(rootElement).render(
	<StrictMode>
		<App />
	</StrictMode>,
);

//impossible de localiser le module data/baseTiles --> noms ?

//fct aléatoire qui sort plusieurs chiffres entre 1 et 48
//classer par ordre croissant
//find ça dans le tableau

//ou : en affihcer plusieurs pour tester, déplacer, rotation, adjacence position
//calcul score ?

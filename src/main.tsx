import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DragProvider } from "./contexts/DragContext";

import "./index.css";
import App from "./App.tsx";

const rootElement = document.getElementById("root");

if (rootElement == null) {
	throw new Error(`Your HTML Document must contain a <div id="root"></div>`);
}

createRoot(rootElement).render(
	<StrictMode>
		<DragProvider>
			<App />
		</DragProvider>
	</StrictMode>,
);

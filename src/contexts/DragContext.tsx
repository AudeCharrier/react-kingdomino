import { createContext, useContext, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

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

interface DragContextType {
	dragged: TileProps | null;
	setDragged: (tile: TileProps | null) => void;
	tilePosition: { left: number; top: number };
	setTilePosition: (pos: { left: number; top: number }) => void;
	rotation: number;
	rotate: () => void;
}

const DragContext = createContext<DragContextType | null>(null);

export function DragProvider({ children }: { children: React.ReactNode }) {
	const [dragged, setDragged] = useState<TileProps | null>(null);
	const [tilePosition, setTilePosition] = useState<{
		left: number;
		top: number;
	}>({ left: 0, top: 0 });
	const [rotation, setRotation] = useState(0);
	const rotate = () => setRotation((r) => r + 90);

	return (
		<DragContext.Provider
			value={{
				dragged,
				setDragged,
				tilePosition,
				setTilePosition,
				rotation,
				rotate,
			}}
		>
			{children}
		</DragContext.Provider>
	);
}

export const useDrag = () => {
	const context = useContext(DragContext);
	if (!context) throw new Error("useDrag must be used within a DragProvider");
	return context;
};

/* Le throw dans useDrag c'est pour éviter que TypeScript se plaigne que le contexte pourrait être null à chaque fois que tu l'utilises. */

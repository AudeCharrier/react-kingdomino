import type { CSSProperties } from "react";

export interface TileData {
	landscape: string;
	flames: number;
	volcanoFire?: number;
	resource?: string;
	alt: string;
}

export interface TileProps {
	id?: number;
	imgSrcRecto: string;
	left: TileData;
	right: TileData;
	style?: CSSProperties;
}

export interface SnappedCell {
	left: number;
	top: number;
	cellLeft: string;
	cellRight: string;
}

export interface ScoreDetails {
	landscape: string;
	score: number;
}

export interface ScoreResult {
	details: ScoreDetails[];
	total: number;
}

import "./BaseTile.css";
/*
import Tile1Recto from "./assets/tile_1_recto.webp";
import Tile1Verso from "./assets/tile_1_verso.webp"; 
import Tile1Recto from "./assets/tile_1_recto.webp";
import Tile1Recto from "./assets/tile_1_recto.webp";
import Tile1Recto from "./assets/tile_1_recto.webp";*/
/*
const baseTilesArray = [
	{
		id: 1,
		imgSrcRecto: Tile1Recto,
		imgSrcVerso: Tile1Verso,

		left: {
			landscape: "desert",
			flames: 0,
			alt: "tile#1 recto left",
		},
		right: {
			landscape: "desert",
			flames: 0,
			alt: "tile#1 recto right",
		},
	},

	{
		id: 2,
		imgSrcRecto: Tile2Recto,
		imgSrcVerso: Tile2Verso,

		left: {
			landscape: "desert",
			flames: 0,
			alt: "tile#2 recto left",
		},
		right: {
			landscape: "desert",
			flames: 0,
			alt: "tile#2 recto right",
		},
	},
		{
		id: 3,
		imgSrcRecto: Tile3Recto,
		imgSrcVerso: Tile3Verso,

		left: {
			landscape: "desert",
			flames: 0,
			alt: "tile#3 recto left",
		},
		right: {
			landscape: "desert",
			flames: 0,
			alt: "tile#3 recto right",
		},
	},
		{
		id: 4,
		imgSrcRecto: Tile4Recto,
		imgSrcVerso: Tile4Verso,

		left: {
			landscape: "desert",
			flames: 0,
			alt: "tile#4 recto left",
		},
		right: {
			landscape: "meadow",
			flames: 0,
			resource: "mammoth",
			alt: "tile#4 recto right",
		},
	},
		{
		id: 5,
		imgSrcRecto: Tile5Recto,
		imgSrcVerso: Tile5Verso,

		left: {
			landscape: "desert",
			flames: 0,
			alt: "tile#5 recto left",
		},
		right: {
			landscape: "meadow",
			flames: 0,
			resource: "mammoth";
			alt: "tile#5 recto right",
		},
	},
		{
		id: 6,
		imgSrcRecto: Tile6Recto,
		imgSrcVerso: Tile6Verso,

		left: {
			landscape: "desert",
			flames: 0,
			alt: "tile#6 recto left",
		},
		right: {
			landscape: "lake",
			flames: 0,
			resource: "fish",
			alt: "tile#6 recto right",
		},
	},
		{
		id: 7,
		imgSrcRecto: Tile7Recto,
		imgSrcVerso: Tile7Verso,

		left: {
			landscape: "desert",
			flames: 0,
			alt: "tile#7 recto left",
		},
		right: {
			landscape: "lake",
			flames: 0,
			resource: "fish",
			alt: "tile#7 recto right",
		},
	},
		{
		id: 8,
		imgSrcRecto: Tile8Recto,
		imgSrcVerso: Tile8Verso,

		left: {
			landscape: "desert",
			flames: 0,
			alt: "tile#8 recto left",
		},
		right: {
			landscape: "jungle",
			flames: 0,
			resource: "mushroom",
			alt: "tile#8 recto right",
		},
	},
		{
		id: 9,
		imgSrcRecto: Tile9Recto,
		imgSrcVerso: Tile9Verso,

		left: {
			landscape: "desert",
			flames: 0,
			alt: "tile#9 recto left",
		},
		right: {
			landscape: "jungle",
			flames: 0,
			resource: "mushroom"
			alt: "tile#9 recto right",
		},
	},
		{
		id: 10,
		imgSrcRecto: Tile10Recto,
		imgSrcVerso: Tile10Verso,

		left: {
			landscape: "desert",
			flames: 0,
			alt: "tile#10 recto left",
		},
		right: {
			landscape: "rocky",
			flames: 0,
			resource: "silex",
			alt: "tile#10 recto right",
		},
	},
		{
		id: 11,
		imgSrcRecto: Tile11Recto,
		imgSrcVerso: Tile11Verso,

		left: {
			landscape: "desert",
			flames: 0,
			alt: "tile#11 recto left",
		},
		right: {
			landscape: "rocky",
			flames: 0,
			resource: "silex",
			alt: "tile#11 recto right",
		},
	},
		{
		id: 12,
		imgSrcRecto: Tile12Recto,
		imgSrcVerso: Tile12Verso,

		left: {
			landscape: "meadow",
			flames: 0,
			resource: "mammoth",
			alt: "tile#12 recto left",
		},
		right: {
			landscape: "meadow",
			flames: 0,
			resource: "mammoth",
			alt: "tile#12 recto right",
		},
	},

	{
		id: 13,
		imgSrcRecto: Tile13Recto,
		imgSrcVerso: Tile13Verso,

		left: {
			landscape: "meadow",
			flames: 0,
			resource: "mammoth",
			alt: "tile#13 recto left",
		},
		right: {
			landscape: "meadow",
			flames: 0,
			resource: "mammoth",
			alt: "tile#13 recto right",
		},
	},

	{
		id: 14,
		imgSrcRecto: Tile14Recto,
		imgSrcVerso: Tile14Verso,

		left: {
			landscape: "meadow",
			flames: 0,
			resource: "mammoth",
			alt: "tile#14 recto left",
		},
		right: {
			landscape: "meadow",
			flames: 0,
			resource: "mammoth",
			alt: "tile#14 recto right",
		},
	},
	{
		id: 15,
		imgSrcRecto: Tile15Recto,
		imgSrcVerso: Tile15Verso,

		left: {
			landscape: "lake",
			flames: 0,
			resource: "fish",
			alt: "tile#15 recto left",
		},
		right: {
			landscape: "lake",
			flames: 0,
			resource: "fish",
			alt: "tile#15 recto right",
		},
	},
		{
		id: 16,
		imgSrcRecto: Tile16Recto,
		imgSrcVerso: Tile16Verso,

		left: {
			landscape: "lake",
			flames: 0,
			resource: "fish",
			alt: "tile#16 recto left",
		},
		right: {
			landscape: "lake",
			flames: 0,
			resource: "fish",
			alt: "tile#16 recto right",
		},
	},
		{
		id: 17,
		imgSrcRecto: Tile17Recto,
		imgSrcVerso: Tile17Verso,

		left: {
			landscape: "jungle",
			flames: 0,
			resource: "mushroom",
			alt: "tile#17 recto left",
		},
		right: {
			landscape: "jungle",
			flames: 0,
			resource: "mushroom",
			alt: "tile#17 recto right",
		},
	},
		{
		id: 18,
		imgSrcRecto: Tile18Recto,
		imgSrcVerso: Tile18Verso,

		left: {
			landscape: "jungle",
			flames: 0,
			resource:"mushroom",
			alt: "tile#18 recto left",
		},
		right: {
			landscape: "jungle",
			flames: 0,
			resource: "mushroom",
			alt: "tile#18 recto right",
		},
	},
	{
		id: 19,
		imgSrcRecto: Tile19Recto,
		imgSrcVerso: Tile19Verso,

		left: {
			landscape: "meadow",
			flames: 0,
			resource: "mammoth",
			alt: "tile#19 recto left",
		},
		right: {
			landscape: "lake",
			flames: 0,
			resource: "fish",
			alt: "tile#19 recto right",
		},
	},
	{
		id: 20,
		imgSrcRecto: Tile20Recto,
		imgSrcVerso: Tile20Verso,

		left: {
			landscape: "lake",
			flames: 0,
			resource: "fish",
			alt: "tile#20 recto left",
		},
		right: {
			landscape: "jungle",
			flames: 0,
			resource: "mushroom",
			alt: "tile#20 recto right",
		},
	},
	{
		id: 21,
		imgSrcRecto: Tile21Recto,
		imgSrcVerso: Tile21Verso,

		left: {
			landscape: "meadow",
			flames: 0,
			resource: "mammoth",
			alt: "tile#21 recto left",
		},
		right: {
			landscape: "rocky",
			flames: 0,
			resource: "silex",
			alt: "tile#21 recto right",
		},
	},
	{
		id: 22,
		imgSrcRecto: Tile22Recto,
		imgSrcVerso: Tile22Verso,

		left: {
			landscape: "meadow",
			flames: 0,
			resource: "mammoth",
			alt: "tile#22 recto left",
		},
		right: {
			landscape: "rocky",
			flames: 0,
			resource: "silex"
			alt: "tile#22 recto right",
		},
	},
	{
		id: 23,
		imgSrcRecto: Tile23Recto,
		imgSrcVerso: Tile23Verso,

		left: {
			landscape: "jungle",
			flames: 0,
			resource: "mushroom",
			alt: "tile#23 recto left",
		},
		right: {
			landscape: "rocky",
			flames: 0,
			resource: "silex",
			alt: "tile#23 recto right",
		},
	},
	{
		id: 24,
		imgSrcRecto: Tile24Recto,
		imgSrcVerso: Tile24Verso,

		left: {
			landscape: "desert",
			flames: 0,
			alt: "tile#24 recto left",
		},
		right: {
			landscape: "meadow",
			flames: 1,
			alt: "tile#24 recto right",
		},
	},

	{
		id: 25,
		imgSrcRecto: Tile25Recto,
		imgSrcVerso: Tile25Verso,

		left: {
			landscape: "desert",
			flames: 0,
			alt: "tile#25 recto left",
		},
		right: {
			landscape: "lake",
			flames: 1,
			alt: "tile#25 recto right",
		},
	},

	{
		id: 26,
		imgSrcRecto: Tile26Recto,
		imgSrcVerso: Tile26Verso,

		left: {
			landscape: "desert",
			flames: 0,
			alt: "tile#26 recto left",
		},
		right: {
			landscape: "jungle",
			flames: 1,
			alt: "tile#26 recto right",
		},
	},
	{
		id: 27,
		imgSrcRecto: Tile27Recto,
		imgSrcVerso: Tile27Verso,

		left: {
			landscape: "desert",
			flames: 0,
			alt: "tile#27 recto left",
		},
		right: {
			landscape: "rocky",
			flames: 1,
			alt: "tile#27 recto right",
		},
	},
		{
		id: 28,
		imgSrcRecto: Tile28Recto,
		imgSrcVerso: Tile28Verso,

		left: {
			landscape: "desert",
			flames: 0,
			alt: "tile#28 recto left",
		},
		right: {
			landscape: "volcano",
			volcanoFire: 1,
			alt: "tile#28 recto right",
		},
	},
		{
		id: 29,
		imgSrcRecto: Tile29Recto,
		imgSrcVerso: Tile29Verso,

		left: {
			landscape: "desert",
			flames: 0,
			alt: "tile#29 recto left",
		},
		right: {
			landscape: "volcano",
			volcanoFire: 1,
			alt: "tile#29 recto right",
		},
	},
	{
		id: 30,
		imgSrcRecto: Tile30Recto,
		imgSrcVerso: Tile30Verso,

		left: {
			landscape: "desert",
			flames: 1,
			alt: "tile#30 recto left",
		},
		right: {
			landscape: "meadow,
			flames: 0,
			resource: "mammoth",
			alt: "tile#30 recto right",
		},
	},
	{
		id: 31,
		imgSrcRecto: Tile31Recto,
		imgSrcVerso: Tile31Verso,

		left: {
			landscape: "desert",
			flames: 1,
			alt: "tile#31 recto left",
		},
		right: {
			landscape: "lake",
			flames: 0,
			resource: "fish",
			alt: "tile#31 recto right",
		},
	},
	{
		id: 32,
		imgSrcRecto: Tile32Recto,
		imgSrcVerso: Tile32Verso,

		left: {
			landscape: "meadow",
			flames: 1,
			alt: "tile#32 recto left",
		},
		right: {
			landscape: "lake",
			flames: 0,
			resource: "fish",
			alt: "tile#32 recto right",
		},
	},
	{
		id: 33,
		imgSrcRecto: Tile33Recto,
		imgSrcVerso: Tile33Verso,

		left: {
			landscape: "meadow",
			flames: 1,
			alt: "tile#33 recto left",
		},
		right: {
			landscape: "jungle",
			flames: 0,
			resource: "mushroom",
			alt: "tile#33 recto right",
		},
	},
	{
		id: 34,
		imgSrcRecto: Tile34Recto,
		imgSrcVerso: Tile34Verso,

		left: {
			landscape: "meadow",
			flames: 0,
			resource: "mammoth",
			alt: "tile#34 recto left",
		},
		right: {
			landscape: "lake",
			flames: 1,
			alt: "tile#34 recto right",
		},
	},
	{
		id: 35,
		imgSrcRecto: Tile35Recto,
		imgSrcVerso: Tile35Verso,

		left: {
			landscape: "lake",
			flames: 1,
			alt: "tile#35 recto left",
		},
		right: {
			landscape: "rocky",
			flames: 0,
			resource: "silex",
			alt: "tile#35 recto right",
		},
	},
	{
		id: 36,
		imgSrcRecto: Tile36Recto,
		imgSrcVerso: Tile36Verso,

		left: {
			landscape: "meadow",
			flames: 0,
			resource: "mammoth",
			alt: "tile#36 recto left",
		},
		right: {
			landscape: "jungle",
			flames: 1,
			alt: "tile#36 recto right",
		},
	},

	{
		id: 37,
		imgSrcRecto: Tile37Recto,
		imgSrcVerso: Tile37Verso,

		left: {
			landscape: "rocky",
			flames: 0,
			resource: "silex",
			alt: "tile#37 recto left",
		},
		right: {
			landscape: "rocky",
			flames: 1,
			alt: "tile#37 recto right",
		},
	},

	{
		id: 38,
		imgSrcRecto: Tile38Recto,
		imgSrcVerso: Tile38Verso,

		left: {
			landscape: "meadow",
			flames: 0,
			resource: "mammoth",
			alt: "tile#38 recto left",
		},
		right: {
			landscape: "volcano",
			volcanoFire: 1,
			alt: "tile#38 recto right",
		},
	},
	{
		id: 39,
		imgSrcRecto: Tile39Recto,
		imgSrcVerso: Tile39Verso,

		left: {
			landscape: "meadow",
			flames: 0,
			resource: "mammoth",
			alt: "tile#39 recto left",
		},
		right: {
			landscape: "volcano",
			volcanoFire: 1,
			alt: "tile#39 recto right",
		},
	},
		{
		id: 40,
		imgSrcRecto: Tile40Recto,
		imgSrcVerso: Tile40Verso,

		left: {
			landscape: "lake",
			flames: 0,
			resource: "fish",
			alt: "tile#40 recto left",
		},
		right: {
			landscape: "volcano",
			volcanoFire: 1,
			alt: "tile#40 recto right",
		},
	},
		{
		id: 41,
		imgSrcRecto: Tile41Recto,
		imgSrcVerso: Tile41Verso,

		left: {
			landscape: "lake",
			flames: 0,
			resource: "fish",
			alt: "tile#41 recto left",
		},
		right: {
			landscape: "rocky",
			flames: 2,
			alt: "tile#41 recto right",
		},
	},
	{
		id: 42,
		imgSrcRecto: Tile42Recto,
		imgSrcVerso: Tile42Verso,

		left: {
			landscape: "lake",
			flames: 0,
			resource: "fish",
			alt: "tile#42 recto left",
		},
		right: {
			landscape: "volcano",
			volcanoFire: 2,
			alt: "tile#42 recto right",
		},
	},
	{
		id: 43,
		imgSrcRecto: Tile43Recto,
		imgSrcVerso: Tile43Verso,

		left: {
			landscape: "jungle",
			flames: 0,
			resource: "mushroom",
			alt: "tile#43 recto left",
		},
		right: {
			landscape: "volcano",
			volcanoFire: 2,
			alt: "tile#43 recto right",
		},
	},
	{
		id: 44,
		imgSrcRecto: Tile44Recto,
		imgSrcVerso: Tile44Verso,

		left: {
			landscape: "jungle",
			flames: 0,
			resource: "mushroom",
			alt: "tile#44 recto left",
		},
		right: {
			landscape: "volcano",
			volcanoFire: 2,
			alt: "tile#44 recto right",
		},
	},
	{
		id: 45,
		imgSrcRecto: Tile45Recto,
		imgSrcVerso: Tile45Verso,

		left: {
			landscape: "rocky",
			flames: 0,
			resource: "silex", 
			alt: "tile#45 recto left",
		},
		right: {
			landscape: "volcano",
			volcanoFire: 2,
			alt: "tile#45 recto right",
		},
	},
	{
		id: 46,
		imgSrcRecto: Tile46Recto,
		imgSrcVerso: Tile46Verso,

		left: {
			landscape: "lake",
			flames: 1,
			alt: "tile#46 recto left",
		},
		right: {
			landscape: "jungle",
			flames: 2,
			alt: "tile#46 recto right",
		},
	},
	{
		id: 47,
		imgSrcRecto: Tile47Recto,
		imgSrcVerso: Tile47Verso,

		left: {
			landscape: "jungle",
			flames: 1,
			alt: "tile#47 recto left",
		},
		right: {
			landscape: "rocky",
			flames: 2,
			alt: "tile#47 recto right",
		},
	},
	{
		id: 48,
		imgSrcRecto: Tile48Recto,
		imgSrcVerso: Tile48Verso,

		left: {
			landscape: "rocky",
			flames: 0,
			resource: "silex",
			alt: "tile#48 recto left",
		},
		right: {
			landscape: "volcano",
			volcanoFire: 3,
			alt: "tile#48 recto right",
		},
	},
];*/

// composant bouton : générer aléatoirement entre 1 et 48
//.find dans baseTilesArray l'id qui correspond

interface TileProps {
	id?: number; //pas olbigé d'exister dans l'objet de ce type, ou pas obligé d'être passé en prop
	imgSrcRecto: string;
	imgSrcVerso: string;

	left: {
		landscape: string;
		crowns: number;
		alt: string;
	};
	right: {
		landscape: string;
		crowns: number;
		alt: string;
	};
}

function BaseTile(props: TileProps) {
	return (
		<div className="img-container">
			<img
				src={props.imgSrcRecto}
				alt={props.left.alt}
				className="left-tile"
				data-landscape={props.left.landscape}
				data-crowns={props.left.crowns}
			/>
			<img
				src={props.imgSrcRecto}
				alt={props.right.alt}
				className="right-tile"
				data-left={props.right.landscape}
				data-crowns={props.right.crowns}
			/>
		</div>
	);
}
//là ce sont de vraies balises, on doit respecter les bons attributs qui existent

export default BaseTile;

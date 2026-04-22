function NextTiles(basetiles) {
	return (
		<>
			{nextTilesToPlay.map((nextTile) => (
				<BaseTile
					key={nextTile.id}
					id={nextTile.id}
					imgSrcRecto={nextTile.imgSrcRecto}
					imgSrcVerso={nextTile.imgSrcVerso}
					left={nextTile.left}
					right={nextTile.right}
				/>
			))}
			;
		</>
	);
}

export default NextTiles;

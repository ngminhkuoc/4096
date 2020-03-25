import React from 'react'

const TileInner = ({ tile }) => (
    <div className={`tile tile-${tile.value} tile-position-${tile.x + 1}-${tile.y + 1}`}>
        <div className="tile-inner">{tile.value}</div>
    </div>
)

export default TileInner
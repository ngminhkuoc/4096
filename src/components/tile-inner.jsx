import React from 'react'

const TileInner = ({tile}) => (
    <div className={`tile tile-${tile.value} tile-position-${tile.x}-${tile.y}`}>
        <div class="tile-inner">{tile.value}</div>
    </div>
)

export default TileInner
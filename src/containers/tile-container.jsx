import { connect } from "react-redux";
import React from 'react'
import TileInner from '../components/tile-inner'

function renderTiles(cells) {
    let tiles = [];
    if (cells) {
        for (let row = 0; row < cells.length; row++) {
            for (let column = 0; column < cells[row].length; column++) {
                const cell = cells[row][column];
                if (cell) {
                    tiles.push(
                        <TileInner key={`${cell.x} - ${cell.y}`} tile={cell} />
                    )
                }
            }
        }
    } 
    return tiles;
}

const TileList = ({ cells }) => (
    <div className="tile-container">
        {renderTiles(cells)}
    </div>
)

const getCells = state => {
    return state.gameReducer && state.gameReducer.grid ? state.gameReducer.grid.cells : null;
}

const mapStateToProps = state => {
    return {
        cells: getCells(state),
    }
}

const TileContainer = connect(mapStateToProps, {})(TileList)

export default TileContainer
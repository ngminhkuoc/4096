import { connect } from "react-redux";
import React from 'react'
import TileInner from '../components/tile-inner'

const TileList = ({ cells }) => (
    <div className="tile-container">
        {
            cells && cells.length ?
                cells.map((column) => (
                    column.map((cell) => (
                        cell ? <TileInner key={`${cell.x + 1}-${cell.y + 1}`} tile={cell} /> : ""
                    ))
                ))
                : ""
        }
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
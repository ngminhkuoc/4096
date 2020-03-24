import React, { Component } from "react";
import { connect } from "react-redux";

class TileContainer extends Component {
    renderTiles() {
        const { grid } = this.props;
        let tiles = [];
        if (grid) {
            for (let row = 0; row < grid.cells.length; row++) {
                for (let column = 0; column < grid.cells[row].length; column++) {
                    const cell = grid.cells[row][column];
                    tiles.push(
                        <div className={`tile tile-${cell.value} tile-position-${cell.x}-${cell.y}`}>
                            <div class="tile-inner">{cell.value}</div>
                        </div>
                    )
                }
            }
        }
    }

    render() {
        return (
            <div className="tile-container">
                {this.renderTiles()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        grid: state.grid
    };
}


export default connect(mapStateToProps)(TileContainer)
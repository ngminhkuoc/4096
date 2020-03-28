import React from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import TileInner from '../tile-inner';
import { MAX_SCORE } from '../../constants/app-constants';

const TILE_MERGED = 'tile-merged';
const TILE_NEW = 'tile-new';

class TileList extends React.Component {
    constructor(props) {
        super(props);
        this.movingTiles = [];
    }

    componentDidUpdate() {
        if (this.movingTiles && this.movingTiles.length) {
            var movingTiles = this.movingTiles;
            window.requestAnimationFrame(function () {
                movingTiles.forEach((tileControl) => {
                    if (tileControl.ref && tileControl.ref.current)
                        tileControl.ref.current.updateCssClass(tileControl.cssClass);
                });
            });
            this.movingTiles = [];
        }
    }

    getPositionCssClass(position) {
        return `tile-position-${position.x + 1}-${position.y + 1}`;
    }

    getCssClasses(tile, position) {
        return `tile tile-${(tile.value > MAX_SCORE ? "super" : tile.value)} ${this.getPositionCssClass(position)} ${(tile.mergedFrom && tile.mergedFrom.length) ? TILE_MERGED : (!tile.previousPosition ? TILE_NEW : "")}`;
    }

    renderTile(tile) {
        let controls = [];
        let position = tile.previousPosition || { x: tile.x, y: tile.y };

        if (!tile.previousPosition && tile.mergedFrom) {
            tile.mergedFrom.forEach(function (merged) {
                if (this) {
                    this.renderTile(merged);
                }
            });
        }

        var newRef = React.createRef();
        var control = <TileInner key={uuidv4()} cssClass={this.getCssClasses(tile, position)} value={tile.value} ref={newRef} />;
        controls.push(control);

        if (tile.previousPosition) {
            this.movingTiles.push({
                ref: newRef,
                cssClass: this.getCssClasses(tile, { x: tile.x, y: tile.y })
            });
        }

        return controls;
    }

    getTiles() {
        const { cells } = this.props;
        let tiles = [];
        if (cells && cells.length) {

            cells.forEach(column => {
                column.forEach(cell => {
                    if (cell) {
                        tiles.push(this.renderTile(cell));
                    }
                });
            });
            return tiles;
        }
    }

    render() {
        return (
            <div className="tile-container">
                {this.getTiles()}
            </div>
        )
    }
}

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
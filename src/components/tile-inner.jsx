import React from 'react'
import { MAX_SCORE } from '../constants/app-constants'

export default class TileInner extends React.Component {
    getPositionCssClass(position) {
        return `tile-position-${position.x + 1}-${position.y + 1}`;
    }

    getCssClasses(position) {
        const tile = this.props.tile;
        return `tile tile-${(tile.value > MAX_SCORE ? "super" : tile.value)} ${this.getPositionCssClass(position)}`;
    }

    getMainControl(key, cssClass) {
        const tile = this.props.tile;
        return (
            <div key={key} className={cssClass}>
                <div className="tile-inner">{tile.value}</div>
            </div>
        );
    }

    render() {
        const tile = this.props.tile;
        const position = { x: tile.x, y: tile.y };
        var index = 1;
        return this.getMainControl(index++, this.getCssClasses(position));
    }

}
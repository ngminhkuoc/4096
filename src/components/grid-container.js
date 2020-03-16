import React, { Component } from "react";

export default class GridContainer extends Component {
    renderColumns() {
        let columns = [];
        for (var i = 0; i < this.props.size; i++) {
            columns.push(<div className="grid-cell" key={i} />);
        }
        return columns;
    }

    renderCells() {
        let rows = [];
        for (var i = 0; i < this.props.size; i++) {
            rows.push(<div className="grid-row" key={i}>
                {this.renderColumns()}
            </div>);
        }
        return rows;
    }

    render() {
        return (
            <div className="grid-container">
                {this.renderCells()}
            </div>
        )
    }
}
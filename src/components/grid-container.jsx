import React, { Component } from "react";
import { SIZE } from "../constants/app-constants";

export default class GridContainer extends Component {
    renderColumns() {
        let columns = [];
        for (var i = 0; i < SIZE; i++) {
            columns.push(<div className="grid-cell" key={i} ></div>);
        }
        return columns;
    }

    renderCells() {
        let rows = [];
        for (var i = 0; i < SIZE; i++) {
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
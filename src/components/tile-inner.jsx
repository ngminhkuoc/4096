import React from 'react';

export default class TileInner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cssClass: this.props.cssClass
        };
    }

    updateCssClass(newCssClass) {
        this.setState({
            cssClass: newCssClass
        });
    }

    render() {
        const { value } = this.props;

        return (
            <div className={this.state.cssClass}>
                <div className="tile-inner">{value}</div>
            </div>
        );
    }
}
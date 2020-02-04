import React, { Component } from 'react';
import './Dropdown.css';


class Dropdown extends Component {
    render() {
        return <div className="BarChart-header--base-selection" id='base-selection'>
            <form>
            Base: 
            <select onChange={this.props.onChange}>
                {this.props.baseCurrencies.map(item => (
                item === this.props.baseCurrency? 
                <option value={item} selected>{item}</option>
                : <option value={item}>{item}</option>
                ))}
            </select>
            </form>
            </div>
    }
}

export default Dropdown;
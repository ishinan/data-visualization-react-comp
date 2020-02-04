import React, { Component } from 'react';
import './BarChart.css';


class BarChart extends Component {

    render() {
        return <div className='BarChart-frame' id='chart-location'>
        {this.props.currencies.map( (item, indx) => (
          <div className='BarChart-bar' style={this.props.heights[indx]}>{item} <br/>
          {this.props.exchangeRates[item]}</div>
        ))}
      </div>
    }
}

export default BarChart;
import React, { Component } from 'react';

import './Button.css';

class Button extends Component {
   render() {
       return  <div className='BarChart-choices' id="list-box">
           List Of Currencies: 
       {this.props.listCurrencies.map( item => (
          this.props.currencies.includes(item)?
         <button className='btn--selected' value={item} onClick={this.props.onClick}>{item}</button> :
         <button value={item} onClick={this.props.onClick}>{item}</button>

       ))}
       </div>
   } 
}

export default Button;
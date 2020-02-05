import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {

    render() {
       return <div className='footer'>
               {this.props.children}
              </div>
    }
}

export default Footer;
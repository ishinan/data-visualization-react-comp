import React, { Component } from 'react';
import './App.css';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import BarChart from './components/BarChart/BarChart';
import Dropdown from './components/Dropdown/Dropdown';

class App extends Component {
  // define starting state
  state = {
    baseCurrency: "EUR",
    baseCurrencies: ['CAD','HKD','ISK','PHP','DKK','HUF','CZK','AUD','RON','SEK','IDR','INR','BRL','RUB','HRK','JPY','THB','CHF','SGD','PLN','BGN','TRY','CNY','NOK','NZD','ZAR','USD','MXN','ILS','GBP','KRW','MYR','EUR'],
    currencies: ['USD', 'HKD', 'AUD', 'GBP', 'CNY', 'EUR'],
    heights: [],
    exchangeRates: {}, 
    listCurrencies: [],
    exchangeBase: "EUR",
    exchangeDate: "1970-01-01",
  }

  stateArrayPush = (srcArray, newItem) => {
    let arrayAdd = srcArray.slice(); // duplicating array
    arrayAdd.push(newItem);
    arrayAdd = [ ...new Set(arrayAdd)];
    return arrayAdd;
  }
  
  stateArrayRemove = (srcArray, removingItem) => {
    const arraySourceCopy = srcArray.slice(); // duplicating array
    const arrayUpdate = arraySourceCopy.filter((item) => item !== removingItem);
    return arrayUpdate;
  }
 
  formatRates = ObjCurrencyRates => {
    let updateObj = { ...ObjCurrencyRates };
    for (const key in updateObj) {
      updateObj[key] = updateObj[key].toFixed(2)
    }
    return  updateObj;
  }

  calcHeights(selectedCurrencies, allRates){
    let largest = 1;
    for (const currency of selectedCurrencies) {
        //console.log('Calc:', currency, allRates[currency])
        if ( +allRates[currency] > largest) {
            largest = allRates[currency];
        }
    }
    console.log('highest height:', largest)
    const maxHeight = 260;
    const Heights = [];
    for (const currency of selectedCurrencies) {
      let calculatedHeight = maxHeight / largest * allRates[currency]
      Heights.push({ height: +calculatedHeight.toFixed(0)});
    }
    return Heights;
  }

  componentDidMount(){
    this.updateChart(this.state.baseCurrency) 
  }

  updateChart = Base => {
    let url=`https://api.exchangeratesapi.io/latest?base=${Base}`;
    fetch(url)
    .then(res => res.json())
    .then(fetchedData => {
      console.log('Update fetch...');
      console.log(fetchedData);

      fetchedData.rates[Base] = 1.00;

      // Change rates to two digits floating
      let formatedRates = this.formatRates(fetchedData.rates)
      console.log('formated', formatedRates)

      let updatedCurrencies = [];
      if ( this.state.baseCurrency !== Base ){
      const currenciesWithNewBase = this.stateArrayPush(this.state.currencies, Base)
      updatedCurrencies = this.stateArrayRemove(currenciesWithNewBase, this.state.baseCurrency)
      } else {
        updatedCurrencies = this.state.currencies;
      }

      const Heights = this.calcHeights(updatedCurrencies, fetchedData.rates);
      // console.log('Updated heights:', Heights)

      this.setState({
        exchangeRates: formatedRates,
        listCurrencies: Object.keys(formatedRates).sort(),
        exchangeBase: fetchedData.base,
        exchangeDate: fetchedData.date,
        heights: Heights,
        baseCurrency: Base,
        currencies: updatedCurrencies, 
      })
      console.log(this.state.exchangeRates);
    })
  }


  onChangeBaseCurrencyHandler = ev => {
    console.log('Event:', ev.target.value);
    const baseCurrency = ev.target.value;
    this.updateChart(baseCurrency) 
  } 

  onClickCurrencyHandler = ev => {
    console.log('Event:', ev.target.value);
    const selectedItem = ev.target.value;
    let ListWithClickedCurrency = this.state.currencies.includes(selectedItem) ? this.stateArrayRemove(this.state.currencies, selectedItem) :
      this.stateArrayPush(this.state.currencies, selectedItem);
    console.log('ListWithClickedCurrency', ListWithClickedCurrency);

    const Heights = this.calcHeights(ListWithClickedCurrency, this.state.exchangeRates)

    this.setState({
      currencies: ListWithClickedCurrency,
      heights: Heights,
    })
    
  }


  render(){
    return (
      <div className='Container' >
        <Header>
          <h1> Data Visualization</h1>
        </Header>
        <div className='main'>
          <div className='BarChart-header'>
            <div className="BarChart-header--title">
                Currency
            </div>
            <Dropdown onChange={this.onChangeBaseCurrencyHandler} 
             baseCurrencies={this.state.baseCurrencies}
             baseCurrency={this.state.baseCurrency} />
          </div>
          <div className='BarChart-choices' id="list-box">List Of Currencies: 
          {this.state.listCurrencies.map( item => (
             this.state.currencies.includes(item)?
            <button className='btn--selected' value={item} onClick={this.onClickCurrencyHandler}>{item}</button> :
            <button value={item} onClick={this.onClickCurrencyHandler}>{item}</button>

          ))}
          </div>
          <BarChart 
            currencies={this.state.currencies} 
            heights={this.state.heights} 
            exchangeRates={this.state.exchangeRates} />
        </div>
        <Footer>
            <div>Note: the vertical height is based on value of 1 unit of each currency to a base currency</div>
        </Footer>
    </div>
    );
    }
  }

export default App;
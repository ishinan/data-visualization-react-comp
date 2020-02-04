This project is to present a bar chart of currency exchange rates using React technology.

## Overview

- A Simple React to fetch exchange currency data and present them as a bar chart.
- A public site (https://data-visualization-react.herokuapp.com)
- Sample Image
  
  ![Sample Chart](sample_chart.png)

## Chart Feature

- When reloaded,  default five currencies are selected.
- Default Base Currency is EURO.
- The vertical height indicates comparison of 1 unit of value among currency to a base currency.
  - E.g. If a base currency is EURO, and  Indian rupee (INR) is 80.0. The height of INR to EURO is 80 times higher.
- Clicking a button of currency add/remove the currency bar in the chart

## Design Info

The site is created by one html page with css for style and javascript/react for event actions such as clicking a button. The height of the bars in the chart is adjusted by the largest number of currency to fit in the chart.

### Data

- The currency data is retrieved from http://exchangeratesapi.io. 

### Javascript

- The code is written by React, css and html.
- The height of the bars in the chart is adjusted by the largest number of currency to fit in the chart. 

### Style

- Font-Family: 'Source Sans Pro'(sourcce: Google Font), sans-serif

- Four main colors are used
  - Header/Footer sections: #fe9801
  - Background of Chart: #f4eec7
  - Bar Chart colors: #ccda46, #697c37

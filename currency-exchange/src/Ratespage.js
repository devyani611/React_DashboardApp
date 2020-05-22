import React from 'react';
import {Table} from "reactstrap";
import axios from "axios";

const tableStyle={
    color:'white',
    backgroundcolor:'pink'
  };
class Ratespage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      fromCurrency: "USD",
      currencies: [],
      currencyrates:[],
      invcurrencies:[],
    };
  }

  componentDidMount() {
    axios
      .get(`https://api.exchangeratesapi.io/latest?base=${this.state.fromCurrency}`)
      .then((response) => {
        const currencyrates = [];
        const currencycountry=[];
        const invcurrency=[];
        for (const key in response.data.rates) {
            currencycountry.push(key);
            currencyrates.push(response.data.rates[key].toFixed(5));
            axios
              .get(`https://api.exchangeratesapi.io/latest?base=${key}`)
              .then((response) =>{
                invcurrency.push(response.data.rates[this.state.fromCurrency].toFixed(5))
                this.setState({invcurrencies:invcurrency});
              })
              .catch((err) => {
                console.log("oops", err);
              });   
          
        }
        this.setState({ currencies: currencycountry, currencyrates:currencyrates});
      })
      .catch((err) => {
        console.log("oops", err);
      });
  }

  selectHandler = (event) => {
    if (event.target.name === "from") {
      this.setState({ fromCurrency: event.target.value });
    } 
  };

  render() {
    return (
    	<div className="app-container container">
    		<div className="row">
    			<div className="col-lg-12 col-xl-12">
    				<h4> Rates Exchange Table </h4>
    			</div>
    		</div>
     		<div className="row">
     			<div className="col-lg-6 col-xl-6">
		    	  	<Table borderless >
		  			  	<thead>
		    			  	<tr>
		      					<th style={tableStyle}>{this.state.fromCurrency}</th>
		      					<th style={tableStyle}>1.00 {this.state.fromCurrency}</th>
		      					<th style={tableStyle}>inv. 1.00 {this.state.fromCurrency}</th>
		    			  	</tr>
		  			  	</thead>
		  			  	<tbody>
		    			  	<tr>
		      					<td style={tableStyle}>{this.state.currencies.map((cur) => (
		                        	<tr>{cur}</tr>
		                      	))}</td>
		      					<td style={tableStyle}>{this.state.currencyrates.map((cur) => (
		                        	<tr>{cur}</tr>
		                      	))}</td>
		      					<td style={tableStyle}>{this.state.invcurrencies.map((cur) => (
		                        	<tr>{cur}</tr>
		                      	))}</td>
		    			  	</tr>
		    		  	</tbody>
				    </Table>
		      	</div>
		      	<div className="col-lg-6 col-xl-6">
		      		<div className="row">
		      			<div className="col-lg-12 col-xl-12">
		      				<h4>choose the currency</h4>
		      				<h1>To be added - dropdown box</h1>
		      			</div>
		      		</div>
		      		<div className="row">
		      			<div className="col-lg-12 col-xl-12">
		      				<h4>currency details</h4>
		      				<h1>To be added - api of the currency details along with country</h1>
		      			</div>
		      		</div>
		      	</div>
		    </div>
		</div>
    );
  }
}

export default Ratespage;
import React, { Component } from 'react';
import Papa from 'papaparse';
import VegaLite from 'react-vega-lite';


export default class Papaparser extends Component {
  constructor(props) {
    //Los props que me paso la mama
    super(props);
    // definimos el state de ESTE componente (cada componente tiene un state independiente)
    this.state ={
      data: {values:[{date:'2018/05/21', temp:100},{date:'2018/05/22', temp:99}]},
      spec:{
        'description': 'A simple bar chart with embedded data.',
        'mark': 'bar',
        'encoding': {
          'x': {'field': 'date', 'type': 'ordinal'},
          'y': {'field': 'temp', 'type': 'quantitative'}
        }
      }
    };
        
    //Hacemos el binding de los eventHandlers para que react sepa como utilizarlos
    this.parser = this.parser.bind(this);
  }


  parser(){
    Papa.parse('https://raw.githubusercontent.com/domoritz/maps/master/data/seattle-temps.csv', {
      download: true,
      header: true,
      complete: function(results) {
        const daticos = results.data;
        console.log(daticos);
        this.setState({data:{values:daticos}});
      }.bind(this)
    });
  }

  componentDidMount() {
    this.parser();
    console.log(this.state.data);
  }



  render() {
    return <VegaLite spec={this.state.spec} data={this.state.data}/>;
    
  }
}

import React, { Component } from 'react';
import Papa from 'papaparse';
import VegaLite from 'react-vega-lite';


export default class Papaparser extends Component {
  constructor(props) {
    //Los props que me paso la mama
    super(props);
    // definimos el state de ESTE componente (cada componente tiene un state independiente)
    this.state ={
      data: {values:[{Fecha:'2018/05/21', Temperatura:100},{Fecha:'2018/05/22', Temperatura:99}]},
      spec:{
        'description': 'A simple bar chart with embedded data.',
        'mark': 'bar',
        'encoding': {
          'y': {'field': 'Fecha', 'type': 'ordinal'},
          'x': {'field': 'Temperatura', 'type': 'quantitative'}
        }
      }
    };
        
    //Hacemos el binding de los eventHandlers para que react sepa como utilizarlos
    this.parser = this.parser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handleSubmit(){
    this.setState({
      spec:{
        'description': 'Still a simple barchar but different',
        'mark': 'point',
        'encoding': {
          'x': {'field': 'Fecha', 'type': 'ordinal'},
          'y': {'field': 'Temperatura', 'type': 'quantitative'}
        }
      }
    });
    console.log(this.state.spec);
    
  }

  handleChange(event){
    const value = event.target.value;
    this.setState({
      [event.target.name]: value
    });
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
    //this.parser();
    console.log(this.state.data);
    console.log(this.state.spec);
    
  }



  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <VegaLite spec={this.state.spec} data={this.state.data}/>
          <textarea
            cols='40'
            rows='20'
            name='spec'
            ref={(div)=>this.divTarget=div}
            value={JSON.stringify(this.state.spec)}
            
          >
          </textarea>
          <button onSubmit={this.handleSubmit}>Cambiar Spec</button>
        </div>
      </form>
    );
  }
}

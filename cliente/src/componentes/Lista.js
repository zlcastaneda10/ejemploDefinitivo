import React, { Component } from 'react';

export default class lista extends Component {
  constructor(props){
    super(props);
    this.state= {
      visualizaciones:[
        {
          titulo : 'Visualizacion 1',
          autor : 'Zulma Castañeda'
        },
        {
          titulo: 'Visualizacion 2',
          autor: 'Orlando Sabogal'
        }
      ]   
    };
  }

  componentDidMount(){
    fetch('/getData')
      .then((res)=>res.json() )
      .then((json)=> this.setState({visualizaciones:json}))
      .catch((err) => console.log(err)); 
  }



  render() {
    return (
      <div>
        <ul>            
          {this.state.visualizaciones.map((vis)=>
            <li key={vis.titulo}>
              <h3>{vis.titulo} </h3>
                Autor: {vis.autor}
              <button>Cargar visualizacion</button>
            </li>
          )}

        </ul>
      </div>
    );
  }
}

import React, { Component } from 'react';
import Elemento from './Elemento';
import Vis from './Vis';

export default class lista extends Component {
  constructor(props){
    super(props);
    this.state= {
      visualizaciones:[
        {
          titulo : 'Visualizacion 1',
          autor : 'Zulma Castañeda',
          spec: '',
          myData: ''
        },
        {
          titulo: 'Visualizacion 2',
          autor: 'Orlando Sabogal',
          spec: '',
          myData: ''
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
            <Elemento 
              key={vis.titulo}
              titulo={vis.titulo}
              autor = {vis.autor}
              spec = {vis.spec}
              myData = {vis.myData}
            />
            
          )}

        </ul>
        <Vis/>
      </div>
    );
  }
}

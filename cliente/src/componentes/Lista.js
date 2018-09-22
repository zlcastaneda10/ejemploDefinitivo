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
              <form onSubmit={this.handleSubmit}>
                <label>
                  {/* usamos name para identificar los campos del form y ahorrarnos algunos event handlers */}
                  Nombre
                  <input name='nombre' type='text' value={this.state.nombre} onChange={this.handleChange}/>
                </label>
      
                <br/>
      
                <label>
                  Apellido
                  <input name='apellido' type='text' value={this.state.apellido} onChange={this.handleChange}/>
                </label>
      
                <br/>
      
                <input type="submit" value="Enviar" />
      
              </form>
            </li>
          )}

        </ul>
      </div>
    );
  }
}

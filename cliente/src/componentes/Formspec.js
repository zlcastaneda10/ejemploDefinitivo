import React, { Component } from 'react';

export default class Formspec extends Component {
  constructor(props) {
    super(props);
    this.state ={
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

  }
  
  render() {
      
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          {/* usamos name para identificar los campos del form y ahorrarnos algunos event handlers */}
        Paste the new spec here:
          <input name='spec' type='text' value={this.state.nombre} onChange={this.handleChange}/>
        </label>
      
        <input type="submit" value="Enviar" />
      
      </form>
    );
  }
}

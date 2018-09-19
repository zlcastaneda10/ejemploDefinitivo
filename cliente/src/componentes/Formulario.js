import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Export default es el que no tiene {} y puedo llamar como quiera :v
export default class Formulario extends Component {
  constructor(props) {
    //Los props que me paso la mama
    super(props);
    // definimos el state de ESTE componente (cada componente tiene un state independiente)
    this.state ={
      nombre : '',
      apellido: ''
    };

     //Hacemos el binding de los eventHandlers para que react sepa como utilizarlos
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Creamos mis event handlers

  //Se llama cada vez que escriba algo en los inputs
  handleChange(event) {
    // Hacemos algo cuando hay cambios en los inputs (actualizar el state)
    //Aprovechamos que cada uno tiene un name distinto
    const value = event.target.value;
    this.setState({
      [event.target.name]: value
    });
  }

  handleSubmit(event) {  
    // Hacemos algo cada vez que se envia el Formulario (forma chevere de escribir strings)
    alert(`Te llamas: ${this.state.nombre} ${this.state.apellido}`);
    event.preventDefault();
  }

  render() {
    return (
      
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
    );
  }
}

//tipos de prop que pasamos al componente
Formulario.propTypes ={
  nombre : PropTypes.string.isRequired,
  apellido : PropTypes.string.isRequired,
};

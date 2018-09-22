import React, { Component } from 'react';
import PropTypes from 'prop-types';
export default class Elemento extends Component {
  render() {
    return (
      <div>
        <li key={this.props.key}>
          <h3>{this.props.titulo} </h3>
                Autor: {this.props.autor}
          <button>Cargar visualizacion</button>
        </li>
      </div>
    );
  }
}

Elemento.propTypes={
  key : PropTypes.string.isRequired,
  titulo : PropTypes.string.isRequired,
  autor: PropTypes.string.isRequired
};

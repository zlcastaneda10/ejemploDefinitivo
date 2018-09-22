import React, { Component } from 'react';

export default class Formvega extends Component {
    constructor(props) {
        
        super(props);
        this.state ={
          autor : '',
          titulo: '',
          spec:'',
          data: '',
        };
        
        //Hacemos el binding de los eventHandlers para que react sepa como utilizarlos
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);



  render() {
    return (
      <div>
        
      </div>
    );
  }
}

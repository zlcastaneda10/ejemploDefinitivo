import React, { Component } from 'react';
import './App.css';
//mis imports
import Formulario from './componentes/Formulario';
import Papaparser from './componentes/Papaparser';


class App extends Component {

  //Aqui vamos a utilizar el state
  constructor(props){
    super(props);
    this.state= {
      //Aqui indicamos lo que vamos a usar en el state
      //Antes de probar la conexion a la  base de datos usamos un objeto de prueba
      objetos: [
        {  titulo:'holi', descripccion: 'wipiwi'}
      ]


    };
  }

  //Despues de que renderizo llamo a este metodo ... NPI de que es esto? leer sobre el ciclo de vida
  componentDidMount(){
    //esto es una promesa 
    fetch('/getData')
    //ver 1:00:47 para ver como se pasan opciones (no-cors)
    //Las promesas funcionan con then then then y voy filtrando las cosas que necesito
    //La promesa retorna un objeto con todo  el json
      .then((res)=>res.json() )
    //Promesaception aqui sí tengo el json que deseo (todos los objetos que recibi los pongo en ese campo del state objetos en este caso)
      .then((json)=> this.setState({objetos:json}))
      .catch((err) => console.log(err));
    
     
  }
  
  renderObjects(){
    //Retornamos un componente objeto creado por mi 
    return this.state.objetos.map((obj) => 
      //version componente
      //<Objeto key={obj.descripcion} objeto={obj}/>
      //version div
      <div key={obj.titulo}>{obj.titulo}-{obj.descripccion} </div>
    );
  }
  
  render() {
    return (
      <div className="App">
        <h1>Ejemplo React</h1>
        {/* Aqui puedo empezar a cargar mis componentes para construir mi APP :D */}
        {this.renderObjects()}
        {/* Vamos a cargar por ejemplo un formulario */}
        <Formulario/>
        <Papaparser/>
        
      </div>
    );
  }
}

export default App;

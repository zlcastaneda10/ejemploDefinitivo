import React, { Component } from 'react';
import vegaEmbed from 'vega-embed';
import Papa from 'papaparse';
//import Lista from './Lista';

export default class vis extends Component {
  constructor(props){
    super(props);
    this.state={
      titulo: '',
      autor: '',
      file:null,
      spec:{
        'schema': 'https://vega.github.io/schema/vega-lite/v3.0.0-rc6.json',
        'description': 'A simple bar chart with embedded data.',
        'data': {
          'name': 'myData' 
        },
        'mark': 'bar',
        'encoding': {
          'y': {'field': 'a', 'type': 'ordinal'},
          'x': {'field': 'b', 'type': 'quantitative'}
        }
      },
      myData:[
        {'a': 'A','b': 150}, {'a': 'B','b': 55}, {'a': 'C','b': 43},
        {'a': 'D','b': 91}, {'a': 'E','b': 81}, {'a': 'F','b': 53},
        {'a': 'G','b': 19}, {'a': 'H','b': 87}, {'a': 'I','b': 52}]
    };
    this.handleChange= this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.onChangeFile=this.onChangeFile.bind(this);
    this.papaParser=this.papaParser.bind(this);
    this.saveVis=this.saveVis.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  //Me permite modificar el state de spec cuando se hacen cambios en el textarea
  handleChange(event){
    const value = event.target.value;
    let newspec;
    try {
      newspec = JSON.parse(value);
    } catch (err) {
      console.log('BAD JSON');     
    }
    this.setState({
      spec: newspec
    });
  }
  //Actualiza la vis
  updateVis(){
    vegaEmbed(this.div, this.state.spec)
      .catch(error => console.log(error))
      .then((res) =>  res.view.insert('myData', this.state.myData).run());

  }
  //Me permite cambiar la visualizacion cuando 
  handleSubmit(event){
    this.updateVis();
    event.preventDefault();
  }
  //Ciclo de vida se monta el componente  
  componentDidMount(){
    this.updateVis();
  }
  //cargo un archivo y lo pongo en el state
  onChangeFile(event){
    this.setState({file:event.target.files[0]}, ()=>this.papaParser()
    ); 
  }
  //Utilizo papaparser para convertir el archivo csv en un json
  papaParser(){
    Papa.parse(this.state.file,{
      header: true,
      dynamicTyping: true,
      complete:function(results){
        this.setState({  myData:results.data});
        this.updateVis();
      }.bind(this)

    });

  }
  //guardamos la visualizacion en mongo
  saveVis(event){
    const mistate = JSON.stringify(this.state);
    console.log(mistate);
    fetch('/postVis',{
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: mistate
    }).then(res => res.json())
      .then(json => {
        if(json.success){
          console.log('enviado');
        }
        else{
          console.log(json);
          console.log('fallo el json aiiuda');
        }
      });
      
  
  }
  //puedo escribir en el form
  handleInputChange(event) {
    const value = event.target.value;
    this.setState({
      [event.target.name]: value
    });
  }

  

  render() {
    return (
      <div>
        <div ref={(div) => this.div = div}>   </div>
       
        <div>
          {JSON.stringify(this.state.spec).includes('$') ? <div>El spec no puede incluir el simbolo $ (escribe spec en lugar de $spec)</div> : ''}
          <textarea
            cols='40'
            rows='20'
            name='spec'
            ref={(div)=>this.divTarget=div}
            value={JSON.stringify(this.state.spec)}
            onChange={this.handleChange}           
          >
          </textarea>
          <br></br>
          <button className='btn btn-primary' onClick={this.handleSubmit}>Cambiar Spec</button>
        </div>
        
        
        <h3>Subir CSV </h3>
        <input type='file' onChange={this.onChangeFile}/>

        <form onSubmit={this.saveVis}>
          <label>
            Titulo visualizacion
            <input name='titulo' type='text' value={this.state.titulo} onChange={this.handleInputChange}/>
          </label>
          <label>
            Autor 
            <input name='autor' type='text' value={this.state.autor} onChange={this.handleInputChange}/>
          </label>
          <input className='btn btn-primary' type="submit" value="Guardar visualizacion" />
        </form>
        
       
        
      </div>
    );
  }
}

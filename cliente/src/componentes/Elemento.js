import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Vis from './Vis';
export default class Elemento extends Component {

  constructor(props){
    super(props);
    this.state={
      titulo: this.props.titulo,
      autor: this.props.autor,
      file: this.props.file,
      spec:this.props.spec,
      myData:this.props.myData
      
    };
  }
  //Clase que me permite renderizar los elementos de la lista conservando en cada uno de ellos la informacion de la vis correspondiente
  render() {

   


    return (
      <div>
        <li className='list-group-item' key={this.props.titulo}>
          <h3>{this.props.titulo} </h3>
                Autor: {this.props.autor}
          <button className='btn btn-primary' data-toggle="modal" data-target="#exampleModal">Cargar visualizacion</button>
         
          <fieldset className="rating">
            <input type="radio" id="star5" name="rating" value="5" /><label className = "full" htmlFor="star5" title="Awesome - 5 stars"></label>
            <input type="radio" id="star4half" name="rating" value="4 and a half" /><label className="half" htmlFor="star4half" title="Pretty good - 4.5 stars"></label>
            <input type="radio" id="star4" name="rating" value="4" /><label className = "full" htmlFor="star4" title="Pretty good - 4 stars"></label>
            <input type="radio" id="star3half" name="rating" value="3 and a half" /><label className="half" htmlFor="star3half" title="Meh - 3.5 stars"></label>
            <input type="radio" id="star3" name="rating" value="3" /><label className = "full" htmlFor="star3" title="Meh - 3 stars"></label>
            <input type="radio" id="star2half" name="rating" value="2 and a half" /><label className="half" htmlFor="star2half" title="Kinda bad - 2.5 stars"></label>
            <input type="radio" id="star2" name="rating" value="2" /><label className = "full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
            <input type="radio" id="star1half" name="rating" value="1 and a half" /><label className="half" htmlFor="star1half" title="Meh - 1.5 stars"></label>
            <input type="radio" id="star1" name="rating" value="1" /><label className = "full" htmlFor="star1" title="Sucks big time - 1 star"></label>
            <input type="radio" id="starhalf" name="rating" value="half" /><label className="half" htmlFor="starhalf" title="Sucks big time - 0.5 stars"></label>
          </fieldset>
        </li>


        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{this.props.titulo}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <Vis/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>



      </div>
    );
  }
}

Elemento.propTypes={
  
  titulo : PropTypes.string.isRequired,
  autor: PropTypes.string.isRequired,
  //file:PropTypes.isRequired,
  spec: PropTypes.object,
  myData: PropTypes.array
};

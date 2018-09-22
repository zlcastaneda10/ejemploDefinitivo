var express = require('express');
var router = express.Router();
require('dotenv').config();

//Codigo copiado de la documentacion de mongo, sirve para conectarse a mongo #GraciasFaryd
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = process.env.MONGODB_URI;

// Database Name MODIFICAR
const dbName = process.env.DB_NAME;


//funcion para conseguir los datos
function getData(callback){
  
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    //cuidado!! la conexion podria cerrarse antes de terminar el llamado a la base de datos
    const db = client.db(dbName);
    //mini callback hell
    findDocuments(db, (data)=>{
      callback(data);
      client.close();
    });
    
  });
}

//insercion de documentos
const insertDocuments = function(db,data, callback) {
  // Get the documents collection
  let collectionName = 'vis';
  const collection = db.collection(collectionName);
  // Insert some documents
  collection.insertOne(data, function(err, result) {
    console.log("Inserted document");
    console.log(result);
    callback(result);
  });
}

// Fin del codigo copiado 

//Funcion para encontrar todos los documentos de la DB
const findDocuments = function(db, callback) {
  // Collection Name MODIFICAR
  let collectionName = 'vis';
  // Get the documents collection
  const collection = db.collection(collectionName);
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
};
//END 


/* GET home page. */
router.get('/', function(req, res, next) {
  //Ya no voy a renderizar el template del index
  // res.render('index', { title: 'Express' });
});

/**A partir de aqui voy a crear mis propios endpoints */

//getData ejemplo
router.get('/getData', function(req, res) {
  //Añadimos un header para indicar que lo que envio es de tipo json 
  res.setHeader('Content-Type', 'application/json');
  getData((data)=>
  res.send(data)
  );
});

//guardar visualizaciones
router.post('/postVis', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  const { body } = req;
  const {
    file,
    spec,
    myData
  } = body;
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    
    const db = client.db(dbName);
    insertDocuments(db,body,()=>
    res.send({"success":true})
    );
  });
});

module.exports = router;

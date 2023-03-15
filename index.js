
// Import Express.js
const express = require('express');
const app = express();
// Import body-parser (to hadle parameters more easily)
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// This variable defines the port of your computer where the API will be available
const PORT = process.env.PORT || 3000;

var data = {};
var id = 0;

app.use(express.static('html'));

app.get("/", (request, response) => {
  response.send("Welcome on the annotation API!");
});

app.post('/annotation', (request, response) => {
  var body = request.body;
  data[id]=body;
  console.log(data);
  id++;
  response.send("votre annotation a été sauvegardé !");
});

app.get('/IdAnnot/:Annot', (req,res) => {
  var IdAnnot = req.params.Annot;

  var Exist = Object.keys(data).includes(IdAnnot);
  console.log(Exist);

  res.format ({
    'text/html': function() {
       if (Exist){
       res.setHeader('Content-Type', 'text/html');
         res.send("<!DOCTYPE html><html lang='fr'><head><meta charset='UTF-8'/><title>Titre</title></head><body><div>"+JSON.stringify(data[IdAnnot])+
           "</div></body></html>"); 
       }
       else {
        res.send("aucune annotation n'est associée à cette clé");
       }
    },

    'application/json': function() {
       if (Exist){
         res.send(data[IdAnnot]); 
       }
       else {
        res.send("aucune annotation n'est associée à cette clé");
       }
   }
  });
});

app.get('/URI/:AnnotURI', (req, res) => {
  var IdURI = req.params.AnnotURI;
  console.log(IdURI);

  var tabRep = [];

  for ( key in data){
    if (data[key]['URI']==IdURI){
      tabRep.push({'IdAnnotation' : data[key], 'Annotation' : data[key]['Annotation']});

    }
  }
  res.format ({
    'text/html': function() {
      res.setHeader('Content-Type', 'text/html');
      res.send("<!DOCTYPE html><html lang='fr'><head><meta charset='UTF-8'/><title>Titre</title></head><body><div>"+JSON.stringify(tabRep)+
          "</div></body></html>"); 
     },

     'application/json': function() {
      res.send(tabRep); 
    }
  });
});

app.get('/AllAnnot', (req,res) => {
  res.format({
    'text/html': function() {
      res.setHeader('Content-Type', 'text/html');
      res.send("<!DOCTYPE html><html lang='fr'><head><meta charset='UTF-8'/><title>Titre</title></head><body><div>"+JSON.stringify(data)+
          "</div></body></html>"); 
     },

     'application/json': function() {
      res.send(data); 
    }
  });
});

app.listen(PORT, () =>{
  console.log(`The Annotations API is running on: http://localhost:${PORT}.`);
});


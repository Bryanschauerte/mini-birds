var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

var mongojs= require ('mongojs');

var port = 8888;

var db = mongojs('library');
var Product = db.collection('products');

app.listen(port, function(){
  console.log('listening on port '+ port);
});

app.use(cors());
//specifying type of object sent/gotted
app.use(bodyParser.json());

app.post('/api/sighting', function(req, res){
  Product.insert(req.body, function(error, result){
    if(error){
      console.log(error);
    } else {
      console.log(result);
    }
  });
});

app.get('/api/sighting', function(req, res){
  Product.find({}, function(error, result){
    if(error){res.send(error)
    }else{
      res.json(result);
      console.log(result);
    }
  });
});

app.put('/api/sighting/:id', function(req, res){
  Product.update({_id: mongojs.ObjectId(req.params.id)}, req.body, function(error, result){
    if(error){
      res.send(error);
    } else{
      res.json(result);
      console.log(result);
    }


  });
});

app.delete('/api/sighting/:id', function(req, res){
  Product.remove({_id: mongojs.ObjectId(req.params.id)}, function(error, result){

    if(error){
      res.send(error);
    } else{
      res.json(result);
      console.log(result);
    }

  })

})

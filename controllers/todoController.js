var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var urlencodedParser = bodyParser.urlencoded({extended:false});

mongoose.connect('mongodb://test:test@ds217560.mlab.com:17560/todo');
var schema = new mongoose.Schema({
  item: String
});
Todo = mongoose.model('Todo', schema);

module.exports = function(app){

app.get('/todo', function(req, res){
   Todo.find({}, function(err, data){
      if(err) throw err;
      res.render('todo', {data:data});
   });
});

app.get('/*', function(req, res){
   res.render('notfound');
});

app.post('/todo', urlencodedParser ,function(req, res){
    var newItem = Todo(req.body).save(function(err, data){
        if(err) throw err;
        res.json(data);
    });
});

app.delete('/todo/:item' ,function(req, res){

    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
         if(err) throw err;
         res.json(data);
    });
});

};

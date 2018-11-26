const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

let id = '5bfbbed6b289de346c093f55,';

Todo.find().then((todos) => {
    console.log('Todos', todos)
});

Todo.findById(id).then((todo) => {
    console.log('Todo by id', todo)
});
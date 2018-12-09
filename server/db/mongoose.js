var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://petar:ratep128@ds263137.mlab.com:63137/todoapp');

module.exports = {mongoose};

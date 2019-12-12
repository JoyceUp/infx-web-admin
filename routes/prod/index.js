module.exports = function (app){

    app.use('/common', require('./common'));
    app.use('/login', require('./login'));
    app.use('/auth', require('./auth'));
    app.use('/customers',require('./customers'));
    app.use('/manage',require('./agents'));
    app.use('/sale',require('./sale'));
    app.use('/relation',require('./relation'));
    app.use('/money',require('./money'));
    app.use('/report',require('./report'));
    app.use('/accounts',require('./accounts'));

    app.use('/bonus',require('./bonus'));

};
module.exports = function (app){

    app.use('/login', require('./login'));
    app.use('/auth', require('./auth'));
    app.use('/manage',require('./customers'));
    app.use('/manage',require('./agents'));

    app.use('/money', require('./money'));
    app.use('/sale', require('./sale'));
    app.use('/relation', require('./relation'));

}
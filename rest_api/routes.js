'use strict';

module.exports = function(app) {
    var todoList = require('./controller');
    var jwtverify = require('express-jwt');
    var jwtverifying= jwtverify({
        secret: 'keyboard'
    });
    app.route('/')
        .get(jwtverifying, todoList.index);

    app.route('/users')
        .get(jwtverifying, todoList.users);

    app.route('/login')
        .post(todoList.login);
};
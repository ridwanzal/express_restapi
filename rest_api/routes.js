'use strict';

module.exports = function(app) {
    var todoList = require('./controllers/index');
    var demo = require('./controllers/demo');
    var jwtverify = require('express-jwt');
    var jwtverifying= jwtverify({
        secret: 'keyboard'
    });
    app.route('/')
        .get(todoList.index);

    app.route('/users')
        .get(jwtverifying, todoList.users);

    app.route('/login')
        .post(todoList.login);

    app.route('/demo')
        .get(demo.index);

    app.route('/demo/request')
        .post(demo.add);
};
'use strict';

var response = require('../res');
var connection = require('../conn');
var jwt = require('jsonwebtoken');

exports.index = function(req, res) {
    response.ok("this is demo", res)
};  

exports.add = function(req, res){
    let nama = req.body.nama;
    let instansi = req.body.instansi;
    let telepon = req.body.telepon;
    let email = req.body.email;

    let query = "INSERT INTO \
                 scl_demo_request (nama, instansi, telepon, email) \
                 VALUES('"+nama+"','"+instansi+"','"+telepon+"','"+email+"')";
    connection.query(query, function(error, rows, fields){
        if(error){
            console.log(error)
        }else{
            if (rows.length === 0) {
                response.notfound(rows, res)
            } else {
                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    requireTLS: false,
                    auth: {
                        // should be replaced with real sender's account
                        user: 'scafoltk@gmail.com',
                        pass: 'stkakg123'
                    }
                });
                let mailOptions = {
                    // should be replaced with real recipient's account
                    from: '"Scafol Indonesia" <scafoltk@gmail.com> ',
                    to: '' + email,
                    subject: 'Permintaan demo Scafol Gov',
                    body: 'Kamu akan diarahkan ke email berikut',
                    text: "Terimakasih, permintaan anda akan segera kami proses. Tunggu kabar dari kami secapatnya. Salam PT. Aplikasi Konstruksi Global.",
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);
                });
                response.ok(rows, res);
            }
        }
    });
}

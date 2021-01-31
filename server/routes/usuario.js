const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore')
const Usuario = require('../models/usuario');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion')
    //const usuario = require('../models/usuario');
const app = express();

app.get('/usuario',  verificaToken,function(req, res) { //

    // return res.json({
    //     usuario: req.usuario,
    //     nombre: req.usuario.nombre,
    //     email: req.usuario.email
    // })

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 0;
    limite = Number(limite);

    let soli = "";
    let fechaSoli = req.query.fecha || null;
    let horaSoli = req.query.hora || null;
    
    if (fechaSoli === null && horaSoli === null) {
        soli = {

        }
    }
    if (fechaSoli != null && horaSoli != null) {
        soli = {
            fecha: fechaSoli,
            hora: horaSoli
        }
    }
    if (fechaSoli != null && horaSoli === null) {
        soli = {
            fecha: fechaSoli
        }
    }

    if (horaSoli != null && fechaSoli === null) {
        soli = {
            hora: horaSoli
        }
    }


    Usuario.find(soli, 'caja fecha hora')
        .skip(desde)
        .limit(limite)
        .exec((err, cajas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Usuario.count(soli, (err, conteo) => {
                res.json({
                    ok: true,
                    registros: conteo,
                    cajas
                })
            })
        })
    /*Usuario.find({ estado: true }, `nombre email role fecha caja google`)
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    numero: conteo
                });
            });


        });*/

});

app.post('/usuario',  function(req, res) {//

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        caja: body.caja,
        fecha: body.fecha,
        hora: body.hora,

    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // usuarioDB.password=null;
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});
//cambiar datos de recurso existentes en el servidor 
app.put('/usuario/:id',[verificaToken, verificaAdmin_Role], function(req, res) {//

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email,','role', 'fecha'])

    //busqueda del ususario que necesito encontrar y actualizar
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});


app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], function(req, res) {//
    let id = req.params.id;
    let cambiarEstado = { estado: false }
    Usuario.findByIdAndUpdate(id, cambiarEstado, { new: true, context: 'query' }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            res.json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }

            });
        } else {

            res.json({
                ok: true,
                usuario: usuarioDB
            });
        }
    });

});

module.exports = app;
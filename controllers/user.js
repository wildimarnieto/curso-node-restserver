const { response, request } = require('express');

const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuarioGet = async(req = request, res = response) => {

    //const { nombre, edad = 28 } = req.query;
    const {limite=5, desde=0} = req.query;
    const query = {estado:true };
    
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))


    ])
    
    res.json({
       total,
       usuarios
    });
}


const ususarioPut = async(req, res = response) => {

    const id = req.params.id;

    const { _id, password, google, ...resto } = req.body;

    //TODO validar contra base de datos
    if (password) {

        //encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const usuarioPost = async(req, res = response) => {




    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    //verificar si el correo existe


    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en BD
    await usuario.save();

    res.json({

        ok: true,
        msg: 'post API- controlador',
        usuario

    })
}

const usuarioDelete = async(req, res = response) => {
    
    const{id} = req.params;

    
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
    
    res.json({
        usuario
    
    })
}

const usuarioPatch = (req, res = response) => {
    res.json({

        ok: true,
        msg: 'patch API-- controlador'

    })
}


module.exports = {
    usuarioGet,
    ususarioPut,
    usuarioPost,
    usuarioDelete,
    usuarioPatch

}
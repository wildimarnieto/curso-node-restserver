const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require ('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async(req, res= response ) =>{

    const {correo, password} = req.body;

    try {

        //verificar  si el email existe
        const usuario = await  Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - correo'
            })
        }
        //verificar si el usuario esta activo
        
        if(!usuario.estado){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - estado: false'
            })
        }

        //verificar la contraseña 
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - password '
            })

        }


        // Generar el jwt
        const token = await generarJWT(usuario.id);

        


        res.json({

           usuario,
           token
           
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'hable con el administrador'
        })
    }
    
    



}

module.exports ={
    login

}
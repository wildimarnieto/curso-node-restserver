const { validationResult } = require('express-validator');
const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'el nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'el correo  es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'la contraseña  es obligatorio']
    },
    img: {
        type: String,

    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true,

    },
    google: {
        type: Boolean,
        default: false
    },

});

UsuarioSchema.methods.toJSON = function() {
    const {_id, __v, password, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;


}


module.exports = model('Usuario', UsuarioSchema);
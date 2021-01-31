const mongoose = require("mongoose");
let uniqueValidator = require('mongoose-unique-validator');
const Usuario = require("../routes/usuario");


let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es requerido"],
    },
    email: {
        type: String,
        required: [true, "El correo es requerido"],
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    caja: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        default: "USER_ROLE",
        enum: rolesValidos
    },
    fecha: {
        type: String,
        required: [true, "La fecha es obligatoria"]
    },
    hora: {
        type: String,
        required: [true, "La hora es oblgatorio"]
    },
    google: {
        type: Boolean,
        default: false,
    },
});

/*// Establecemos un campo virtual
usuarioSchema.virtual('fecha_nacimiento')
  .set(function(fecha) {
    // El formato esperado es 'yyyy-mm-dd' que es el devuelto por el campo input
    // el valor recibido se almacenará en el campo fecha_nacimiento_iso de nuestro documento
    this.fecha_nacimiento_iso = new Date(fecha);
  })
  .get(function(){
    // el valor devuelto será un string en formato 'yyyy-mm-dd'
    return this.fecha_nacimiento_iso.toISOString().substring(0,10);
  });*/
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

module.exports = mongoose.model("usuario", usuarioSchema);

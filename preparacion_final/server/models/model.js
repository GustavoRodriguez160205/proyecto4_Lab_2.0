const {Schema , model} = require('mongoose')


const user_schema = Schema({
    nombre : {type : String , required : true , unique : true},
    empresa : {type : String , required: true },
    telefono : {type : Number , required : true},
    correo : {type : String , required : true , unique: true}, // Es para q el admin sea propietario del usuario.
    is_public : {type : Boolean  , default : true},
    is_visible : {type : Boolean  , default : true},
    password : {type : String , required : false , default : ""}, // Para crear por defecto sin contraseña.
    admin : {type : Boolean , default : true},
    domicilio : {type : String  , required: false},
    propietario: {type: String , required: false , default : "admin"}

})

module.exports = model('usuario' , user_schema)
    
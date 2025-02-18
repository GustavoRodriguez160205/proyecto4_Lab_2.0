const express = require('express')         
require('../server/Conex/conect')           
const user = require('./models/model')    
const app = express()
const coockie = require('cookie-parser')
const morgan = require('morgan')           
const jwt = require('jsonwebtoken')
const cors = require('cors')

// Creamos un enrutador específico para las rutas de usuarios
const userRoutes = express.Router()
const authRoutes = express.Router()

// Middleware para manejar los JSON
app.use(express.json())
app.use(coockie())

// Middleware de Morgan para ver información de las peticiones
app.use(morgan('dev'))

// Especifico el origen del puerto donde realizare las solicitudes
app.use(cors({
    origin : ['http://localhost:5173'] , credentials : true
}))

// Definimos el uso de las rutas de usuariosy autenticación
app.use('/users', userRoutes)
app.use('/auth' , authRoutes)

// Definimos la ruta para obtener usuarios con un método GET
userRoutes.get('/get-users', async (req, res) => {
    // Traemos todos los datos
    const resp = await user.find({})
    return res.status(200).json({resp, message: 'Usuarios obtenidos correctamente'})  // Enviamos una respuesta con estado 200 y un mensaje 'usuarios obtenidos'
})


// Definimos la ruta para enviar los datos y asi crear los recursos
userRoutes.post('/create-users', async (req , res) => {
    try {
        const usuariosData = req.body
        const {correo}  = req.body
        const usuario = await user.findOne({correo})
        if(usuario){
            return res.status(401).json('Correo existente')
        }
         // Para que el usurio se registren como privados        
        usuariosData.is_public = false

        // Creamos el recurso sobre la base de datos
        const nuevoUser = new user(usuariosData)
        // Guardamos el recurso en la bd
        const resp = await nuevoUser.save()
        // Si se cumple , retorna el usuario
        return res.status(201).json({resp, message: 'Registrado exitosamente'} )
    } catch (error) {
        console.log(error)
    }
})

// Definimos la ruta para editar los usuarios
userRoutes.patch('/edit-users/:id' , async (req , res) => {
    try {
        // Parametros del id de la ruta
        const {id} = req.params
        const usuariosData = req.body
        // Encontramos el usuario por id y lo modificamos 
        console.log(req.body)
        const resp = await user.findByIdAndUpdate(id , usuariosData , {new : true})

        if(!resp){
            return res.status(404).json({resp , message: 'Recursos no encontrados'})
        }

        return res.status(200).json({resp, message: 'Usuario modificado'} )


    } catch (error) {
        console.log(error)
    }
})


userRoutes.delete('/delete-users/:id' , async (req, res) => {
    try {
        const {id} = req.params
        // Encontramos id y lo eliminamos
        const resp = await user.findByIdAndDelete(id)
        if(!resp){
            return res.status(404).json({resp , message : 'Usuario no encontrado'})
           
        }
        return res.status(200).json({resp , message : 'Eliminamos datos'})

    } catch (error) {
        console.log(error);
        
    }
})

// Ruta para logueo
authRoutes.post('/login-users' , async (req , res) => {
   try {
    // Traemos correo y contraseña del formulario
    const {correo , password} = req.body
    const usuario = await user.findOne({correo})
    if(!usuario){
        return res.status(401).json({usuario , message : 'Email o contraseña incorrectos'})
    }
    // Comparamos la contraseña q envie con el formulario con el usuario que yo traje a traves del correo
    if(password !== usuario.password){
        return res.status(401).json({usuario , message : 'Contraseña Incorrecta'})
    }

    // Generamos el token
     const token = jwt.sign(
     {id: usuario._id  , 
      id: String(usuario._id),
      correo: String(usuario.correo),
      password: String(usuario.password), 
      nombre: String(usuario.nombre || ''),
      telefono: String(usuario.telefono || ''),
      empresa: String(usuario.empresa || ''),
      domicilio: String(usuario.domicilio || ''),
      admin: Boolean(usuario.admin)},
        'hola123' , {expiresIn : '1h'}) 
    
        // Creamos una coquie con sierto nombre donde se guarda el token
        // Verificamos que es tipo de solicitud http 
                                 // Duración maxima de validez que va a tener un token
     res.cookie('llave', token , {httpOnly : true , maxAge : 36000000, sameSite: "lax" , secure: false} )

    return res.status(200).json({message: 'Has iniciado sesión correctamente' , token})

   } catch (error) {
     console.log(error)
   }
})


// Middleware para obtener el token de la coockie
const  verificarUsuario = (req , res , next) => {
      const token = req.cookies.llave
      if(!token){
         return res.status(404).json({message: 'No se encontro el token', token})
      }
      
      try {
        // Decodificamos el token
        const decode = jwt.verify(token , 'hola123')
        // Guardamos la información del token decodificado
        req.usuario = decode 
        next()
      } catch (error) {
        return res.status(403).json({message: 'Token Invalido', token})
        
      }
}

// Ruta para verificar el token que creamos usando el middleware para verificarUsuario
// Una vez verificado el usuario procedemos a obtener información de la solicitud
authRoutes.get('/verify' , verificarUsuario , async (req , res) => {
    // Traemos los datos del usuario decodificado
      const {id , nombre , empresa , telefono , correo , password , domicilio , admin} = req.usuario
      return res.status(200).json({message: 'Se obtuvieron los datos',id , nombre , empresa , telefono , correo , password , domicilio , admin})
})

// Ruta para cerrar sesión
authRoutes.get('/logout' , verificarUsuario ,  async (req , res) => {
       res.clearCookie('llave') 
       return res.status(200).json({message: 'Se elimino el token correctamente'}) 
})


// Empezamos con el CRUD sobre los contactos
// Creamos la ruta de Create

userRoutes.post('/create-contact' , verificarUsuario, async (req , res) => {
       try {
          const contactosData = req.body 
          const {correo} = req.body
          // Busco el contacto por correo y verifico de que el correo sea existente
          const contacto = await user.findOne({correo})
          console.log(contactosData);
          
          if(contacto){

            return res.status(401).json({message: 'Email existente'})
          }

          // Verificamos los datos del usuario  logueado en el caso que exista
          if(req.usuario && req.usuario.nombre){
            // Usamos el nombre del usuario logueado y le asisgnamos a propietario de contacto
            contactosData.propietario = req.usuario.nombre

            // Si el usuario no está logueado el contacto sera propietario de Admin 
          }else{
            contactosData.propietario = 'admin'
          }

            // Creamos los contactos en la base de datos
            const newContact = new user(contactosData)
            // Guardamos el contacto
            const respuesta = await newContact.save()

            return res.status(201).json({message: 'Contacto creado con exito' , respuesta})

       } catch (error) {
          return res.status(500).json(error.message)
       }
})


// Ruta para traer los archivos

userRoutes.get('/get-contacts' , async(req , res) => {
     try {
        // Traemos todos los recursos de la bd pero que tengan el password vacio
        const respuesta = await user.find({password: '' , is_visible: true}).sort({ nombre: 1 }); // Traemos los contactos que sean visibiles
        console.log(respuesta);
        
        if (respuesta.length === 0) {
            return res.status(404).json({message: 'No hay contactos para mostrar'})
        }

        return res.status(200).json({message: 'Contactos obtenidos con exito', respuesta})
     } catch (error) {

        return res.status(500).json(error.message)
     }
})


userRoutes.get('/get-contacts-by-role', verificarUsuario, async (req, res) => {
    try {
      // Verificamos si el usuario es admin o propietario
      const isAdmin = req.usuario.admin;  // Suponiendo que tienes un campo `isAdmin` en el objeto de usuario
        console.log(isAdmin)
      let contactos;
      if (isAdmin) {
        // Si es admin, trae todos los contactos (o los que quieras)
        contactos = await user.find({ password: '' }); // O la condición que necesites para el admin
      } else {
        // Si no es admin, trae los contactos relacionados con el propietario (usuario específico)
        const nombresUserLog = req.usuario.nombre;
        contactos = await user.find({ propietario: nombresUserLog });
      }
  
      if (contactos.length === 0) {
        return res.status(404).json({ message: 'No hay contactos creados', contactos });
      }
  
      return res.status(200).json(contactos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  });


// Iniciamos el servidor en el puerto 5500
app.listen(5500, () => {
    console.log('App corriendo en server', app)
})

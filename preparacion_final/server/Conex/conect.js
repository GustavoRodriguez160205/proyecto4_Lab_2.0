const mongose = require('mongoose')

// Declaramos la función de conexion a la bd
const conext = async () => {
    try {
        await mongose.connect('mongodb://localhost:27017')
        console.log('Nos pudimos conectar a la bd');
    } catch (error) {
        console.log(error.message)
    }
}

// Ejecuto la función
conext()


const mongose = require('mongoose')


const conext = async () => {
    try {
        await mongose.connect('mongodb+srv://gustavoFinal:IJz3uMOzo4SKjWWe@bdclase02.ei3pbqg.mongodb.net/?retryWrites=true&w=majority&appName=bdClase02')
        console.log('Nos pudimos conectar a la base de datos');
    } catch (error) {
        console.log(error.message)
    }
}

conext() // Llamamos a la función

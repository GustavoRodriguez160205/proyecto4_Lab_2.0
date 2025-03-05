const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://gustavoFinal:IJz3uMOzo4SKjWWe@bdclase02.ei3pbqg.mongodb.net/?retryWrites=true&w=majority&appName=bdClase02', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Conexión exitosa a la base de datos');
    } catch (error) {
        console.error('❌ Error al conectar:', error.message);
    }
};

connectDB(); // Llamamos a la función

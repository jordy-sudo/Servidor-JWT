// =============================================
// Puerto
// =============================================

process.env.PORT = process.env.PORT || 3000;

// =============================================
// Entorno
// =============================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =============================================
// Vencimiento del Token
// =============================================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// =============================================
// SEED de Autenticación
// =============================================
process.env.SEED = process.env.SEED || 'seed-desarrollo';

// =============================================
// Base de datos
// =============================================

let urlDB;

if (process.env.NODE_ENV === 'dev0') {
    urlDB = 'mongodb://localhost:27017/prueba';
} else {
    urlDB = 'mongodb+srv://Prueba_user:6aguc9DeTvnBpwbV@cluster0.osl8q.mongodb.net/prueba'
}

process.env.URLDB = urlDB;
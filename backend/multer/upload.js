var multer = require('multer');
var path = require('path');

// Configuración de almacenamiento
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images'); // Guardar en 'public/images'
    },
    filename: (req, file, cb) => {
        var filetype = '';
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
        }
        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }
        cb(null, 'image-' + Date.now() + '.' + filetype); // Nombre único
    }
});

// Filtro de archivo (para tipos permitidos)
var fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Solo se permiten imágenes en formato PNG, JPG o GIF.'));
    }
    cb(null, true);
};

// Configuración de Multer con filtro y límite de tamaño
var upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Límite de 5 MB
});

module.exports = upload;


// Lo que hace upload.js es colocar el fichero de imagen subido en la ruta public/images, poniéndole la extensión de imagen adecuada
// y un nombre que incluya la fecha y hora para hacer su nombre único.
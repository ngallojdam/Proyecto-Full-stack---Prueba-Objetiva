var multer = require('multer');
var path = require('path');
const fs = require('fs');

// Verificar si la carpeta de destino existe, si no, crearla
const dir = './public/images';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

// Configuración de almacenamiento
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dir); // Guardar en 'public/images'
    },
    filename: (req, file, cb) => {
        var filetype = '';
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
        } else if (file.mimetype === 'image/png') {
            filetype = 'png';
        } else if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        } else {
            return cb(new Error('Tipo de archivo no válido. Solo se permiten imágenes GIF, PNG y JPG.'));
        }
        cb(null, 'image-' + Date.now() + '.' + filetype); // Nombre único
    }
});

// Filtro de archivo (para tipos permitidos)
var fileFilter = (req, file, cb) => {
    const allowedExtensions = ['.png', '.jpeg', '.jpg', '.gif'];
    const extname = path.extname(file.originalname).toLowerCase();
    
    if (!allowedExtensions.includes(extname)) {
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

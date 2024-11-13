var multer =  require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        var filetype = '';
        if(file.mimetype === 'image/gif') {
            filetype = 'gif';
        }
        if(file.mimetype === 'image/png') {
            filetype = 'png';
        }
        if(file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }
        cb(null, 'image-' + Date.now() + '.' + filetype);
    }
})

var upload = multer({storage: storage});

module.exports = upload;

// Lo que hace upload.js es colocar el fichero de imagen subido en la ruta public/images, poniéndole la extensión de imagen adecuada
// y un nombre que incluya la fecha y hora para hacer su nombre único.
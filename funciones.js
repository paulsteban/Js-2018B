const fs = require('fs');


module.exports.escribirArchivo = (texto, nombreArchivo) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(
            nombreArchivo, texto,
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        mesaje: "Ingresado correctamente",
                        comic: texto
                    });
                }
            })
    })
}

module.exports.leerArchivo = (nombreArchivo) => {
    return new Promise((resolve, reject) => {
        fs.readFile(nombreArchivo, 'utf-8',
            (err, textoleido) => {
                if (err) {
                    reject({
                        existe: false
                    });
                } else {
                    resolve({
                        existe: true,
                        contenido: textoleido
                    })
                }
            }
        )
    })
}

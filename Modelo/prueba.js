const rxjs = require("rxjs");
const funciones = require('../funciones');
let misComics = [];
const fs = require("fs");
const leerArchivo$ = rxjs.from(funciones.leerArchivo("../Usuarios"));



leerArchivo$.subscribe(respuesta => {
    misComics = respuesta.contenido.split('-');
    misComics.forEach(value => {
        if (value != '') {
            console.log(value);
        }
    });
});

let usuariosA = [];
let content;/*
// First I want to read the file
fs.readFile('../Usuarios', 'utf-8', function read(err, data) {
    if (err) {
        throw err;
    }
    content = data;

    // Invoke the next step here however you like
    console.log(content);
    usuariosA = content.split('\n');// Put all of the code here (not the best solution)
    processFile();          // Or put the next step in a function and invoke it
});

function processFile() {
    console.log(usuariosA);
    console.log(usuariosA);

}*/
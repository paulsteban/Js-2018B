var inquirer = require('inquirer');
var async = require("async");
var rxjs = require("rxjs");
var distinct = require("rxjs/operators").distinct;
var map = require("rxjs/operators").map;
var funciones = require('./funciones');
var leerArchivo$ = rxjs.from(funciones.leerArchivo("Usuarios"));
var ArregloUsuarios = [];
var preguntas = [
    {
        type: 'confirm',
        name: 'logeo',
        message: 'Bienvenido a Twich, \n' +
            'Quires iniciar sesion?',
    },
    {
        when: function (response) {
            return response.logeo;
        }, type: 'input',
        name: 'nombre',
        message: 'Nombre Completo?',
        default: 'Paul Cisneros',
        validate: function (name) {
            var done = this.async();
            setTimeout(function () {
                if (typeof name !== 'string') {
                    // Pass the return value in the done callback
                    done('Ingrese un nombre completo por favor');
                    return;
                }
                // Pass the return value in the done callback
                done(null, true);
            }, 500);
        }
    },
    {
        type: "checkbox",
        message: "Seleccione sus intereses...",
        name: "servicios",
        choices: [
            {
                name: "videos",
                checked: true
            },
            {
                name: "videojuegos"
            },
            {
                name: "memes"
            }, {
                name: "dinero"
            }
        ],
    }, {
        type: "list",
        name: "menu",
        message: "Menu Principal?",
        choices: [
            "Ver un video",
            "Iniciar Grabacion",
            new inquirer.Separator(),
            "Salir Sesion"
        ]
    }
];
inquirer.prompt(preguntas).then(function (respuesta) {
    var escribirArchivo$ = rxjs.from(funciones.escribirArchivo(respuesta.nombre + "\n", "Usuarios"));
    escribirArchivo$.subscribe(function (respuesta) {
        console.log(respuesta);
    });
    switch (respuesta.menu) {
        case "Ver un video":
            console.log(respuesta.nombre + "");
            /*     inquirer.prompt(videos)
                     .then(comic => {
                         const leerYEscribirArchivo$ = rxjs.from(funciones.leerYEscribir(JSON.stringify(comic), "DC"));
                         leerYEscribirArchivo$
                             .subscribe(respuesta => {
                                 console.log(respuesta);
                             });
                     });*/
            break;
        case "Iniciar Grabacion":
            console.log(respuesta.nombre + "");
            if (respuesta.nombre == undefined) {
                /*  const escribirArchivo$ = rxjs.from(funciones.escribirArchivo(respuesta.nombre+"", "Grabaciones"))
                  escribirArchivo$.subscribe(respuesta => {
                      console.log(respuesta)
                  });*/
                console.log(respuesta.nombre + "1");
            }
            else {
                var escribirArchivo$_1 = rxjs.from(funciones.escribirArchivo(respuesta.nombre + "\n", "Grabaciones"));
                escribirArchivo$_1.subscribe(function (respuesta) {
                    console.log(respuesta);
                });
                console.log(respuesta.nombre + "2");
            }
            break;
        case "Salir Sesion":
            if (respuesta.nombre == undefined) {
                /*  const escribirArchivo$ = rxjs.from(funciones.escribirArchivo(respuesta.nombre+"", "Grabaciones"))
                  escribirArchivo$.subscribe(respuesta => {
                      console.log(respuesta)
                  });*/
                console.log(respuesta.nombre + "1");
            }
            else {
                console.log(respuesta.nombre + "1");
                leerArchivo$.subscribe(function (respuesta) {
                    ArregloUsuarios = respuesta.contenido.split('-');
                    // borrar archivo
                });
            }
            break;
    }
});

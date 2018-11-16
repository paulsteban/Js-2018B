declare var require: any;
const inquirer = require('inquirer');
const async = require("async");
const rxjs = require("rxjs");
const distinct = require("rxjs/operators").distinct;
const map = require("rxjs/operators").map;
const funciones = require('./funciones');
const leerArchivo$ = rxjs.from(funciones.leerArchivo("Usuarios"));
let ArregloUsuarios = [];
const preguntas = [
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
            const done = this.async();
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

inquirer.prompt(preguntas).then(respuesta => {
    const escribirArchivo$ = rxjs.from(funciones.escribirArchivo(respuesta.nombre+"\n", "Usuarios"))
    escribirArchivo$.subscribe(respuesta => {
        console.log(respuesta)
    });
    switch (respuesta.menu) {
        case "Ver un video":
            console.log(respuesta.nombre+"");
       /*     inquirer.prompt(videos)
                .then(comic => {
                    const leerYEscribirArchivo$ = rxjs.from(funciones.leerYEscribir(JSON.stringify(comic), "DC"));
                    leerYEscribirArchivo$
                        .subscribe(respuesta => {
                            console.log(respuesta);
                        });
                });*/
            break;

        case   "Iniciar Grabacion":
            console.log(respuesta.nombre+"");
            if (respuesta.nombre == undefined){
              /*  const escribirArchivo$ = rxjs.from(funciones.escribirArchivo(respuesta.nombre+"", "Grabaciones"))
                escribirArchivo$.subscribe(respuesta => {
                    console.log(respuesta)
                });*/
                console.log(respuesta.nombre+"1");
            }else {
                const escribirArchivo$ = rxjs.from(funciones.escribirArchivo(respuesta.nombre+"\n", "Grabaciones"))
                escribirArchivo$.subscribe(respuesta => {
                    console.log(respuesta)
                });
                console.log(respuesta.nombre+"2");
            }

break;

case
"Salir Sesion"
:
    if (respuesta.nombre == undefined){
        /*  const escribirArchivo$ = rxjs.from(funciones.escribirArchivo(respuesta.nombre+"", "Grabaciones"))
          escribirArchivo$.subscribe(respuesta => {
              console.log(respuesta)
          });*/
        console.log(respuesta.nombre+"1");
    }else {
        console.log(respuesta.nombre+"1");
            leerArchivo$.subscribe(respuesta => {
                ArregloUsuarios = respuesta.contenido.split('-');
                // borrar archivo

            });

    }
break;

}

})
;


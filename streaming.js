var inquirer = require('inquirer');
var async = require("async");
var rxjs = require("rxjs");
var distinct = require("rxjs/operators").distinct;
var map = require("rxjs/operators").map;
var funciones = require('./funciones');
var leerArchivo$ = rxjs.from(funciones.leerArchivo("Usuarios"));
var ArregloUsuarios = [];
leerArchivo$.subscribe(function (respuesta) {
    ArregloUsuarios = respuesta.contenido.split('\n');
});
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
    switch (respuesta.menu) {
        case "Ver un video":
            console.log("Busca tu video favorito");
            ArregloUsuarios.forEach(function (value) {
                if (value != '') {
                    console.log(value);
                }
            });
            inquirer.prompt({
                type: "imput",
                name: "online",
                message: "Interesado en algo?",
            }).then(function (respuesta) {
                var imprimir = ArregloUsuarios.forEach(function (value, index, array) {
                    if (value == respuesta.online) {
                        console.log("Bienvenido disfruta tu video");
                    }
                    if (index == array.length - 1 && value != respuesta.online) {
                        console.log("Video no encontrado");
                    }
                });
                /*      const Comparar = ArregloUsuarios.filter(v=>{

          v ==respuesta.online+""}).some(v => v != undefined);

      if(Comparar){
          console.log("Disfruta tu video de "+ respuesta.online)
      }else
      { console.log("Usuario no encontrado")}*/
            });
            break;
        case "Iniciar Grabacion":
            if (respuesta.nombre == undefined) {
                /*  const escribirArchivo$ = rxjs.from(funciones.escribirArchivo(respuesta.nombre+"", "Grabaciones"))
                  escribirArchivo$.subscribe(respuesta => {
                      console.log(respuesta)
                  });*/
                console.log("Usuario " + respuesta.nombre + " no puedes grabar si no inicias sesion");
            }
            else {
                var escribirArchivo$ = rxjs.from(funciones.escribirArchivo(respuesta.nombre + "\n", "Grabaciones"));
                escribirArchivo$.subscribe(function (respuesta) {
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
                console.log("Vuelva pronto");
            }
            else {
                console.log(respuesta.nombre + "1");
                var borrarA_1 = [];
                leerArchivo$.subscribe(function (respuesta) {
                    borrarA_1 = respuesta.contenido.split('\n');
                    borrarA_1.pop();
                    // borrar archivo
                });
            }
            break;
    }
    if (respuesta.nombre != undefined) {
        var escribirArchivo$ = rxjs.from(funciones.escribirArchivo(respuesta.nombre + "\n", "Usuarios"));
        escribirArchivo$.subscribe(function (respuesta) {
            console.log(respuesta);
        });
    }
});

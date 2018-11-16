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

    if (respuesta.nombre != undefined){
        const escribirArchivo$ = rxjs.from(funciones.escribirArchivo(respuesta.nombre+"\n", "Usuarios"))
        escribirArchivo$.subscribe(respuesta => {
            console.log(respuesta)});
}



    switch (respuesta.menu) {
        case "Ver un video":
            leerArchivo$.subscribe(respuesta => {
                ArregloUsuarios = respuesta.contenido.split('-');
                console.log("Busca tu video favorito");
                 ArregloUsuarios.forEach(value => {
                     if (value != '') {
                         console.log(value);
                     }
                 });
                    inquirer.prompt({
                        type: "imput",
                        name: "online",
                        message: "Interesado en algo?",
                     //   choices: ArregloUsuarios
                    }).then(respuesta => {
                        if(ArregloUsuarios.){
                            console.log("Estas viendo: "+respuesta.online);}
                        });
                });



            break;

        case   "Iniciar Grabacion":
            if (respuesta.nombre == undefined){
              /*  const escribirArchivo$ = rxjs.from(funciones.escribirArchivo(respuesta.nombre+"", "Grabaciones"))
                escribirArchivo$.subscribe(respuesta => {
                    console.log(respuesta)
                });*/
                console.log("Usuario " +respuesta.nombre+" no puedes grabar si no inicias sesion");
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
        console.log("Vuelva pronto");
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


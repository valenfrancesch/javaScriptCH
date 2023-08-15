let dias = {
    lunes: 0,
    martes: 1,
    miercoles: 2,
    jueves: 3,
    viernes: 4,
    sabado: 5,
    domingo: 6,
}

let listaTareas = [[], [], [], [], [], [], []];
let cont = 1;

function crearElementoInput(contenedor){
     //Creo el elemtno input
     const ingresarTarea = document.createElement("input");
     ingresarTarea.type = "text";
     ingresarTarea.placeholder = "Ingrese una tarea";
     contenedor.insertBefore(ingresarTarea, contenedor.firstChild);
     ingresarTarea.focus();

     return ingresarTarea;
}
function crearElementoEnviar(contenedor){
     //Creo el boton enviar
     const enviar = document.createElement("input");
     enviar.type="submit";
     enviar.name="submit";
     enviar.value = ">";
     contenedor.appendChild(enviar);

     return enviar;
}

function crearElementoTarea (tarea, contenedor){
    //Creo texto de la tarea
    const tareaDia = document.createElement("p");
    tareaDia.innerHTML = tarea;
    tareaDia.class = "tarea";
    const contenedorDia = contenedor.previousElementSibling;
    contenedorDia.appendChild(tareaDia);

    return tareaDia;
}

//Recuperar lo del local Storage
function restaurarValores(){
    let lista = localStorage.getItem("tareas");
    if(!lista){
        return;
    }

    listaTareas = JSON.parse(lista);
    listaTareas.forEach(function (dia){
        dia.forEach(function (obj){
            let nombre = "#" + obj.dia;
            let contenedor = document.querySelector(nombre).parentElement;
            crearElementoTarea(obj.tarea, contenedor);
        })
    })

    let conta = localStorage.getItem("contador");
    if(!conta){
        return;
    }
    cont = JSON.parse(conta);
}

function guardarLocal(){
    let info = JSON.stringify(listaTareas);
    localStorage.setItem("tareas", info);

    let contador = JSON.stringify(cont);
    localStorage.setItem("contador", contador);
}

function almacenar(tarea, id, elhtml){
    let numero =  dias[id];
    let obj = {
        tarea: tarea,
        dia: id,
        num: numero,
        id: cont,
        elem: elhtml,
    };

    cont++; //para que cada tarea tenga un id unico 

    listaTareas[numero].push(obj);

    guardarLocal();
}

const agregarTareaBotones = document.querySelectorAll(".agregar-tarea");

//Cuando apreto cada boton +
agregarTareaBotones.forEach(function (boton) {
    boton.addEventListener("click", function (e) {
        let eventoId = e.target.id;
        boton.style.display = 'none'; // que no se muestre el más
        const diaContenido = boton.parentElement;

        // Crear input y boton
        const ingresarTarea = crearElementoInput(diaContenido);
        const enviar = crearElementoEnviar(diaContenido);

        //Para que cuando apreto enter se active enviar
        ingresarTarea.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
              event.preventDefault();
              enviar.click();
            }
        }); 

        //Cuando envio la tarea: la guardo y agrego al html
        enviar.addEventListener("click", function () {
            const tarea = ingresarTarea.value;
            const tareaDia = crearElementoTarea(tarea, diaContenido);
            ingresarTarea.blur();
            almacenar(tarea, eventoId, tareaDia);
        });

        //Cuando ya termine
        ingresarTarea.onblur = function(){
            diaContenido.removeChild(ingresarTarea);
            diaContenido.removeChild(enviar);
            boton.style.display = ''; 
        }
    });
});

restaurarValores();
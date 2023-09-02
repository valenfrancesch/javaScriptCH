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
    const cruz = document.createElement("span");
    cruz.innerHTML = "X";
    cruz.classList.add("cruz");
    const tareaDia = document.createElement("p");
    tareaDia.innerHTML = tarea;
    tareaDia.appendChild(cruz);
    cruz.style.display = "none";
    tareaDia.classList.add("tarea");
    const contenedorDia = contenedor.previousElementSibling;
    contenedorDia.appendChild(tareaDia);

    tareaDia.addEventListener("mouseenter", function () {
        cruz.style.display = "inline"; // Mostrar la cruz
    });

    tareaDia.addEventListener("mouseleave", function () {
        cruz.style.display = "none"; // Ocultar la cruz
    });

    cruz.addEventListener("click", function () {
        eliminarTarea(tareaDia); // eliminar de la lista tarea
        contenedorDia.removeChild(tareaDia);
    });
    return tareaDia;
}

//Cuando se apreta la cruz
function eliminarTarea(tarea_) {
    let dia = tarea_.parentElement.parentElement.classList;
    dia = dia[1];
    const numero = dias[dia];

    listaTareas[numero] = listaTareas[numero].filter(function (obj) {
        let txt= tarea_.textContent;
        txt = txt.slice(0, -1)
        return obj.tarea != txt;
    });

    guardarLocal(); 
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

function almacenar(tarea, id, elhtml){ //tarea=value, id="lunes", "martes", "miercoles", etc, elhtml=parrafo html
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

restaurarValores();
const agregarTareaBotones = document.querySelectorAll(".agregar-tarea");

//Cuando apreto cada boton +
agregarTareaBotones.forEach(function (boton) {
    boton.addEventListener("click", function (e) {
        let eventoId = e.target.id;
        boton.style.display = "none"; // que no se muestre el más
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
            //cancelar();
        });

        //Cuando ya termine
        ingresarTarea.onblur = function(){
            diaContenido.removeChild(ingresarTarea);
            diaContenido.removeChild(enviar);
            boton.style.display = "inline"; 
        }
    });
});

//Uso de libreria moment.js para decir que día es hoy
function actualizarDia(dia, num, mes){
    const titulo = document.getElementById("dia-hoy");
    let p = dia + " " + num + " de " + mes;
    titulo.innerHTML = p;
}

//Seleccionar el día de hoy
function destacarDia(dia){
    let divDia = document.getElementsByClassName(dia);
    divDia[0].classList.add("diaHoy");
}

moment.locale("es");
const fechaHoy = moment();
const diaHoySemana = fechaHoy.format("dddd"); // Día de la semana
const diaHoyNumero = fechaHoy.format("YY"); // Numero Día
const mesHoy = fechaHoy.format("MMMM");
actualizarDia(diaHoySemana, diaHoyNumero, mesHoy);
destacarDia(diaHoySemana);

//Escribir temperatura de ahora
function clima(temp){
    const contenedor = document.getElementById("dia-hoy");
    let txt = document.createElement("span");
    let inner = ", " + temp + "°C";
    txt.innerHTML = inner;
    contenedor.appendChild(txt);
}

//API clima
fetch("https://api.open-meteo.com/v1/forecast?latitude=-34.6131&longitude=-58.3772&hourly=temperature_2m&current_weather=true")
.then((resp) => {return resp.json()})
.then((data) => {
    let datoTemp = data.current_weather.temperature
    clima(datoTemp, );
})
.catch((err) => {console.log(err)});

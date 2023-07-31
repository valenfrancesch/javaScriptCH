let todosDias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];

function guardarTarea(txt, dia){
    let tarea = {
        tarea: txt,
        dia: todosDias[dia-1],
        diaNum: dia,
    }
    return tarea;
}

function ingresarDia(){
    let dia = parseInt(prompt("Escriba el número del día en el que quiere realizar la tarea: Lunes(1), Martes(2), Miércoles(3), Jueves(4), Viernes(5), Sábado(6), Domingo(7)"));
    if(dia > 7 || dia < 1){
        alert("Error. Escriba un número entre el 1 y el 7");
        dia = ingresarDia();
    }
    return dia;
}

function ingresarTarea(){
    let tarea= prompt("Escriba la tarea pendiente");
    return tarea;
}

function ingresoCaso(){
    let verificador = parseInt(prompt("Escriba 1 si quiere ingresar una tarea. De lo contrario, escriba 2"));
    if(verificador == 1){
        return 1;
    }else if(verificador == 2){
        return 0;
    }else{
        alert("Error. Ingrese el número 1 o 2");
        return -1;
    }
}

function ordenarTareas(listaTareas){
    listaTareas.sort((a, b) => (a.diaNum > b.diaNum) ? 1 : (a.diaNum < b.diaNum) ? -1 : 0);
    return listaTareas;
}

function mostrarTareas(listaTareas){
    let size = listaTareas.length;
    if(size == 0){
        console.log("No hay ninguna tarea");
        return;
    }

    let dia = 0;
    for(let i=0; i<size; i++){
        if (listaTareas[i].diaNum != dia){
            if(dia != 0){
                console.log("-----------------------");
            }
            console.log("Tareas del día " + listaTareas[i].dia);
            dia = listaTareas[i].diaNum;
        }
        console.log("- " + listaTareas[i].tarea);
    }
}

let tareas = [];

while (true){
    verificador = ingresoCaso();
    if(verificador == 1){
        tareas.push(guardarTarea(ingresarTarea(), ingresarDia()));
    }else if(verificador == 0){
        mostrarTareas(ordenarTareas(tareas));
        break;
    }
}
let dia = parseInt(prompt("Escriba el número del día en el que se encuentra: Lunes(1), Martes(2), Miércoles(3), Jueves(4), Viernes(5), Sábado(6), Domingo(7)"));
let diaSemana ="";

switch(dia){
    case 1:
        diaSemana = "Lunes";
        break;

    case 2:
        diaSemana = "Martes";
        break;
    
    case 3:
        diaSemana = "Miércoles";
        break;
    
    case 4:
        diaSemana = "Jueves";
        break;
    
    case 5:
        diaSemana = "Viernes";
        break;
    
    case 6:
        diaSemana = "Sábado";
        break;
    
    case 7:
        diaSemana = "Domingo";
        break;
    
    default:
        diaSemana = "Hoy";
        break;
}

let ingresoTarea = true;
let i = 0;
while (true){
    let verificador = parseInt(prompt("Escriba 1 si quiere ingresar una tarea para hoy. De lo contrario, escriba 2"));
    if(verificador == 2){
        ingresoTarea = false;
        if(i == 0){
            console.log(diaSemana + ", no hay nada por hacer");
        }else{
            console.log("Eso es todo por hoy!");
        }
        break;
    }
    let tarea= prompt("Escriba la tarea que quiere hacer hoy");
    console.log(diaSemana + ": " + tarea);
    i++;
}
let input = document.getElementById("inpResult");
let historial = document.getElementById("historial");
let historialCompleto = document.getElementById("historialCompleto");
let primerValor = "";
let operador = "";
let punto = false;
let evaluacion = "";

const numeros = (num) => {
    //Permite poner solo un 0 y no seguir acumulando a la izquierda más
    if(input.value.length == 1 && input.value == 0 && num == 0)
        return;
    //Si ya hay un 0 escrito y se pone un número distinto, borra el 0 para que solo se agregue el número y así no haya 0 a la izquierda
    if(input.value.length == 1 && input.value == 0 && num != 0 && num != '.')
        input.value = "";
    //Si no hay nada en el input y se añade un punto, se le agrega un 0 a la izquierda (.0 ❌, 0.0 ✅)
    if(input.value.length == 0 && num == '.')
        num = "0.";
    //Si ya se registró un punto y se intenta poner otro, se termina la función con un return vacío
    if(punto && num === '.')
        return;
    input.value += num;
    //Punto será igual a: si no se ha puesto ningún punto, entonces punto será igual a     
    //true o false si el input contiene un '.', si ya se había registrado un punto antes, se queda en true
    if(!punto)
        punto = input.value.includes(".");
    console.log(input.value);
    console.log(punto);
}

const operacion = (op) => {
    if(isNaN(input.value))
        return input.value = "SYNTAX ERROR";
    if(input.value == "")
        return;
    primerValor = parseFloat(input.value);
    evaluacion = input.value+" "+op+" ";
    historial.innerHTML = evaluacion;
    input.value = "";
    punto = false;
    operador = op;
}

const resultado = () => {
    if(primerValor == "" || input.value == "")
        return;
    if(isNaN(input.value))
        return input.value = "SYNTAX ERROR";
    let segundoValor = parseFloat(input.value);
    historial.innerHTML = evaluacion+input.value+" =";
    if(operador == '/' && segundoValor == 0)
    return input.value = 'MATH ERROR';
    let resultado = 
        operador == '+' ? primerValor + segundoValor :
        operador == '-' ? primerValor - segundoValor :
        operador == '*' ? primerValor * segundoValor :
        operador == '/' ? primerValor / segundoValor : null;
    historialCompleto.innerHTML += `<p class="operacion">${historial.innerHTML} ${resultado}</p>`
    
    input.value = resultado;
    punto = (""+resultado).includes('.');
}

const borrar = () => {
    if(input.value == ""){
        historial.innerHTML = "0.0";
        primerValor = "";
        segundoValor = "";
    }
    input.value = "";
}
let resultado = document.getElementById("resultado");
let operacionActual = "";
let operacionAnterior = "";
let tiempo = 0;
let intervaloId;

// Función para reproducir sonido
function reproducirSonido(nombreArchivo) {
    const sonido = new Audio(nombreArchivo);
    sonido.volume = 0.5;
    sonido.play();
}

// Iniciar el temporizador
function iniciarTemporizador() {
    intervaloId = setInterval(() => {
        tiempo++;
        document.getElementById("tiempo").innerText = tiempo; // Actualizar el temporizador en la interfaz
    }, 1000); // Actualizar cada segundo
}

// Detener el temporizador
function detenerTemporizador() {
    clearInterval(intervaloId);
}

function agregarNumero(numero) {
    reproducirSonido('click-sound.mp3');
    resultado.value += numero;
}

function operacion(op) {
    if (resultado.value === "") return;
    if (operacionActual !== "") {
        calcular();
    }
    operacionAnterior = resultado.value;
    operacionActual = op;
    resultado.value = "";
    reproducirSonido('click-sound.mp3');
}

function calcular() {
    let calculo;
    const anterior = parseFloat(operacionAnterior);
    const actual = parseFloat(resultado.value);
    if (isNaN(anterior) || isNaN(actual)) return;

    switch (operacionActual) {
        case "+":
            calculo = anterior + actual;
            break;
        case "-":
            calculo = anterior - actual;
            break;
        case "*":
            calculo = anterior * actual;
            break;
        case "/":
            if (actual === 0) {
                reproducirSonido('error-sound.mp3'); // Reproducir sonido de error
                // Usar setTimeout para esperar antes de mostrar el mensaje de error
                setTimeout(() => {
                    alert("Error");
                    limpiar(); // Limpiar el resultado
                }, 500); // Esperar 2 segundos antes de mostrar el mensaje
                return;
            }
            calculo = anterior / actual;
            break;
        default:
            return;
    }
    resultado.value = calculo;
    operacionActual = "";
    operacionAnterior = "";
}

function limpiar() {
    resultado.value = "";
    operacionActual = "";
    operacionAnterior = "";
    reproducirSonido('click-sound.mp3');
}

// Iniciar el temporizador cuando se carga la página
window.onload = iniciarTemporizador;

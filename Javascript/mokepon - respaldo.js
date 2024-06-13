    let sectionElegirAtaque = document.getElementById("seleccionar-ataque")
    let botonMascotaJugador = document.getElementById("boton-mascota")
    let botonFuego = document.getElementById("boton-fuego")
    let botonAgua = document.getElementById("boton-agua")
    let botonTierra = document.getElementById("boton-tierra")
    let divReiniciar = document.getElementById('divReiniciar')
    let botonReiniciar = document.getElementById("reiniciar")
    let inputHipo = document.getElementById("hipo")
    let inputTurtle = document.getElementById("turtle")
    let inputFire = document.getElementById("fire")


let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

function aleatorio(max, min){
    return Math.floor( Math.random() * (max-min+1) + min)
}

function iniciarJuego(){

    sectionElegirAtaque.style.display = "none"
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
    botonFuego.addEventListener("click", ataqueFuego)
    botonAgua.addEventListener("click", ataqueAgua)
    botonTierra.addEventListener("click", ataqueTierra)
    divReiniciar.style.display = "none"
    botonReiniciar.addEventListener("click", reiniciarJuego) 
    inputHipo.checked = false
    inputTurtle.checked = false
    inputFire.checked = false
}



function seleccionarMascotaJugador() {
    let inputHipo = document.getElementById("hipo")
    let inputTurtle = document.getElementById("turtle")
    let inputFire = document.getElementById("fire")
    let spanMascotaJugador = document.getElementById("mascota-jugador")
    
    
    if (inputHipo.checked) {
        spanMascotaJugador.innerHTML = "Hipodogue"
        document.getElementById("mascota-seleccionada-jugador").src="img/mokepons_mokepon_hipodoge_attack.png"
        cambioPantalla()
    } else if (inputTurtle.checked) {
        spanMascotaJugador.innerHTML = "Turtle"
        document.getElementById("mascota-seleccionada-jugador").src="img/mokepons_mokepon_capipepo_attack.png"
        cambioPantalla()
    } else if (inputFire.checked) {
        spanMascotaJugador.innerHTML = "Firefox"
        document.getElementById("mascota-seleccionada-jugador").src="img/mokepons_mokepon_ratigueya_attack.png"
        cambioPantalla()
    } else{
        alert("Selecciona una mascota, subnormal!!")
    }

    
    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo(){
    let ataqueAleatorio = aleatorio(3,1)
    let spanMascotaEnemigo = document.getElementById("mascota-enemigo")
    
    if (ataqueAleatorio == 1) {
        spanMascotaEnemigo.innerHTML = "Hipodoque"
        document.getElementById("mascota-seleccionada-enemigo").src="img/mokepons_mokepon_hipodoge_attack.png"
    } else if (ataqueAleatorio == 2) {
        spanMascotaEnemigo.innerHTML = "Turtle"
        document.getElementById("mascota-seleccionada-enemigo").src="img/mokepons_mokepon_capipepo_attack.png"
    } else{
        spanMascotaEnemigo.innerHTML = "Firefox"
        document.getElementById("mascota-seleccionada-enemigo").src="img/mokepons_mokepon_ratigueya_attack.png"
    }
}

function cambioPantalla(){
    let sectionElegirAtaque = document.getElementById("seleccionar-ataque")
    sectionElegirAtaque.style.display = "block"
    
    let sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
    sectionSeleccionarMascota.style.display = "none"
}



function ataqueFuego(){
    ataqueJugador = "Fuego"
    ataqueAleatorioEnemigo()
}
function ataqueAgua(){
    ataqueJugador = "Agua"
    ataqueAleatorioEnemigo()
}
function ataqueTierra(){
    ataqueJugador = "Tierra"
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(3,1)
    if (ataqueAleatorio == 1){
        ataqueEnemigo = "Fuego"
    } else if (ataqueAleatorio == 2){
        ataqueEnemigo = "Agua"
    } else {
        ataqueEnemigo = "Tierra"
    }
    consola()
}

function consola(){
    let resultado
    let spanvidasJugador = document.getElementById("vidas-jugador")
    let spanvidasEnemigo = document.getElementById("vidas-enemigo")
    
    if (ataqueJugador == ataqueEnemigo){
        resultado = "EMPATE"
    } else if (ataqueJugador == "Fuego" && ataqueEnemigo == "Tierra"){
        resultado = "Ganaste"
        vidasEnemigo--
        spanvidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == "Agua" && ataqueEnemigo == "Fuego"){
        resultado = "Ganaste"
        vidasEnemigo--
        spanvidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == "Tierra" && ataqueEnemigo == "Agua"){
        resultado = "Ganaste"
        vidasEnemigo--
        spanvidasEnemigo.innerHTML = vidasEnemigo
    } else {
        resultado = "Perdiste"
        vidasJugador--
        spanvidasJugador.innerHTML = vidasJugador
    }
    
    let ultimoMensaje = document.getElementById("ultimo-resultado")
    
    let seccionMensajes = document.getElementById("consola")
    let parrafo = document.createElement("p")
    parrafo.innerHTML = "Atacaste con " + ataqueJugador + ", el Enemigo ataco con " + ataqueEnemigo + ", resultado = " + resultado
    seccionMensajes.appendChild(parrafo)
    
    if (vidasEnemigo == 0){
        parrafo.innerHTML = "Ganaste! Felicidades "
        ultimoMensaje.innerHTML = "Ganaste, Felicidades"
        desactivarBotones()
    } else if (vidasJugador == 0){
        parrafo.innerHTML = "Perdiste, sos uns Mrd!"
        ultimoMensaje.innerHTML = "Perdiste, sos una Mrd"
        desactivarBotones()
    }
    
}

function desactivarBotones(){
    let botonReiniciar = document.getElementById("divReiniciar")
    botonReiniciar.style.display = "block"
    
    let botonFuego = document.getElementById("boton-fuego")
    botonFuego.disabled = true
    let botonAgua = document.getElementById("boton-agua")
    botonAgua.disabled = true
    
    let botonTierra = document.getElementById("boton-tierra")
    botonTierra.disabled = true
}

function reiniciarJuego(){
    location.reload()
}


window.addEventListener("load", iniciarJuego)
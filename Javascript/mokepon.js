const sectionElegirAtaque = document.getElementById("seleccionar-ataque")
const botonMascotaJugador = document.getElementById("boton-mascota")
const divReiniciar = document.getElementById('divReiniciar')
const botonReiniciar = document.getElementById("reiniciar")
const spanMascotaJugador = document.getElementById("mascota-jugador")
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")
const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const spanvidasJugador = document.getElementById("vidas-jugador")
const spanvidasEnemigo = document.getElementById("vidas-enemigo")
const ultimoMensaje = document.getElementById("ultimo-resultado")
const seccionMensajes = document.getElementById("consola")
const divTarjetas = document.getElementById("tarjetas")
const divAtaquesJugador = document.getElementById("ataques-Jugador")
const sectorVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let ataqueJugador = []
let botones = []
let ataquesMascotaEnemigo = []
let ataqueEnemigo = []
let ataquesJugador
let mascotaJugador
let jugadorID = null
let renderAtaquesJugador
let vidasJugador = 0
let vidasEnemigo = 0
let mokepones = []
let opcionMokepon
let inputMokepon1
let inputMokepon2
let inputMokepon3
let resultado
let index = 0
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "img/mokemap.webp"


class Mokepon {
    constructor(nombre, foto, vidas, cara){
        this._nombre = nombre
        this._fotos = foto
        this._vidas = vidas
        this._ataques = []
        this._x = aleatorio(270, 0)
        this._y = aleatorio (190, 0)
        this._ancho = 50
        this._alto = 50
        this._imagen = new Image()
        this._imagen.src = foto
        this._velocidadX = 0
        this._velocidadY = 0
        this._cara = new Image()
        this._cara.src = cara
    }
 pintar(){
    lienzo.drawImage(
        this._cara, 
        this._x, 
        this._y, 
        this._ancho, 
        this._alto)
}
}

let cheems = new Mokepon("Cheems", "img/mokepons_mokepon_hipodoge_attack.png", 5, "img/cheems.webp")
let peruano = new Mokepon("Peruano", "img/mokepons_mokepon_capipepo_attack.png", 5, "img/peruano.webp")
let firefox = new Mokepon("Firefox", "img/mokepons_mokepon_ratigueya_attack.png", 5, "img/firefox.webp")
let cheemsEnemigo = new Mokepon("Cheems", "img/mokepons_mokepon_hipodoge_attack.png", 5, "img/cheems.webp")
let peruanoEnemigo = new Mokepon("Peruano", "img/mokepons_mokepon_capipepo_attack.png", 5, "img/peruano.webp")
let firefoxEnemigo = new Mokepon("Firefox", "img/mokepons_mokepon_ratigueya_attack.png", 5, "img/firefox.webp")

cheems._ataques.push(
    {nombre:"Agua💧", id:"boton-agua"},
    {nombre:'Agua💧', id:'boton-agua'},
    {nombre:'Agua💧', id:'boton-agua'},
    {nombre:'Fuego🔥', id:'boton-fuego'},
    {nombre:'Tierra🌱', id:'boton-tierra'},
)

peruano._ataques.push(
    {nombre:'Tierra🌱', id:'boton-tierra'},
    {nombre:'Tierra🌱', id:'boton-tierra'},
    {nombre:'Tierra🌱', id:'boton-tierra'},
    {nombre:'Agua💧', id:'boton-agua'},
    {nombre:'Fuego🔥', id:'boton-fuego'},
)

firefox._ataques.push(
    {nombre:'Fuego🔥', id:'boton-fuego'},
    {nombre:'Fuego🔥', id:'boton-fuego'},
    {nombre:'Fuego🔥', id:'boton-fuego'},
    {nombre:'Tierra🌱', id:'boton-tierra'},
    {nombre:'Agua💧', id:'boton-agua'},
)

cheemsEnemigo._ataques.push(
    {nombre:"Agua💧", id:"boton-agua"},
    {nombre:'Agua💧', id:'boton-agua'},
    {nombre:'Agua💧', id:'boton-agua'},
    {nombre:'Fuego🔥', id:'boton-fuego'},
    {nombre:'Tierra🌱', id:'boton-tierra'},
)

peruanoEnemigo._ataques.push(
    {nombre:'Tierra🌱', id:'boton-tierra'},
    {nombre:'Tierra🌱', id:'boton-tierra'},
    {nombre:'Tierra🌱', id:'boton-tierra'},
    {nombre:'Agua💧', id:'boton-agua'},
    {nombre:'Fuego🔥', id:'boton-fuego'},
)

firefoxEnemigo._ataques.push(
    {nombre:'Fuego🔥', id:'boton-fuego'},
    {nombre:'Fuego🔥', id:'boton-fuego'},
    {nombre:'Fuego🔥', id:'boton-fuego'},
    {nombre:'Tierra🌱', id:'boton-tierra'},
    {nombre:'Agua💧', id:'boton-agua'},
)

mokepones.push(cheems,peruano,firefox)

function aleatorio(max, min){
    return Math.floor( Math.random() * (max-min+1) + min)
}

function iniciarJuego(){
    mokepones.forEach((Mokepon) => {
        opcionMokepon = `
        <input type="radio" name="mascotas" id=${Mokepon._nombre} />
            <label for=${Mokepon._nombre}>
                <p>${Mokepon._nombre}</p>
                <img src=${Mokepon._fotos} alt=${Mokepon._nombre}, estilo tierra" />
            </label>
        `
    divTarjetas.innerHTML += opcionMokepon
        inputMokepon1 = document.getElementById("Cheems")
        inputMokepon2 = document.getElementById("Peruano")
        inputMokepon3 = document.getElementById("Firefox")
    })
    
    sectionElegirAtaque.style.display = "none"
    sectorVerMapa.style.display = "none"
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
    divReiniciar.style.display = "none"
    botonReiniciar.addEventListener("click", reiniciarJuego) 
    unirseOnline()
}

function unirseOnline() {
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorID = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador() {
    if (inputMokepon1.checked) {
        mascotaJugador = mokepones[0]
        spanMascotaJugador.innerHTML = mascotaJugador._nombre
        document.getElementById("mascota-seleccionada-jugador").src=mascotaJugador._fotos
        ataquesJugador = mascotaJugador._ataques
        cambioPantalla()
    } else if (inputMokepon2.checked) {
        mascotaJugador = mokepones[1]
        spanMascotaJugador.innerHTML = mascotaJugador._nombre
        document.getElementById("mascota-seleccionada-jugador").src=mascotaJugador._fotos
        ataquesJugador = mascotaJugador._ataques
        cambioPantalla()
        
    } else if (inputMokepon3.checked) {
        mascotaJugador = mokepones[2]
        spanMascotaJugador.innerHTML = mascotaJugador._nombre
        document.getElementById("mascota-seleccionada-jugador").src=mascotaJugador._fotos
        ataquesJugador = mascotaJugador._ataques
        cambioPantalla()
        
    } else{
        alert("Selecciona una mascota, subnormal!!")
    }
    renderAtaques(ataquesJugador)
    iniciarMapa()
    enviarMascota(mascotaJugador)
}

function enviarMascota(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorID}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador._nombre
        })
    })
}

function renderAtaques(ataquesJugador){
    ataquesJugador.forEach((_ataques) => {
        renderAtaquesJugador = `
            <button id=${_ataques.id} class="Bataque">${_ataques.nombre}</button>
            `;
        divAtaquesJugador.innerHTML += renderAtaquesJugador
    })
    
    
    botones = document.querySelectorAll(".Bataque")
    botones.forEach((elemento) => {
        elemento.addEventListener("click", function(){
            ataqueJugador.push(elemento.textContent)
            elemento.disabled = true
            elemento.style.color = "aqua"
            elemento.style.background = "gray"
            consola()
        })
    })
}


function seleccionarMascotaEnemigo(enemigo){
    let ataqueAleatorio = aleatorio(mokepones.length -1,0)
    spanMascotaEnemigo.innerHTML = enemigo._nombre
    document.getElementById("mascota-seleccionada-enemigo").src=enemigo._fotos
    ataquesMascotaEnemigo = enemigo._ataques
    console.log(enemigo)
    
    // Aplicar el algoritmo de Fisher-Yates para reordenar ataquesMascotaEnemigo
    for (let i = ataquesMascotaEnemigo.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [ataquesMascotaEnemigo[i], ataquesMascotaEnemigo[j]] = [ataquesMascotaEnemigo[j], ataquesMascotaEnemigo[i]];
    }
    ataqueEnemigo = ataquesMascotaEnemigo.map(obj => obj.nombre);
}

function cambioPantalla(){
    sectorVerMapa.style.display = "flex"
    sectionSeleccionarMascota.style.display = "none"
}


function consola(){
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            resultado = "EMPATE"
        } else if (ataqueJugador[index] == "Fuego🔥" && ataqueEnemigo[index] == "Tierra🌱"){
            resultado = "Ganaste"
            vidasJugador++
            spanvidasJugador.innerHTML = vidasJugador
        } else if (ataqueJugador[index] == "Agua💧" && ataqueEnemigo[index] == "Fuego🔥"){
            resultado = "Ganaste"
            vidasJugador++
            spanvidasJugador.innerHTML = vidasJugador
        } else if (ataqueJugador[index] == "Tierra🌱" && ataqueEnemigo[index] == "Agua💧"){
            resultado = "Ganaste"
            vidasJugador++
            spanvidasJugador.innerHTML = vidasJugador
        } else {
            resultado = "Perdiste"
            vidasEnemigo++
            spanvidasEnemigo.innerHTML = vidasEnemigo
        }

    
    let parrafo = document.createElement("p")
    parrafo.innerHTML = "Atacaste con " + ataqueJugador[index] + ", el Enemigo ataco con " + ataqueEnemigo[index] + ", resultado = " + resultado
    seccionMensajes.appendChild(parrafo)
    
    index = index + 1
    if (index==5){acabo()}
    function acabo(){
            if (vidasEnemigo == vidasJugador){
            parrafo.innerHTML = "Alto ahi rufian, esto es empate"
            ultimoMensaje.innerHTML = "Han empatado 🙄"
            desactivarBotones()
        } else if (vidasJugador > vidasEnemigo){
            parrafo.innerHTML = "Alto ahi maquinola, has ganado la partida"
            ultimoMensaje.innerHTML = "Ganaste, felicidades 😜👌"
            desactivarBotones()
        } else {
            parrafo.innerHTML = "Alto ahi crapero, has perdido la partida"
            ultimoMensaje.innerHTML = "Perdiste 😣"
            desactivarBotones()
        }
    }
}

function iniciarMapa(){
    mapa.width = 320
    mapa.height = 240
    window.addEventListener("keydown", mover)
    window.addEventListener("keyup", detenerMokepon)
    intervalo = setInterval(pintarCanvas, 50)
}

function pintarCanvas() {
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height)
    mascotaJugador._x = mascotaJugador._x + mascotaJugador._velocidadX
    mascotaJugador._y = mascotaJugador._y + mascotaJugador._velocidadY
    mascotaJugador.pintar()
    enviarposicion(mascotaJugador._x, mascotaJugador._y)
    cheemsEnemigo.pintar()
    peruanoEnemigo.pintar()
    firefoxEnemigo.pintar()
    if (mascotaJugador._velocidadX !== 0 || mascotaJugador._velocidadY !== 0){
        colision(cheemsEnemigo)
        colision(peruanoEnemigo)
        colision(firefoxEnemigo)
    }
}

function enviarposicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorID}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ enemigos }) {
                        console.log(enemigos)
                    }                   )
            }
        }

        )
}

function mover(event) {
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break;
        case "ArrowLeft":
            moverIzquierda()
            break;
        case "ArrowRight":
            moverDerecha()
            break;
        case "ArrowDown":
            moverAbajo()
            break;
        default:
            break;
    }
}

function colision(enemigo){
    const arribaEnemigo = enemigo._y
    const abajoEnemigo = enemigo._y + enemigo._alto
    const derechaEnemigo = enemigo._x + enemigo._ancho
    const izquierdaEnemigo = enemigo._x
    
    let arribaMascota = mascotaJugador._y
    let abajoMascota = mascotaJugador._y + mascotaJugador._alto
    let derechaMascota = mascotaJugador._x + mascotaJugador._ancho
    let izquierdaMascota = mascotaJugador._x
    
    if (abajoMascota < arribaEnemigo ||
       arribaMascota > abajoEnemigo ||
       derechaMascota < izquierdaEnemigo ||
       izquierdaMascota > derechaEnemigo
       ){  return
    }
    detenerMokepon()
    clearInterval(intervalo)
    seleccionarMascotaEnemigo(enemigo)
    sectionElegirAtaque.style.display = "block"
    sectorVerMapa.style.display = "none"
}

function moverIzquierda(){
    mascotaJugador._velocidadX = - 5
}

function moverDerecha(){
    mascotaJugador._velocidadX = 5
}

function moverArriba(){
    mascotaJugador._velocidadY = - 5
}

function moverAbajo(){
    mascotaJugador._velocidadY = 5
}

function detenerMokepon() {
    mascotaJugador._velocidadX = 0
    mascotaJugador._velocidadY = 0
}

function desactivarBotones(){
    divReiniciar.style.display = "block"
}

function reiniciarJuego(){
    location.reload()
}

window.addEventListener("load", iniciarJuego)
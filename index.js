const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())
let jugadores = []

class jugador {
    constructor(id) {
        this.id = id
    }
    asignarMokepon(mokepon) {
        this.mokepon = mokepon
    }
    actualizarPosicion(x, y) {
        this.x = x
        this.y = y
    }
}

class Mokepon {
    constructor(nombre) {
        this.nombre = nombre
    }
}

app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`
    const nuevojugador = new jugador(id)
    jugadores.push(nuevojugador)
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(id)
})

app.post("/mokepon/:jugadorID", (req, res) => {
    const jugadorID = req.params.jugadorID || ""
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorID === jugador.id)
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }
    console.log(jugadores)
    console.log(mokepon)
    res.end()
})

app.post("/mokepon/:jugadorID/posicion", (req, res) => {
    const jugadorID = req.params.jugadorID || ""
    const x = req.body.x || 0 
    const y = req.body.y || 0
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorID === jugador.id)
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x,y)
    }
    const enemigos = jugadores.filter((jugador) => jugadorID !== jugador.id)
    res.send({
        enemigos
    })
   
})

app.listen(8080, () => {
    console.log("Servidor funcionando")
})
let xp = 0;
let salud = 100;
let oro = 50;
let armaActual = 0;
let luchando;
let saludMonstruo;
let inventario = ["palo"];

const boton1 = document.querySelector('#button1');
const boton2 = document.querySelector("#button2");
const boton3 = document.querySelector("#button3");
const texto = document.querySelector("#text");
const textoXP = document.querySelector("#xpText");
const textoSalud = document.querySelector("#healthText");
const textoOro = document.querySelector("#goldText");
const statsMonstruo = document.querySelector("#monsterStats");
const nombreMonstruo = document.querySelector("#monsterName");
const textoSaludMonstruo = document.querySelector("#monsterHealth");
const armas = [
  { nombre: 'palo', poder: 5 },
  { nombre: 'daga', poder: 30 },
  { nombre: 'martillo de garra', poder: 50 },
  { nombre: 'espada', poder: 100 }
];
const monstruos = [
  {
    nombre: "babosa",
    nivel: 2,
    salud: 15
  },
  {
    nombre: "bestia dentada",
    nivel: 8,
    salud: 60
  },
  {
    nombre: "dragón",
    nivel: 20,
    salud: 300
  }
]
const lugares = [
  {
    nombre: "plaza del pueblo",
    "texto del botón": ["Ir a la tienda", "Ir a la cueva", "Combatir al dragón"],
    "funciones del botón": [irTienda, irCueva, combatirDragón],
    texto: "Estás en la plaza del pueblo. Ves un letrero que dice \"Tienda\"."
  },
  {
    nombre: "tienda",
    "texto del botón": ["Comprar 10 de salud (10 oro)", "Comprar arma (30 oro)", "Ir a la plaza del pueblo"],
    "funciones del botón": [comprarSalud, comprarArma, irPueblo],
    texto: "Entras en la tienda."
  },
  {
    nombre: "cueva",
    "texto del botón": ["Combatir babosa", "Combatir bestia dentada", "Ir a la plaza del pueblo"],
    "funciones del botón": [combatirBabosa, combatirBestia, irPueblo],
    texto: "Entras en la cueva. Ves algunos monstruos."
  },
  {
    nombre: "combate",
    "texto del botón": ["Atacar", "Esquivar", "Huir"],
    "funciones del botón": [atacar, esquivar, irPueblo],
    texto: "Estás combatiendo contra un monstruo."
  },
  {
    nombre: "matar monstruo",
    "texto del botón": ["Ir a la plaza del pueblo", "Ir a la plaza del pueblo", "Ir a la plaza del pueblo"],
    "funciones del botón": [irPueblo, irPueblo, irPueblo],
    texto: 'El monstruo grita "¡Arg!" mientras muere. Obtienes puntos de experiencia y encuentras oro.'
  },
  {
    nombre: "perder",
    "texto del botón": ["¿REINICIAR?", "¿REINICIAR?", "¿REINICIAR?"],
    "funciones del botón": [reiniciar, reiniciar, reiniciar],
    texto: "Mueres. ☠️"
  },
  { 
    nombre: "ganar", 
    "texto del botón": ["¿REINICIAR?", "¿REINICIAR?", "¿REINICIAR?"], 
    "funciones del botón": [reiniciar, reiniciar, reiniciar], 
    texto: "¡Derrotas al dragón! ¡GANAS EL JUEGO! 🎉" 
  },
  {
    nombre: "huevo de pascua",
    "texto del botón": ["2", "8", "¿Ir a la plaza del pueblo?"],
    "funciones del botón": [elegirDos, elegirOcho, irPueblo],
    texto: "Encuentras un juego secreto. Elige un número de arriba. Diez números se elegirán al azar entre 0 y 10. Si el número que eliges coincide con uno de los números aleatorios, ¡ganas!"
  }
];

// inicializar botones
boton1.onclick = irTienda;
boton2.onclick = irCueva;
boton3.onclick = combatirDragón;

function actualizar(lugar) {
  statsMonstruo.style.display = "none";
  boton1.innerText = lugar["texto del botón"][0];
  boton2.innerText = lugar["texto del botón"][1];
  boton3.innerText = lugar["texto del botón"][2];
  boton1.onclick = lugar["funciones del botón"][0];
  boton2.onclick = lugar["funciones del botón"][1];
  boton3.onclick = lugar["funciones del botón"][2];
  texto.innerHTML = lugar.texto;
}

function irPueblo() {
  actualizar(lugares[0]);
}

function irTienda() {
  actualizar(lugares[1]);
}

function irCueva() {
  actualizar(lugares[2]);
}

function comprarSalud() {
  if (oro >= 10) {
    oro -= 10;
    salud += 10;
    textoOro.innerText = oro;
    textoSalud.innerText = salud;
  } else {
    texto.innerText = "No tienes suficiente oro para comprar salud.";
  }
}

function comprarArma() {
  if (armaActual < armas.length - 1) {
    if (oro >= 30) {
      oro -= 30;
      armaActual++;
      textoOro.innerText = oro;
      let nuevaArma = armas[armaActual].nombre;
      texto.innerText = "Ahora tienes un(a) " + nuevaArma + ".";
      inventario.push(nuevaArma);
      texto.innerText += " En tu inventario tienes: " + inventario;
    } else {
      texto.innerText = "No tienes suficiente oro para comprar un arma.";
    }
  } else {
    texto.innerText = "¡Ya tienes el arma más poderosa!";
    boton2.innerText = "Vender arma por 15 de oro";
    boton2.onclick = venderArma;
  }
}

function venderArma() {
  if (inventario.length > 1) {
    oro += 15;
    textoOro.innerText = oro;
    let armaActual = inventario.shift();
    texto.innerText = "Has vendido un(a) " + armaActual + ".";
    texto.innerText += " En tu inventario tienes: " + inventario;
  } else {
    texto.innerText = "¡No vendas tu única arma!";
  }
}

function combatirBabosa() {
  luchando = 0;
  irCombate();
}

function combatirBestia() {
  luchando = 1;
  irCombate();
}

function combatirDragón() {
  luchando = 2;
  irCombate();
}

function irCombate() {
  actualizar(lugares[3]);
  saludMonstruo = monstruos[luchando].salud;
  statsMonstruo.style.display = "block";
  nombreMonstruo.innerText = monstruos[luchando].nombre;
  textoSaludMonstruo.innerText = saludMonstruo;
}

function atacar() {
  texto.innerText = "El " + monstruos[luchando].nombre + " ataca.";
  texto.innerText += " Tú lo atacas con tu " + armas[armaActual].nombre + ".";
  salud -= obtenerValorAtaqueMonstruo(monstruos[luchando].nivel);
  if (fueGolpeadoMonstruo()) {
    saludMonstruo -= armas[armaActual].poder + Math.floor(Math.random() * xp) + 1;    
  } else {
    texto.innerText += " Fallas.";
  }
  textoSalud.innerText = salud;
  textoSaludMonstruo.innerText = saludMonstruo;
  if (salud <= 0) {
    perder();
  } else if (saludMonstruo <= 0) {
    if (luchando === 2) {
      ganarJuego();
    } else {
      derrotarMonstruo();
    }
  }
  if (Math.random() <= .1 && inventario.length !== 1) {
    texto.innerText += " Tu " + inventario.pop() + " se rompe.";
    armaActual--;
  }
}

function obtenerValorAtaqueMonstruo(nivel) {
  const golpe = (nivel * 5) - (Math.floor(Math.random() * xp));
  console.log(golpe);
  return golpe > 0 ? golpe : 0;
}

function fueGolpeadoMonstruo() {
  return Math.random() > .2 || salud < 20;
}

function esquivar() {
  texto.innerText = "Esquivas el ataque del " + monstruos[luchando].nombre;
}

function derrotarMonstruo() {
  oro += Math.floor(monstruos[luchando].nivel * 6.7);
  xp += monstruos[luchando].nivel;
  textoOro.innerText = oro;
  textoXP.innerText = xp;
  actualizar(lugares[4]);
}

function perder() {
  actualizar(lugares[5]);
}

function ganarJuego() {
  actualizar(lugares[6]);
}

function reiniciar() {
  xp = 0;
  salud = 100;
  oro = 50;
  armaActual = 0;
  inventario = ["palo"];
  textoOro.innerText = oro;
  textoSalud.innerText = salud;
  textoXP.innerText = xp;
  irPueblo();
}

function huevoPascua() {
  actualizar(lugares[7]);
}

function elegirDos() {
  elegir(2);
}

function elegirOcho() {
  elegir(8);
}

function elegir(eleccion) {
  const numeros = [];
  while (numeros.length < 10) {
    numeros.push(Math.floor(Math.random() * 11));
  }
  texto.innerText = "Elegiste " + eleccion + ". Aquí están los números aleatorios:\n";
  for (let i = 0; i < 10; i++) {
    texto.innerText += numeros[i] + "\n";
  }
  if (numeros.includes(eleccion)) {
    texto.innerText += "¡Correcto! ¡Ganas 20 de oro!";
    oro += 20;
    textoOro.innerText = oro;
  } else {
    texto.innerText += "¡Incorrecto! ¡Pierdes 10 de salud!";
    salud -= 10;
    textoSalud.innerText = salud;
    if (salud <= 0) {
      perder();
    }
  }
}

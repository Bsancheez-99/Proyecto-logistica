const rack = document.getElementById("rack")
const info = document.getElementById("info")
const selector = document.getElementById("selectorRack")

const totalPos = document.getElementById("totalPos")
const ocupadas = document.getElementById("ocupadas")
const libres = document.getElementById("libres")

const racks = {

rack1:{
columnas:9,
filas:7,

productos:[
"MV PERRO OBESIDAD X2KG",
"MV RENAL X2KG",
"MV PERROS GASTRO X2KG",
"MV CARDIO X2KG",
"MV ARTICULAR X2KG",
"MV GATO URINARIO X2KG",
"MV GATO OBESIDAD X2KG",
"MV GATO RENAL X2KG",
"MV GATO GASTRO X2KG"
]
},

rack2:{
columnas:10,
filas:7,

productos:[
"MV ARTICULAR X10KG",
"MV GASTRO X10KG",
"MV RENAL X10KG",
"MV CARDIO X10KG",
"MV SENSIBILIDAD X10KG",
"MV PERRO OBESIDAD X10KG",
"URINARIO 7.5KG",
"MV PERRO SENSIBILIDAD X2KG",
"PULMON",
"PULMON"
]
},

rack3:{
columnas:10,
filas:5,
productos:[]
},

rack4:{
columnas:12,
filas:5,
productos:[]
}

}

function colorProducto(producto){

let nombre = producto.toLowerCase()

if(nombre.includes("cardio")) return "cardio"
if(nombre.includes("renal")) return "renal"
if(nombre.includes("sensi")) return "sensibilidad"
if(nombre.includes("gastro")) return "gastro"
if(nombre.includes("articular")) return "articular"
if(nombre.includes("obes")) return "obesidad"
if(nombre.includes("urinario")) return "urinario"

return "pulmon"
}

function generarRack(nombreRack){

rack.innerHTML=""

let datos = racks[nombreRack]

rack.style.gridTemplateColumns = `repeat(${datos.columnas},120px)`
rack.style.gridTemplateRows = `repeat(${datos.filas},80px)`

let total=0
let ocup=0

for(let fila = datos.filas; fila >= 1; fila--){

for(let col=0; col < datos.columnas; col++){

let celda=document.createElement("div")
celda.classList.add("celda")

let producto = datos.productos[col] || "Pulmón"
let texto="Pulmón"

celda.classList.add("pulmon")

if((nombreRack==="rack1" || nombreRack==="rack2")){

if(fila===1 && datos.productos[col]){

texto=producto
celda.classList.remove("pulmon")
celda.classList.add(colorProducto(producto))
ocup++

}

else if((fila===2 || fila===3) && datos.productos[col]){

texto="Picking"
celda.classList.remove("pulmon")
celda.classList.add("picking")
ocup++

}

}

celda.innerText=texto

celda.onclick=()=>{

info.innerHTML=`
<b>Rack:</b> ${nombreRack}<br>
<b>Producto:</b> ${producto}<br>
<b>Fila:</b> ${fila}<br>
<b>Columna:</b> ${col+1}
`
}

rack.appendChild(celda)

total++

}

}

totalPos.innerText=total
ocupadas.innerText=ocup
libres.innerText=total-ocup

}

selector.addEventListener("change",(e)=>{

generarRack(e.target.value)

})

generarRack("rack1")
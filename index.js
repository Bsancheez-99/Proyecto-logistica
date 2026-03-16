const rack = document.getElementById("rack")
const info = document.getElementById("info")
const selector = document.getElementById("selectorRack")
const selectorProducto = document.getElementById("selectorProducto")

const totalPos = document.getElementById("totalPos")
const ocupadas = document.getElementById("ocupadas")
const libres = document.getElementById("libres")

const tituloRack = document.getElementById("tituloRack")

let productoSeleccionado=""
let posicionBuscada=""

const racks={

rack1:{
columnas:9,
filas:7,
direccion:"up",

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

],

posiciones:[

["003","003","001","001"],
["008","007","006","006"],
["013","012","011","011"],
["018","017","016","015"],
["023","022","021","021"],
["028","027","026","026"],
["033","032","031","031"],
["038","037","036","035"],
["043","042","041","041"]

]

},

rack2:{
columnas:10,
filas:7,
direccion:"up",

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

],

posiciones:[

["093","092","093"],
["093","088","087"],
["083","082","081"],
["078","077","076"],
["073","072","071"],
["068","067","066"],
["063","062","061"],
["058","057","056"],
["055","054","053","052"],
["050","049","048","047"]

]

},

rack3:{
columnas:10,
filas:5,
direccion:"down",

productos:[],

posiciones:[

["096","096","097","097","098"],
["099","099","100","100","101"],
["102","102","103","103","104"],
["105","105","106","106","107"],
["108","108","109","109","110"],
["111","111","112","112","113"],
["114","114","115","115","116"],
["117","117","118","118","119"],
["120","120","121","121","122"],
["123","123","124","124","125"]

]

},

rack4:{
columnas:12,
filas:5,
direccion:"down",

productos:[],

posiciones:[

["159","160","160","161","161"],
["156","157","157","158","158"],
["153","154","154","155","155"],
["150","151","151","152","152"],
["147","148","148","149","149"],
["144","145","145","146","146"],
["141","142","142","143","143"],
["138","138","139","140","140"],
["135","136","136","137","137"],
["132","133","133","134","134"],
["129","130","130","131","131"],
["126","127","127","128","128"]

]

}

}

function colorProducto(producto){

let nombre=producto.toLowerCase()

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

let datos=racks[nombreRack]

tituloRack.innerText=nombreRack.toUpperCase()

rack.style.gridTemplateColumns=`repeat(${datos.columnas},120px)`
rack.style.gridTemplateRows=`repeat(${datos.filas},80px)`

let total=0
let ocup=0

for(let fila=datos.filas;fila>=1;fila--){

for(let col=0;col<datos.columnas;col++){

let celda=document.createElement("div")
celda.classList.add("celda")

let producto=datos.productos[col] || "Pulmón"
let texto=""

if(nombreRack==="rack1" || nombreRack==="rack2"){

if(fila===1 && datos.productos[col]){

texto=producto
celda.classList.add(colorProducto(producto))
ocup++

}

else if((fila===2 || fila===3) && datos.productos[col]){

texto="Picking"
celda.classList.add("picking")
ocup++

}

else if(datos.posiciones && fila>=4){

let posicionesColumna=datos.posiciones[col]

let index=posicionesColumna.length-(7-fila)-1

if(index>=0 && index<posicionesColumna.length){

texto="POS "+posicionesColumna[index]

}

celda.classList.add("pulmon")

}

}

else{

let posicionesColumna=datos.posiciones[col]

let index

if(datos.direccion==="down"){

index=fila-1

}else{

index=posicionesColumna.length-(datos.filas-fila)-1

}

if(index>=0 && index<posicionesColumna.length){

texto="POS "+posicionesColumna[index]

}

celda.classList.add("pulmon")

}

celda.innerText=texto

if(posicionBuscada !== "" && texto.includes(posicionBuscada)){
celda.classList.add("resaltado")
}

celda.onclick=()=>{

info.innerHTML=`

<b>Rack:</b> ${nombreRack}<br>
<b>Fila:</b> ${fila}<br>
<b>Columna:</b> ${col+1}<br>
<b>Ubicación:</b> ${texto}

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

selectorProducto.addEventListener("change",(e)=>{

productoSeleccionado=e.target.value
generarRack(selector.value)

})

function buscarPosicion(){

let input=document.getElementById("buscarPosicion").value

input=input.replace("POS","").trim()

let encontrada=null

for(let nombreRack in racks){

let datos=racks[nombreRack]

for(let col=0;col<datos.posiciones.length;col++){

let columna=datos.posiciones[col]

for(let nivel=0;nivel<columna.length;nivel++){

if(columna[nivel]===input){

encontrada={
rack:nombreRack,
columna:col+1,
nivel:nivel+1,
pos:input
}

}

}

}

}

if(encontrada){

posicionBuscada=input

selector.value=encontrada.rack

generarRack(encontrada.rack)

info.innerHTML=`

<b>Posición encontrada</b><br><br>

Rack: ${encontrada.rack}<br>
Columna: ${encontrada.columna}<br>
Nivel: ${encontrada.nivel}

`

}else{

info.innerHTML="Posición no encontrada"

}

}

generarRack("rack1")
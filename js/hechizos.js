const input_categoria = document.querySelector("#categoria");
const input_nombre = document.querySelector("#nombre");

let carrito = []; 
let carrito_compra = [];

async function read_index_json() {
    let str2 = "";

    await $.get("./db/hechizos.json", function(textString) {
        const index_json = Object.entries(textString);
        for(let i = 0; i < index_json.length ; i++) {
            let yes = 1;
            const json_a = JSON.parse(JSON.stringify(index_json[i][1]));
            if(yes == 1) {
                str2 = str2.concat(`
                <tr role="button" style="cursor:pointer" data-toggle="collapse" data-target="#hechizo_`+json_a.id+`" aria-expanded="true" aria-controls="hechizo_`+json_a.id+`" onclick="$('#hechizo_`+json_a.id+`').collapse('show')">
                    <td class="align-middle text-center" colspan="1"><img style="width:50px" src='`+json_a.icon+`'></td>
                    <td class="align-middle" colspan="2">`+json_a.hechizo+`</td>
                    <td class="align-middle" colspan="1">`+json_a.escuela+`</td>
                </tr>
                <tr id="#hechizo_`+json_a.id+`" class="collapse" aria-labelledby="hechizo_`+json_a.id+`" data-parent="#listado_datos">
                    <td colspan="4">
                        <span class="m-2 bg-white">
                            <span class="p-2 w-100">
                                aaaaaa
                            </span>
                        </span>
                    </td>
                </tr>
                `);
            }
        }
    });
    document.querySelector("#listado_datos").innerHTML = str2;
}

input_categoria.addEventListener("input", () => {
    read_index_json();
})

input_nombre.addEventListener("input", () => {
    read_index_json();
})

function reiniciarFiltros() {
    input_nombre.value = "";
    input_categoria.value = "";
    read_index_json();
}

function modal() {
    $('#equipoAleatorioModal').modal('toggle');
}

let monto_total;
let monto_total_compra;

function lista_tienda() {
    let str = "";
    monto_total = 0;
    carrito.forEach(function (item) {
        str = str.concat(`
            <div class="d-flex justify-content-between text-center">
                <div class="m-auto ms-0 text-center">
                    <b class="text-danger"></b> `+item.nombre+` <b class='text-primary'>[$`+item.precio+`]</b><b class='text-info'>[x`+item.cantidad+`]</b><b class='text-danger'>[$`+item.precio*item.cantidad+`]</b>
                </div>
                <div class="">
                    <button onclick="cantidad('`+item.nombre+`',1)" class="btn btn-success m-auto">+</button>
                    <button onclick="cantidad('`+item.nombre+`',-1)" class="btn btn-danger m-auto">-</button>
                </div>
            </div>`);
        monto_total = monto_total+(item.precio*item.cantidad);
    });
    let descuento = document.querySelector("#descuento").value;
    if(descuento == 0) {
        $("#descuento").val("");
    } else monto_total = Math.round(monto_total*(1-(descuento)/100));
    document.querySelector("#monto-total").innerHTML = '<b>Total:</b> $'+monto_total;
    if(monto_total == 0) str = 'Agrega objetos a la lista para vender';
    document.querySelector("#datos_tienda").innerHTML = str;
}

function lista_tienda_compra() {
    let str = "";
    monto_total_compra = 0;
    carrito_compra.forEach(function (item) {
        str = str.concat(`
            <div class="d-flex justify-content-between text-center">
                <div class="m-auto ms-0 text-center">
                    <b class="text-danger"></b> `+item.nombre+` <b class='text-primary'>[$`+item.precio+`]</b><b class='text-info'>[x`+item.cantidad+`]</b><b class='text-danger'>[$`+item.precio*item.cantidad+`]</b>
                </div>
                <div class="">
                    <button onclick="cantidad_compra('`+item.nombre+`',1)" class="btn btn-success m-auto">+</button>
                    <button onclick="cantidad_compra('`+item.nombre+`',-1)" class="btn btn-danger m-auto">-</button>
                </div>
            </div>`);
        monto_total_compra = monto_total_compra+(item.precio*item.cantidad);
    });
    let descuento = document.querySelector("#descuento_compra").value;
    if(descuento == 0) {
        $("#descuento_compra").val("");
    } else monto_total_compra = Math.round(monto_total_compra*(1-(descuento)/100));
    document.querySelector("#monto-total_compra").innerHTML = '<b>Total:</b> $'+monto_total_compra;
    if(monto_total_compra == 0) str = 'Agrega objetos a la lista para comprar';
    document.querySelector("#datos_tienda_compra").innerHTML = str;
}

/* Venta */

function modal_tienda_mostrar() {
    $('#ModalTienda').modal('toggle');
}

function limpiar_tienda() {
    monto_total = 0;
    carrito = [];
    lista_tienda();
    $("#descuento").val("");
}

function modal_tienda() {
    lista_tienda();
    modal_tienda_mostrar();
}

function objeto_tienda(nombre, cantidad, precio) {
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.precio = precio;
}

async function agregaritemrapido_compra(){
    var nombre = $('#inputrapido_compra').val(), 
        precio = $('#agregado_rapido option').filter(function() {return this.value == nombre;}).data('compra');

    let yes = 1;
    const cantidad = Number(1);
    if(Number(cantidad) && cantidad >= 1){
        if(precio >= 1){
            carrito_compra.forEach(function (item){
                if(item.nombre == nombre) {
                    yes = 0;
                }
            });
            if(yes == 1) carrito_compra.push(new objeto_tienda_compra(nombre, cantidad, precio));
            lista_tienda_compra();
        } else {
            $("#cantidad_agregar").css("background-color", "#cc0000");
            $("#error_div").html("Este objeto no se compra");
        }
    } else {
        $("#cantidad_agregar").css("background-color", "#cc0000");
    }
    document.querySelector("#inputrapido_compra").value = "";
}

async function agregaritemrapido(){
    var nombre = $('#inputrapido').val()
    var precio = $('#agregado_rapido option').filter(function() {return this.value == nombre;}).data('venta');

    let yes = 1;
    const cantidad = Number(1);
    if(Number(cantidad) && cantidad >= 1){
        if(precio >= 1) {
            carrito.forEach(function (item){
                if(item.nombre == nombre) {
                    yes = 0;
                }
            });
            if(yes == 1) carrito.push(new objeto_tienda(nombre, cantidad, precio));
            lista_tienda();
        } else {
            $("#cantidad_agregar").css("background-color", "#cc0000");
            $("#error_div").html("Este objeto no se vende");
        }
    } else {
        $("#cantidad_agregar").css("background-color", "#cc0000");
    }
    document.querySelector("#inputrapido").value = "";
}

function agregaritem(nombre, precio){
    let yes = 1;
    const cantidad = document.querySelector("#cantidad_agregar").value;
    if(Number(cantidad) && cantidad >= 1){
        if(precio >= 1) {
            carrito.forEach(function (item){
                if(item.nombre == nombre) {
                    yes = 0;
                }
            });
            if(yes == 1) carrito.push(new objeto_tienda(nombre, cantidad, precio));
            $('#equipoAleatorioModal').modal('toggle');
            modal_tienda();
        } else {
            $("#cantidad_agregar").css("background-color", "#cc0000");
            $("#error_div").html("Este objeto no se vende");
        }
    } else {
        $("#cantidad_agregar").css("background-color", "#cc0000");
    }
}

function cantidad(nombre, cantidad){
    carrito.forEach(function (item){
        if(item.nombre == nombre) {
            item.cantidad = Number(item.cantidad)+cantidad;
            if(Number(item.cantidad) <= 0) {
                const index = carrito.indexOf(item);
                carrito.splice(index, 1);
            }
            lista_tienda();
        }
    });
}

/* Compra */

function modal_tienda_mostrar_compra() {
    $('#ModalTiendaCompra').modal('toggle');
}

function limpiar_tienda_compra() {
    monto_total = 0;
    carrito_compra = [];
    lista_tienda_compra();
    $("#descuento_compra").val("");
}

function modal_tienda_compra() {
    lista_tienda_compra();
    modal_tienda_mostrar_compra();
}

function objeto_tienda_compra(nombre, cantidad, precio) {
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.precio = precio;
}

async function agregaritemrapido_compra(){
    var nombre = $('#inputrapido_compra').val()
    var precio = $('#agregado_rapido option').filter(function() {return this.value == nombre;}).data('compra');

    let yes = 1;
    const cantidad = Number(1);
    if(Number(cantidad) && cantidad >= 1){
        carrito_compra.forEach(function (item){
            if(item.nombre == nombre) {
                yes = 0;
            }
        });
        if(yes == 1) carrito_compra.push(new objeto_tienda_compra(nombre, cantidad, precio));
        lista_tienda_compra();
        document.querySelector("#inputrapido_compra").value = "";
    } else {
        $("#cantidad_agregar").css("background-color", "#cc0000");
    }
}

function agregaritem_compra(nombre, precio){
    let yes = 1;
    const cantidad = document.querySelector("#cantidad_agregar").value;
    if(Number(cantidad) && cantidad >= 1){
        if(precio >= 1){
            carrito_compra.forEach(function (item){
                if(item.nombre == nombre) {
                    yes = 0;
                }
            });
            if(yes == 1) carrito_compra.push(new objeto_tienda_compra(nombre, cantidad, precio));
            $('#equipoAleatorioModal').modal('toggle');
            modal_tienda_compra();
        } else {
            $("#cantidad_agregar").css("background-color", "#cc0000");
            $("#error_div").html("Este objeto no se compra");
        }
    } else {
        $("#cantidad_agregar").css("background-color", "#cc0000");
    }
}

function cantidad_compra(nombre, cantidad){
    carrito_compra.forEach(function (item_compra){
        if(item_compra.nombre == nombre) {
            item_compra.cantidad = Number(item_compra.cantidad)+cantidad;
            if(Number(item_compra.cantidad) <= 0) {
                const index = carrito_compra.indexOf(item_compra);
                carrito_compra.splice(index, 1);
            }
            lista_tienda_compra();
        }
    });
}

const dones = [
    "Joya de Don Vacío (No provee ningún Don)",
    "Joya de Sangre de Cuarzo",
    "Joya de Mano Dura",
    "Joya de Carga",
    "Joya del Glotón",
    "Joya del Perdón",
    "Joya del Fanático",
    "Joya del Avance",
    "Joya de la Afinidad Animal",
    "Joya del Guerrero Eterno",
    "Joya de la Magia",
    "Joya de la Absorción",
    "Joya del Sanguinario",
    "Joya de la Velocidad",
    "Joya del Recolector",
    "Joya del Cowboy",
    "Joya de la Pelea",
    "Joya del Especialista",
    "Joya del Completista",
    "Joya del Incompletista",
    "Joya del Ninja",
    "Joya del Ejecutor",
    "Joya de la Respuesta",
    "Joya del Guionista",
    "Joya del Liderazgo",
    "Joya de la Fortuna",
    "Joya del Imitador",
    "Joya del Desafortunado",
    "Joya de Fuerza (Solo agrega la ventaja)",
    "Joya de Agilidad (Solo agrega la ventaja)",
    "Joya de Carisma (Solo agrega la ventaja)",
    "Joya de Resistencia (Solo agrega la ventaja)",
    "Joya de Vitalidad (Solo agrega la ventaja)",
    "Joya de Percepción (Solo agrega la ventaja)",
    "Joya de Inteligencia (Solo agrega la ventaja)",
    "Joya de Suerte (Solo agrega la ventaja)",
    "Joya del Martillo (No da el equipo, solo permite portarlo)",
    "Joya del Protector (No da el equipo, solo permite portarlo)",
    "Joya de la Espada Real (No da el equipo, solo permite portarlo)",
    "Joya del Espadachín Místico (No da el equipo, solo permite portarlo)",
    "Joya del Arquero (No da el equipo, solo permite portarlo)",
    "Joya del Cosechador (No da el equipo, solo permite portarlo)",
    "Joya del Gatillo (No da el equipo, solo permite portarlo)",
    "Joya del Trabajador",
    "Joya del Cazador",
    "Joya del Minero",
    "Joya del Maestro",
    "Joya de la Negociación",
    "Joya del Fundidor",
    "Joya del Traductor",
    "Joya del Conocedor (No funciona con el del Maestro)",
    "Joya del Ahorrista",
    "Joya del Platinado",
    "Joya del Falsificador",
    "Joya del Ricachón",
    "Joya del Contratista"
]

function donaleatorio(){
    const random = Math.floor(Math.random() * dones.length);
    $('#don_aleatorio').val(random+'. '+dones[random]);
}

read_index_json();
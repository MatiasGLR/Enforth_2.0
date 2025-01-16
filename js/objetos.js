const input_categoria = document.querySelector("#categoria");
const input_nombre = document.querySelector("#nombre");

let carrito = []; 
let carrito_compra = [];

async function read_index_json() {
    let str2 = "", lista_objetos = "";

    await $.get("./db/items.json", function(textString) {
        const index_json = Object.entries(textString);
        for(let i = 0; i < index_json.length ; i++) {
            const categoria_val = String(input_categoria.value),
            nombre_val = String(input_nombre.value);
            let yes = 1;
            const json_a = JSON.parse(JSON.stringify(index_json[i][1]));
            let li_pv = 0, li_pc = 0;
            if(json_a.preciocompra) li_pc = Number(json_a.preciocompra);
            if(json_a.precioventa) li_pv = Number(json_a.precioventa);
            lista_objetos = lista_objetos.concat(`<option data-nombre='`+json_a.nombre+`' data-compra='`+li_pc+`' data-venta='`+li_pv+`'>`+json_a.nombre+`</option>`);
            if(categoria_val != "") { if(!String(json_a.categoria).toLowerCase().includes(categoria_val.toLowerCase())) yes = 0; }
            if(nombre_val != "") { if(!String(json_a.nombre).toLowerCase().includes(nombre_val.toLowerCase()) && !String(json_a.descripcion).toLowerCase().includes(nombre_val.toLowerCase()) ) yes = 0; }
            if(yes == 1) {
                str2 = str2.concat(`
                <tr>
                    <td class="align-middle" colspan="2">`+json_a.nombre+`</td>
                    <td class="align-middle text-center"><a href='#' onclick="document.querySelector('#categoria').value='`+json_a.categoria+`'; read_index_json();">`+json_a.categoria+`</a></td>
                    <td class="align-middle text-center"><button class="btn btn-light" onclick="cargar_objeto('`+json_a.nombre+`')">Más información</button></td>
                </tr>
                `);
            }
        }
    });
    document.querySelector("#agregado_rapido").innerHTML = lista_objetos;
    document.querySelector("#listado_datos").innerHTML = str2;
}

async function cargar_objeto(objeto) {
    var str = "";

    await $.get("./db/items.json", function(textString) {
        const index_json = Object.entries(textString);
        for(let i = 0; i < index_json.length ; i++) {
            const nombre_val = input_nombre.value, json_a = JSON.parse(JSON.stringify(index_json[i][1]));
            if(objeto != "" && json_a.nombre.toLowerCase().includes(objeto.toLowerCase())) {
                let vendidaen = ``, material = "", obtenida = "", creada = "", descripcion = "", creacionfinal = 0, preciocompra = "<b>Precio de compra:</b> No se compra<br>", precioventa = "<b>Precio de venta:</b> No se vende<br>";
                if(json_a.obtenidaen && json_a.obtenidaen.length > 1) obtenida = `<b>Obtenida en:</b> `+json_a.obtenidaen+`<br>`;
                if(json_a.materiales && json_a.materiales.length > 1) material = `<b>Materiales:</b> `+json_a.materiales+`<br>`;
                if(json_a.creadaen && json_a.creadaen.length > 1) creada = `<b>Creada en:</b> `+json_a.creadaen+`<br>`;
                if(json_a.preciofinal) creacionfinal = 1;
                if(json_a.preciocompra) preciocompra = `<b>Precio de compra:</b> `+json_a.preciocompra+`<br>`;
                if(json_a.precioventa) precioventa = `<b>Precio de venta:</b> `+json_a.precioventa+`<br>`;
                if(json_a.vendidaen) vendidaen = `<b>Zona de comercio:</b> `+json_a.vendidaen+`<br>`;
                if(json_a.categoria.includes("Armas")) {
                    descripcion = `
                        <div style="width:100%; background-color:#333; padding:8px; color:white;">
                            <div class="text-center">
                                <b>Datos del arma</b><br>
                            </div>
                            <div class="text-start">
                                <b>Daño. </b>`+json_a.dañoarma+`<br>
                                <b>Efecto. </b>`+json_a.efectoarma+`<br>
                                <b>Habilidad. </b><x class="text-info">`+json_a.habilidadarmat+`. </x>`+json_a.habilidadarma+`<br>
                            </div>
                        </div>
                    `; 
                } else if(json_a.categoria == "Arma a distancia") {
                    descripcion = `
                        <div style="width:100%; background-color:#333; padding:8px; color:white;">
                            <div class="text-center">
                                <b>Datos del arma</b><br>
                            </div>
                            <div class="text-start">
                                <b>Daño. </b>`+json_a.dañoarma+`<br>
                                <b>Efecto. </b>Determinado por la bala, ver efectos por material<br>
                                <b>Distancia de tiro. </b>`+json_a.distancia+`<br>
                                <b>Habilidad. </b><x class="text-info">`+json_a.habilidadarmat+`. </x>`+json_a.habilidadarma+`<br>
                            </div>
                        </div>
                    `; 
                } else descripcion = `<b>Descripción:</b><br> `+json_a.descripcion+`<br>`
                str = str.concat(`
                    <b>Categoría:</b> `+json_a.categoria+`<br>
                    `+preciocompra+`
                    `+precioventa+`
                    `+vendidaen+`<br>
                    `+material+`
                    `+creada+`
                    `+obtenida+`<br>
                    `+descripcion+`
                `);
                if(creacionfinal == 0 && json_a.materiales) str = str.concat("<br><b class='text-danger'>El precio de compra y venta de un objeto que requiera materiales, será el precio del servicio para crear el producto, deberán agregarse además, los materiales para tener el precio total</b>");
                if(creacionfinal == 1 && json_a.materiales) str = str.concat("<br><b class='text-success'>Este objeto ya tiene su precio final, no es necesario agregar los objetos adicionales</b>");
                if(json_a.categoria == "Pociones") str = str.concat("<br><b class='text-info'>Crear pociones requerirá tener el Libro de alquimia del nivel de la poción</b>");
                if(json_a.categoria == "Joyas") str = str.concat("<br><b class='text-info'>Crear joyas requerirá tener el Libro de joyería</b>");
                document.querySelector("#titulo_objeto").innerHTML = json_a.nombre;
                document.querySelector("#datos_objeto").innerHTML = str;
                document.querySelector("#botones_agregar_carrito").innerHTML = `
                        <input id="cantidad_agregar" type="number" min='0' max='1000' style="width:80px" placeholder="Cantidad">
                        <button onclick="agregaritem_compra('`+json_a.nombre+`', `+json_a.preciocompra+`)" type="button" class="btn btn-info" data-bs-dismiss="modal">A la compra</button>
                        <button onclick="agregaritem('`+json_a.nombre+`', `+json_a.precioventa+`)" type="button" class="btn btn-success" data-bs-dismiss="modal">A la venta</button>
                        <button onclick="modal()" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <br>
                        <span id="error_div"></span>`;
                modal();
                break;
            }
        }
    });

    
    
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
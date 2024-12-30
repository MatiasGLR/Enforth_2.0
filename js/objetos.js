const input_rareza = document.querySelector("#rareza");
const input_categoria = document.querySelector("#categoria");
const input_nombre = document.querySelector("#nombre");

async function read_index_json() {
    var str = "", str2 = "";

    await $.get("./db/items.json", function(textString) {
        const index_json = Object.entries(textString);
        for(let i = 0; i < index_json.length ; i++) {
            const rareza_val = input_rareza.value,
            categoria_val = input_categoria.value,
            nombre_val = input_nombre.value;
            let yes = 1;
            const json_a = JSON.parse(JSON.stringify(index_json[i][1]));
            if(rareza_val != "") { if(!(json_a.rareza == rareza_val)) yes = 0; }
            if(categoria_val != "") { if(!json_a.categoria.toLowerCase().includes(categoria_val.toLowerCase())) yes = 0; }
            if(nombre_val != "") { if(!json_a.nombre.toLowerCase().includes(nombre_val.toLowerCase()) && !json_a.descripcion.toLowerCase().includes(nombre_val.toLowerCase()) ) yes = 0; }
            if(yes == 1) {
                str2 = str2.concat(`
                <tr>
                    <td class="align-middle">`+json_a.nombre+`</td>
                    <td class="align-middle text-center">`+json_a.categoria+`</td>
                    <td class="align-middle text-center">`+json_a.rareza+`</td>
                    <td class="align-middle text-center"><button class="btn btn-light" onclick="cargar_objeto('`+json_a.nombre+`')">Más información</button></td>
                </tr>
                `);
            }
        }
    });

    document.querySelector("#listado_datos").innerHTML = str2;
}

async function cargar_objeto(objeto) {
    var str = "";

    await $.get("./db/items.json", function(textString) {
        const index_json = Object.entries(textString);
        for(let i = 0; i < index_json.length ; i++) {
            const nombre_val = input_nombre.value, json_a = JSON.parse(JSON.stringify(index_json[i][1]));
            if(objeto != "" && json_a.nombre.includes(objeto)) {
                let material = "", obtenida = "", creada = "";
                if(json_a.obtenidaen && json_a.obtenidaen.length > 1) obtenida = `<b>Obtenida en:</b> `+json_a.obtenidaen+`<br>`;
                if(json_a.materiales && json_a.materiales.length > 1) material = `<b>Materiales:</b> `+json_a.materiales+`<br>`;
                if(json_a.creadaen && json_a.creadaen.length > 1) creada = `<b>Creada en:</b> `+json_a.creadaen+`<br>`;
                str = str.concat(`
                    <b>Categoría:</b> `+json_a.categoria+`<br>
                    <b>Precio de compra:</b> `+json_a.preciocompra+`<br>
                    <b>Precio de venta:</b> `+json_a.precioventa+`<br>
                    <b>Se puede comprar en:</b> `+json_a.vendidaen+`<br><br>
                    `+material+`
                    `+creada+`
                    `+obtenida+`<br>
                    <b>Descripción:</b> `+json_a.descripcion+`<br>

                `);
                document.querySelector("#titulo_objeto").innerHTML = json_a.nombre;
                document.querySelector("#datos_objeto").innerHTML = str;
                modal();
                break;
            }
        }
    });

    
    
}

input_categoria.addEventListener("input", () => {
    read_index_json();
})

input_rareza.addEventListener("change", () => {
    read_index_json();
})

input_nombre.addEventListener("input", () => {
    read_index_json();
})

function reiniciarFiltros() {
    input_nombre.value = "";
    input_categoria.value = "";
    input_rareza.value = "";
    read_index_json();
}

function modal() {
    $('#equipoAleatorioModal').modal('toggle');
}

read_index_json();


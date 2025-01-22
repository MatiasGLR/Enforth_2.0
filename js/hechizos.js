const input_categoria = document.querySelector("#categoria");
const input_nombre = document.querySelector("#nombre");

async function read_index_json() {
    let str2 = "";

    await $.get("./db/hechizos.json", function(textString) {
        const index_json = Object.entries(textString);
        for(let i = 0; i < index_json.length ; i++) {
            let yes = 1;
            const json_a = JSON.parse(JSON.stringify(index_json[i][1]));
            if(yes == 1) {
                str2 = str2.concat(`
                <tr style="cursor:pointer" onclick="mostrardatos(`+json_a.id+`);">
                    <td class="align-middle text-center" colspan="1"><img style="width:45px" src='`+json_a.icon+`'></td>
                    <td class="align-middle" colspan="2">`+json_a.hechizo+`</td>
                    <td class="align-middle" colspan="1">`+json_a.escuela+`</td>
                </tr>
                `);
            }
        }
    });
    document.querySelector("#listado_datos").innerHTML = str2;
}

async function mostrardatos(id) {
    await $.get("./db/hechizos.json", function(textString) {
        const index_json = Object.entries(textString);
        for(let i = 0; i < index_json.length ; i++) {
            const json_a = JSON.parse(JSON.stringify(index_json[i][1]));
            if(id == json_a.id){
                let yes = 1;
                if(yes == 1) {
                    let costouso = "", distancia = "", area = "", efecto = "";
                    if(json_a.costouso && json_a.costouso.length > 0) costouso = "<b>Costo de uso.</b> "+json_a.costouso+"";
                    if(json_a.distancia && json_a.distancia.length > 0) distancia = "<br><b>Distancia de efecto.</b> "+json_a.distancia+"";
                    if(json_a.area && json_a.area.length > 0) area = "<br><b>Area de efecto.</b> "+json_a.area+"";
                    if(json_a.efecto && json_a.efecto.length > 0) efecto = "<br><b>Efecto.</b> "+json_a.efecto+"";
                    $("#titulo_objeto").html(json_a.hechizo);
                    $("#datos_objeto").html(`
                        <div class="w-100 text-center">
                            <img src=`+json_a.icon+`><br>
                            <b>`+json_a.escuela+`</b>
                        </div>
                        <br>
                        <div style="margin: 0; text-align: justify; text-justify: inter-word;"><b>Descripción.</b> `+json_a.descripcion+`</div>
                        `+costouso+`
                        `+distancia+`
                        `+area+`
                        `+efecto+`
                    `);
                    modal();
                }
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

read_index_json();
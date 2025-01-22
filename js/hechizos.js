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
                    let costouso = "", distancia = "", area = "";
                    $("#titulo_objeto").html(json_a.hechizo);
                    $("#datos_objeto").html(`
                        <div class="w-100 text-center">
                            <img src=`+json_a.icon+`><br>
                            <b>`+json_a.escuela+`</b>
                        </div>
                        <br>
                        <b>Descripción.</b> `+json_a.descripcion+`
                        `+costouso+`
                        `+distancia+`
                        `+area+`
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
const input_categoria = document.querySelector("#categoria");
const input_nombre = document.querySelector("#nombre");
const input_tipo = document.querySelector("#tipo");

async function read_index_json() {
    let str2 = "";

    await $.get("./db/bestiario.json", function(textString) {
        const index_json = Object.entries(textString);
        for(let i = 0; i < index_json.length ; i++) {
            let yes = 1;
            const json_a = JSON.parse(JSON.stringify(index_json[i][1])), nom = input_nombre.value;
            if(!json_a.nombre.toLowerCase().includes(nom.toLowerCase())) yes = 0;
            if(yes == 1) {
                str2 = str2.concat(`
                <tr style="cursor:pointer" onclick="mostrardatos('`+json_a.nombre+`');">
                    <td class="align-middle text-center" colspan="1"><img style="width:80px" src='./files/bestiario/`+json_a.nombre+`.png'></td>
                    <td class="align-middle" colspan="2">`+json_a.nombre+`</td>
                </tr>
                `);
            }
        }
    });
    document.querySelector("#listado_datos").innerHTML = str2;
}

async function mostrardatos(id) {
    await $.get("./db/bestiario.json", function(textString) {
        const index_json = Object.entries(textString);
        for(let i = 0; i < index_json.length ; i++) {
            const json_a = JSON.parse(JSON.stringify(index_json[i][1]));
            if(id == json_a.nombre){
                $("#titulo_objeto").html(json_a.nombre);
                $.get("./files/bestiario/"+json_a.nombre+".html", function(textString2) {
                    $("#datos_objeto").html(textString2);
                    $("#imagen-animal").html("<img style='width:200px' src='./files/bestiario/"+json_a.nombre+".png' alt='"+json_a.nombre+"'>");
                });
                modal();
                break;
            }
        }
    });
}   
input_nombre.addEventListener("input", () => {
    read_index_json();
})

function reiniciarFiltros() {
    input_nombre.value = "";
    read_index_json();
}

function modal() {
    $('#equipoAleatorioModal').modal('toggle');
}

read_index_json();
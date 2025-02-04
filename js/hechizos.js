const input_categoria = document.querySelector("#categoria");
const input_nombre = document.querySelector("#nombre");
const input_tipo = document.querySelector("#tipo");

async function read_index_json() {
    let str2 = "";

    await $.get("./db/hechizos.json", function(textString) {
        const index_json = Object.entries(textString);
        for(let i = 0; i < index_json.length ; i++) {
            let yes = 1;
            const json_a = JSON.parse(JSON.stringify(index_json[i][1])), cat = input_categoria.value, nom = input_nombre.value, tipo = input_tipo.value;
            if(!json_a.hechizo.toLowerCase().includes(nom.toLowerCase())) yes = 0;
            if(!json_a.escuela.toLowerCase().includes(cat.toLowerCase())) yes = 0;
            if(!json_a.tipo.toLowerCase().includes(tipo.toLowerCase())) yes = 0;
            if(yes == 1) {
                str2 = str2.concat(`
                <tr style="cursor:pointer" onclick="mostrardatos('`+json_a.hechizo+`');">
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
            if(id == json_a.hechizo){
                let yes = 1;
                if(yes == 1) {
                    let costouso = "", distancia = "", area = "", efecto = "", gif = "", requiere = "";
                    if(json_a.costouso && json_a.costouso.length > 0) costouso = "<b>Costo de uso.</b> "+json_a.costouso+"";
                    if(json_a.distancia && json_a.distancia.length > 0) distancia = "<br><b>Distancia de efecto.</b> "+json_a.distancia+"";
                    if(json_a.efecto && json_a.efecto.length > 0) efecto = "<br><b>Efecto.</b> "+json_a.efecto+"";
                    if(json_a.requiere && json_a.requiere.length > 0) requiere = "<br><b>Requerimiento.</b> "+json_a.requiere+"";
                    if(json_a.gif && json_a.gif.length > 0) gif = "<img style='width:100%; margin-top:10px' src='"+json_a.gif+"'>"
                    if(json_a.area && json_a.area.length > 0) {
                        if(json_a.area == "3x3") {
                            area = `
                            <span class="text-center">
                                <br><b>Area de efecto (La zona gris representa al jugador):</b>
                            
                                <div class="grid z33 gridtable justify-content-center">
                                    <div class="cell"></div><div class="cell"></div><div class="cell"></div>
                                    <div class="cell"></div><div class="cell" style="background-color:gray;"></div><div class="cell"></div>
                                    <div class="cell"></div><div class="cell"></div><div class="cell"></div>
                                </div>
                            </span>
                        `
                        }
                        if(json_a.area == "5x5") {
                            area = `
                            <span class="text-center">
                                <br><b>Area de efecto (La zona gris representa al jugador):</b>
                            
                                <div class="grid z55 gridtable justify-content-center">
                                    <div class="cell"></div><div class="cell"></div><div class="cell"></div><div class="cell"></div><div class="cell"></div>
                                    <div class="cell"></div><div class="cell"></div><div class="cell"></div><div class="cell"></div><div class="cell"></div>
                                    <div class="cell"></div><div class="cell"></div><div class="cell" style="background-color:gray;"></div><div class="cell"></div><div class="cell"></div>
                                    <div class="cell"></div><div class="cell"></div><div class="cell"></div><div class="cell"></div><div class="cell"></div>
                                    <div class="cell"></div><div class="cell"></div><div class="cell"></div><div class="cell"></div><div class="cell"></div>
                                </div>
                            </span>
                        `
                        }
                        if(json_a.area == "3x1") {
                            area = `
                            <span class="text-center">
                                <br><b>Area de efecto (La zona gris representa al jugador):</b>
                            
                                <div class="grid z33 gridtable justify-content-center">
                                    <div class="cell"></div><div class="cell"></div><div class="cell"></div>
                                    <div class="cell" style="border:none"></div><div class="cell" style="background-color:gray;"></div><div class="cell" style="border:none"></div>
                                </div>
                            </span>
                        `
                        }
                    }
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
                        `+efecto+`
                        `+requiere+`
                        `+area+`
                        `+gif+`
                    `);
                    modal();
                }
                break;
            }
        }
    });
}   

input_nombre.addEventListener("input", () => {
    read_index_json();
})

input_tipo.addEventListener("change", () => {
    read_index_json();
})

function reiniciarFiltros() {
    input_nombre.value = "";
    input_categoria.value = "";
    input_tipo.value = "";
    read_index_json();
}

function modal() {
    $('#equipoAleatorioModal').modal('toggle');
}

read_index_json();
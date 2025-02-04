async function read_index_json() {
    let str2 = "";

    await $.get("./db/lore.json", function(textString) {
        const index_json = Object.entries(textString);
        for(let i = 0; i < index_json.length ; i++) {
            let yes = 1;
            const json_a = JSON.parse(JSON.stringify(index_json[i][1]));
            if(yes == 1) {
                str2 = str2.concat(`
                <div id="`+json_a.nombre+`" class="w-100 titulo mb-4 bg-white" style="background-image:url(./files/lore/`+json_a.imagen+`); background-position: `+json_a.posicion+`; background-size: `+json_a.zoom+`;">
                    <h1 class="ps-4">`+json_a.nombre+`</h1>
                </div>
                `);
            }
        }
    });
    document.querySelector("#listado_datos").innerHTML = str2;
}

read_index_json();
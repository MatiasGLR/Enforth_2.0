async function read_index_json() {
    var str = "", str2 = "";

    str = `<div class="">`

    await $.get("./db/index.json", function(textString) {
        const index_json = Object.entries(textString);
        for(let i = 0; i < index_json.length ; i++) {
            const json_a = JSON.parse(JSON.stringify(index_json[i][1]));
            str2 = str2.concat(`
            <div class="card bg-dark text-white" style="border-radius:0">
                <div id="cabecera_`+i+`" class="cabecera_main">
                    <a id="title_button_info" class="" data-toggle="collapse" data-target="#`+json_a.titulo+`" aria-expanded="true" aria-controls="`+json_a.titulo+`">
                        <h5 id="title_info" class="mb-0" style="padding: 10px 0 10px 20%">
                            `+json_a.titulo+`
                        </h5>
                    </a>
                </div>
                <div id="`+json_a.titulo+`" class="collapse" aria-labelledby="cabecera_`+i+`" data-parent="#listado_datos">
                    <div class="card-body text-white">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                    </div>
                </div>
            </div>
            `);
        }
    });

    str = str.concat(str2,`</div>`);

    document.querySelector("#listado_datos").innerHTML = str;
    console.log(str);
}

read_index_json();
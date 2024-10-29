async function read_index_json() {
    var str = "", str2 = "";

    str = `<div class="d-flex flex-wrap justify-content-around">`

    await $.get("./db/index.json", function(textString) {
        const index_json = Object.entries(textString);
        for(let i = 0; i < index_json.length ; i++) {
            const json_a = JSON.parse(JSON.stringify(index_json[i][1]));
            str2 = str2.concat(`
                <a href="`+json_a.file+`">
                    <div class="card mb-3 mt-3 text-center bg-primary text-white" style="width:13rem; border-radius:10px 0px">
                        <img style="height:11rem; border-radius:5px 5px 0px 0px; object-fit:cover; object-position: 50% 0%;" src="`+json_a.imagen+`" alt="Card image cap">
                        <div style="height:10%;">
                            <h5 id="title_cat_index" class="card-title pt-2 text-white" style="overflow:hidden">`+json_a.titulo+`</h5>
                        </div>
                    </div>
                </a>
            `);
        }
    });

    str = str.concat(str2,`</div>`);

    document.querySelector("#main").innerHTML = str;
    console.log(str);
}

read_index_json();
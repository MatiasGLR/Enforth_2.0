const raza1_box = document.querySelector("#lista_raza1");
const raza2_box = document.querySelector("#lista_raza2");

async function cargar_razas() {
    var str2 = `<div class="">`;

    let nombreraza1="",
        nombreraza2="",
        datosraza1="",
        datosraza2="",
        imagenraza1="",
        imagenraza2="",
        estadisticasraza1="",
        estadisticasraza2="",
        habilidad1_1="",
        habilidad2_1="",
        habilidad3_1="",
        habilidad4_1="",
        habilidad5_1="",
        habilidad1_2="",
        habilidad2_2="",
        habilidad3_2="",
        habilidad4_2="",
        habilidad5_2="",
        raza1det=0,
        raza2det=0,
        raza1 = raza1_box.value,
        raza2 = raza2_box.value,
        str_imagenes = "";
    


    await $.get("./db/razas.json", function(textString) {
        const index_json = Object.entries(textString);
        str_imagenes = "";
        raza1det = 0;
        raza2det = 0;
        for(let i = 0; i < index_json.length ; i++) {
            const json_a = JSON.parse(JSON.stringify(index_json[i][1]));
            if(raza1det == 0 && json_a.Nombre == raza1) {
                console.log(json_a.Nombre+"/"+raza1);
                nombreraza1 = json_a.Nombre;
                datosraza1 = json_a.Datos;
                imagenraza1 = json_a.Imagen;
                estadisticasraza1 = json_a.Estadisticas;
                habilidad1_1 = json_a.Habilidad1;
                habilidad2_1 = json_a.Habilidad2;
                habilidad3_1 = json_a.Habilidad3;
                habilidad4_1 = json_a.Habilidad4;
                habilidad5_1 = json_a.Habilidad5;
                str_imagenes = str_imagenes.concat(`<img src="./files/personaje/`+imagenraza1+`" style="width:25%" alt="Imagen">`);
                raza1det = 1;
            }
            else if(raza2det == 0 && json_a.Nombre == raza2) {
                console.log(json_a.Nombre+"/"+raza2);
                nombreraza2 = json_a.Nombre;
                datosraza2 = json_a.Datos;
                imagenraza2 = json_a.Imagen;
                estadisticasraza2 = json_a.Estadisticas;
                habilidad1_2 = json_a.Habilidad1;
                habilidad2_2 = json_a.Habilidad2;
                habilidad3_2 = json_a.Habilidad3;
                habilidad4_2 = json_a.Habilidad4;
                habilidad5_2 = json_a.Habilidad5;
                str_imagenes = str_imagenes.concat(`<img src="./files/personaje/`+imagenraza2+`" style="width:25%" alt="Imagen">`);
                raza2det = 1;
            }
            if(raza1det == 0) nombreraza1 = "";
            if(raza2det == 0) nombreraza2 = "";
        }
    });

    document.querySelector("#raza-imagenes").innerHTML = str_imagenes;


    str2 = str2.concat(str2,`</div>`);
}
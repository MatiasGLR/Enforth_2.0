const raza1_box = document.querySelector("#lista_raza1");
const raza2_box = document.querySelector("#lista_raza2");
const profesion_box = document.querySelector("#lista_profesiones");
const maldicion_box = document.querySelector("#lista_maldiciones");
const clases_box = document.querySelector("#lista_clases");

async function cambiar_lista_clases(){
    const ver_clases_especiales = document.querySelector("#ver_clases_especiales");
    if(ver_clases_especiales.checked) {
        $("#lista_clases").html('<option value="">Elegir clase</option>\
            <option value="guerrero" style="background-color:rgb(255, 255, 255);">Guerrero</option>\
            <option value="picaro" style="background-color:rgb(255, 255, 255);">Picaro</option>\
            <option value="clerigo" style="background-color:rgb(255, 255, 255);">Clérigo</option>\
            <option value="ranger" style="background-color:rgb(255, 255, 255);">Ranger</option>\
            <option value="luchador" style="background-color:rgb(255, 255, 255);">Luchador</option>\
            <option value="mago" style="background-color:rgb(255, 255, 255);">Mago</option>\
            <option value="artificiero" style="background-color:rgb(255, 255, 255);;">Artificiero</option>\
            <option value="aracnomante" style="background-color:rgb(241, 137, 215);">Aracnomante</option>\
            <option value="dragonslayer" style="background-color:rgb(241, 179, 137);">Dragonslayer</option>\
            <option value="dragonmaster" style="background-color:rgb(241, 179, 137);">Dragonmaster</option>\
            <option value="berserker" style="background-color:rgb(241, 137, 137);">Berserker</option>\
            <option value="cazador" style="background-color:rgb(137, 161, 241);">Cazador</option>\
            <option value="corruptor" style="background-color:rgb(241, 137, 215);">Corruptor</option>\
            <option value="pirata" style="background-color:rgb(241, 137, 137);">Pirata</option>\
            <option value="mosquetero" style="background-color:rgb(137, 161, 241);">Mosquetero</option>\
            <option value="necromante" style="background-color:rgb(241, 137, 215);">Necromante</option>\
            <option value="ninja" style="background-color:rgb(241, 137, 137);">Ninja</option>');
    } else {
        $("#lista_clases").html('<option value="">Elegir clase</option>\
            <option value="guerrero" style="background-color:rgb(255, 255, 255);">Guerrero</option>\
            <option value="picaro" style="background-color:rgb(255, 255, 255);">Picaro</option>\
            <option value="clerigo" style="background-color:rgb(255, 255, 255);">Clérigo</option>\
            <option value="ranger" style="background-color:rgb(255, 255, 255);">Ranger</option>\
            <option value="luchador" style="background-color:rgb(255, 255, 255);">Luchador</option>\
            <option value="mago" style="background-color:rgb(255, 255, 255);">Mago</option>\
            <option value="artificiero" style="background-color:rgb(255, 255, 255);;">Artificiero</option>');
    }
}

async function cargar_clase(){
    let clase = clases_box.value;

    if(clase == "") return $("#clase-info").html("");

    await $.get("./files/clases/"+clase+".html", function(textString) {
        $("#clase-info").html(textString);
    });
}

async function cargar_maldiciones(){
    let maldicion = maldicion_box.value;

    if(maldicion == "") return $("#maldicion-info").html("");

    await $.get("./db/maldiciones/"+maldicion+".html", function(textString) {
        $("#maldicion-info").html(textString);
    });
}

async function cargar_profesiones(){
    let profesion = profesion_box.value;

    if(profesion == "") return $("#profesion-info").html("");

    await $.get("./db/profesiones/"+profesion+".html", function(textString) {
        $("#profesion-info").html(textString);
    });
}

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
        habilidad0_1="",
        habilidad1_1="",
        habilidad2_1="",
        habilidad3_1="",
        habilidad4_1="",
        habilidad5_1="",
        habilidad0_2="",
        habilidad1_2="",
        habilidad2_2="",
        habilidad3_2="",
        habilidad4_2="",
        habilidad5_2="",
        raza1det=0,
        raza2det=0,
        raza1 = raza1_box.value,
        raza2 = raza2_box.value,
        str_imagenes = "",
        str_datos = "",
        str_stats = "",
        str_skills = "";
        str_desc = "";


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
                habilidad0_1 = json_a.HabilidadP;
                habilidad1_1 = json_a.Habilidad1;
                habilidad2_1 = json_a.Habilidad2;
                habilidad3_1 = json_a.Habilidad3;
                habilidad4_1 = json_a.Habilidad4;
                habilidad5_1 = json_a.Habilidad5;
                if(str_datos == "") str_datos = "<b class='text-warning'>Datos de raza</b><br>";
                if(str_stats == "") str_stats = "<b class='text-warning'>Estadisticas</b><br>";
                if(str_skills == "") str_skills = "<b class='text-warning'>Habilidades</b><br>";
                str_desc = str_desc.concat("<br><b class='text-warning'>Descripción del "+json_a.Nombre+"</b><br>"+json_a.Descripcion+"<br>");
                str_imagenes = str_imagenes.concat(`<img src="./files/personaje/`+imagenraza1+`" style="width:250px; margin:4px" alt="Imagen">`);
                str_datos = str_datos.concat(datosraza1+`<br><br>`);
                str_stats = str_stats.concat(estadisticasraza1+`<br><br>`);
                raza1det = 1;
            }
            else if(raza2det == 0 && json_a.Nombre == raza2) {
                console.log(json_a.Nombre+"/"+raza2);
                nombreraza2 = json_a.Nombre;
                datosraza2 = json_a.Datos;
                imagenraza2 = json_a.Imagen;
                estadisticasraza2 = json_a.Estadisticas;
                habilidad0_2 = json_a.HabilidadP;
                habilidad1_2 = json_a.Habilidad1;
                habilidad2_2 = json_a.Habilidad2;
                habilidad3_2 = json_a.Habilidad3;
                habilidad4_2 = json_a.Habilidad4;
                habilidad5_2 = json_a.Habilidad5;
                if(str_datos == "") str_datos = "<b class='text-warning'>Datos de raza</b><br>";
                if(str_stats == "") str_stats = "<b class='text-warning'>Estadisticas</b><br>";
                if(str_skills == "") str_skills = "<b class='text-warning'>Habilidades</b><br>";
                str_desc = str_desc.concat("<br><b class='text-warning'>Descripción del "+json_a.Nombre+"</b><br>"+json_a.Descripcion+"<br>");
                str_imagenes = str_imagenes.concat(`<img src="./files/personaje/`+imagenraza2+`" style="width:250px; margin:4px" alt="Imagen">`);
                str_datos = str_datos.concat(datosraza2+`<br><br>`);
                str_stats = str_stats.concat(estadisticasraza2+`<br><br>`);
                raza2det = 1;
            }
            if(raza1det == 0) nombreraza1="";
            if(raza2det == 0) nombreraza2="";
        }
    });

    if(raza1det != 0 || raza2det != 0) {
        str_skills = str_skills.concat(`<b class="text-info">Habilidad Pasiva</b><br>`);
        if(raza1det) str_skills = str_skills.concat(habilidad0_1+`<br>`);
        if(raza2det) str_skills = str_skills.concat(habilidad0_2+`<br>`);
        str_skills = str_skills.concat(`<b class="text-info">Nivel 1</b><br>`);
        if(raza1det) str_skills = str_skills.concat(habilidad1_1+`<br>`);
        if(raza2det) str_skills = str_skills.concat(habilidad1_2+`<br>`);
        str_skills = str_skills.concat(`<b class="text-info">Nivel 2</b><br>`);
        if(raza1det) str_skills = str_skills.concat(habilidad2_1+`<br>`);
        if(raza2det) str_skills = str_skills.concat(habilidad2_2+`<br>`);
        str_skills = str_skills.concat(`<b class="text-info">Nivel 3</b><br>`);
        if(raza1det) str_skills = str_skills.concat(habilidad3_1+`<br>`);
        if(raza2det) str_skills = str_skills.concat(habilidad3_2+`<br>`);
        str_skills = str_skills.concat(`<b class="text-info">Nivel 4</b><br>`);
        if(raza1det) str_skills = str_skills.concat(habilidad4_1+`<br>`);
        if(raza2det) str_skills = str_skills.concat(habilidad4_2+`<br>`);
        str_skills = str_skills.concat(`<b class="text-info">Nivel 5</b><br>`);
        if(raza1det) str_skills = str_skills.concat(habilidad5_1+`<br>`);
        if(raza2det) str_skills = str_skills.concat(habilidad5_2+`<br>`);
    }

    document.querySelector("#raza-imagenes").innerHTML = str_imagenes;
    document.querySelector("#raza-datos").innerHTML = str_datos;
    document.querySelector("#raza-estadisticas").innerHTML = str_stats;
    document.querySelector("#raza-habilidades").innerHTML = str_skills;
    document.querySelector("#raza-descripcion").innerHTML = str_desc;

    str2 = str2.concat(str2,`</div>`);
}
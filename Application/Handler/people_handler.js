const axios = require("axios");
const fs = require("fs");
const util = require("util");
const urlGeneral = require("../../constantes");
const People = require('../../Domain/Entity/entityPeople');
const servicesPeople = require('../services/people_services');

exports.info = async (req, res) => {
    try {
        const url = urlGeneral.urlPeople();
        let response = await axios.get(url);

        const personaData = response.data;

        response = await axios.get(response.data.homeworld);
        personaData.homeworldName = response.data.name;

        const registro = new People.models.cabeceras

        const people = await servicesPeople.createPeople({
            Nombre: personaData.name,
            Altura: personaData.height,
            Masa: personaData.mass,
            Color_pelo: personaData.hair_color,
            Color_ojos: personaData.eye_color,
            Genero: personaData.gender,
            Anio_Nacimiento: personaData.birth_year,
            Mundo: personaData.homeworldName
        });

        const save =  res.send(registro.single(people, req._id));
        let dta = await servicesPeople.getPeople(save._id);
        
        const md = renderMarkdown(dta);
        await writeFileAsync("data.persona.md", md);
        console.log("Se creo el archivo con los datos de la persona")
    }
    catch (error) {
        console.log(error);
    }

  };


function renderMarkdown(data){
    return `# ${data.name} Facts
    ## Info

    **Altura:** ${data.height} cm

    **Masa:** ${data.mass} kg

    **Color de Pelo:** ${data.hair_color}

    **Color de Ojos:** ${data.eye_color}

    **Genero:** ${data.gender}

    **Anio Nacimiento:** ${data.birth_year}

    **Mundo Natal:** ${data.homeworldName}
    `;
}
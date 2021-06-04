const axios = require("axios");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

exports.info = async () => {
    try {
        const url = "https://swapi.py4e.com/api/people/1";
        let response = await axios.get(url);

        const personaData = response.data;

        response = await axios.get(response.data.homeworld);
        personaData.homeworldName = response.data.name;

        const md = renderMarkdown(personaData);
        await writeFileAsync("data.persona.md", md);
        console.log("Se creo el archivo con los datos de la persona")
    } catch (error) {
        console.log(error);
    }
};

exports.guardar = async() => {

    const STAR_WARS = models('Planets')

    try {
        const url = "https://swapi.py4e.com/api/planets/"
        axios({
            method: 'post',
            url: url,
            data: {
              id: 1,
            }
          })
          .then((response) => {
            console.log(response)
            const planetsData = response.data;

            /* Valida si existe el registro */
            let registro
            if (planetsData.surface_water) {
                registro = await STAR_WARS.cabeceras.findOne({ superficie_del_agua:planetsData.surface_water})
                if (!registro) return response.error(`No existe registro con  '${planetsData.surface_water}'.`)
            } else {
                registro = new STAR_WARS.cabeceras
            }

            registro.set({
                clima: planetsData.climate,
                diametro: planetsData.diameter,
                gravedad: planetsData.gravity,
                nombre: planetsData.name,
                periodo_orbital: planetsData.orbital_period,
                poblacion: planetsData.population,
                periodo_de_rotacion: planetsData.rotation_period,
                superficie_del_agua: planetsData.surface_water,
                terreno: planetsData.terrain
            })

            await registro.save();

          }, (error) => {
            console.log(error);
          });
    } catch (error) {
        
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

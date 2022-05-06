const axios = require("axios");
const fs = require("fs");
const util = require("util");
const servicesPlanet = require('../services/planets_services');
const STAR_WARS = require('../../Domain/Entity/entityPlanets');
const urlGeneral = require("../../constantes");

const writeFileAsync = util.promisify(fs.writeFile);

exports.guardar = async() => {

    try {
        const url = urlGeneral.urlPlanets();
        axios({
            method: 'post',
            url: url,
            data: {
              id: 1,
            }
          })
          .then((response) => {
            const planetsData = response.data;

            /* Valida si existe el registro */
            let registro
            if (planetsData.surface_water) {
                registro =  await servicesPlanet.getSTAR_WARS(planetsData.surface_water);
                if (!registro) return response.error(`No existe registro con  '${planetsData.surface_water}'.`)
            } else {
                registro = new STAR_WARS.models.cabeceras

                await servicesPlanet.createPlanets({
                  clima: planetsData.climate,
                  diametro: planetsData.diameter,
                  gravedad: planetsData.gravity,
                  nombre: planetsData.name,
                  periodo_orbital: planetsData.orbital_period,
                  poblacion: planetsData.population,
                  periodo_de_rotacion: planetsData.rotation_period,
                  superficie_del_agua: planetsData.surface_water,
                  terreno: planetsData.terrain
                });
            }
          }, (error) => {
            console.log(error);
          });
    } catch (error) {
        
    }
};


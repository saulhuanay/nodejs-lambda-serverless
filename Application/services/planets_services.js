
const STAR_WARS = require('../../Domain/Entity/entityPlanets');

module.exports = {

    async getSTAR_WARS(agua) {
      return new Promise((resolve, reject) => STAR_WARS.models('Planets')
        .findOne({ superficie_del_agua: agua}).exec((err, docs) => {
          if (err) return reject(err);
          return resolve(docs);
        }));
    },

    async createPlanets(planets) {
        return new Promise((resolve, reject) => STAR_WARS.models('Planets')
        .insert(planets, (err, docs) => {
          if (err) return reject(err);
          return resolve(docs);
        }));
      },
    
};

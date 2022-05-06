
const People = require('../../Domain/Entity/entityPeople');

module.exports = {

    async getPeople(id) {
      return new Promise((resolve, reject) => People.models('People')
        .findOne({ superficie_del_agua: agua}).exec((err, docs) => {
          if (err) return reject(err);
          return resolve(docs);
        }));
    },

    async createPeople(people) {
        return new Promise((resolve, reject) => people.models('People')
        .insert(planets, (err, docs) => {
          if (err) return reject(err);
          return resolve(docs);
        }));
      },
    
};
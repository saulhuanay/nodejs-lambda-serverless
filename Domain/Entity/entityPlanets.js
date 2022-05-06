const { Types } = require('mongoose').Schema

module.exports = {
	models: {
        name:'Planets',
		cabeceras: {
			fields: {
                clima: String,
                diametro: String,
                gravedad: String,
                nombre: String,
                periodo_orbital: String,
                poblacion: String,
                periodo_de_rotacion: String,
                superficie_del_agua: String,
                terreno: String
			},
		}
	},
}
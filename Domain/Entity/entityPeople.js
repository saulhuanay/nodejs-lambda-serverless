const { Types } = require('mongoose').Schema

module.exports = {
	models: {
        name:'People',
		cabeceras: {
			fields: {
                Nombre: String,
                Altura: String,
                Masa: String,
                Color_pelo: String,
                Color_ojos: String,
                Genero: String,
                Anio_Nacimiento: Date,
                Mundo: String
			},
		}
	},
}

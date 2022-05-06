const path = require('path')
const expressSession = require('express-session')
const SessionEstrategy = require('session-file-store')(expressSession)

const dbConnections = {
	/* Conexión a Mongo */
	main: {
		name: 'main',
		driver: 'mongodb',
		uri: 'mongodb+srv://sa:B1admin23@cluster0-souu7.gcp.mongodb.net/habacuc?retryWrites=true&w=majority',
		required: true,
		enable: true,
    }
    
}

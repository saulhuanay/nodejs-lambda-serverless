const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const md5 = require('md5')

/* Objeto glogbal de rutas */
global.paths = {}
const paths = global.paths
const defineRoutes = () => {
	paths.libs = path.join(paths.root, 'libs')
	paths.core = path.join(paths.root, 'core')

	/* Si algunas rutas no existen, se crean */
	if (!fs.existsSync(paths.logs)) fs.mkdirSync(paths.logs)
}

if (process.versions.nw) {
	const nwGui = require('nw.gui')
	global.nwGui = nwGui
	paths.root = path.join(__dirname, 'app')
	defineRoutes()
	const { App, Window } = nwGui
	try {
		global.appMode = 'desktop'

		Window.open('app/core/loading.html', {
			width: 200,
			height: 300,
			position: 'center',
			resizable: false,
			frame: false
		}, loadingWindow => {
			loadingWindow.on('loaded', () => {
				setTimeout(() => {
					require('./webServer.js').then(async () => {
						/* Objeto global de la sesión en el programa de escritorio */
						global.session = {}

						/* Desktop request */
						global.desktopRequest = async (modulePath, body, files, context) => {
							if (Habacuc.getType(files) === 'Object') {
								for (const file in files) {
									if (Habacuc.getType(files[file]) === 'Array') {
										if (files[file].length === 1) {
											files[file] = files[file][0]
										}
									}
								}
							}

							let html
							const req = {
								path: modulePath,
								authenticatedUser: global.authenticatedUser,
								session: global.session,
								body,
								files
							}
							const res = {
								render: async (fileName, data) => {
									html = await ejs.renderFile(path.join(paths.views, fileName), data)
								}
							}
							const response = await global.dynamicRoute(req, res)

							if (response.fileName && response.filePath) {
								const saveDialog = context.document.querySelector('#saveDialog')
								saveDialog.value = ''
								saveDialog.setAttribute('nwsaveas', response.fileName)
								saveDialog.addEventListener('change', function (evt) {
									fs.copyFileSync(response.filePath, this.value)
									saveDialog.removeEventListener('change', saveEvent)
								}, false)
								saveDialog.click()
							}

							return html || response
						}

						const response = await global.desktopRequest('/')

						if (typeof response === 'string') {
							const fileName = `${md5(new Date)}.html`
							const filePath = path.join(paths.uploads, fileName)
							fs.writeFileSync(filePath, response, { encoding: 'utf8' })
							Window.open(`app/uploads/${fileName}`, {
								width: 800,
								height: 600,
								position: 'center'
							}, mainWindow => {
								loadingWindow.close()
							})
						} else {
							global.alert(`El llamado a "defaultRoute" (valor actual "${config.server.defaultRoute}") debe realizar un llamado a la función "render" en "this.res"`)
							App.quit()
						}
					})
				}, 1000)
			})
			// loadingWindow.show()
		})
	} catch (err) {
		global.alert(err)
		App.quit()
	}
} else {
	paths.root = path.join(__dirname, '..')
	defineRoutes()
	global.appMode = 'webServer'
	require('./webServer.js')
}
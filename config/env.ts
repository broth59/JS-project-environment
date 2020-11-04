import { Container } from "typescript-ioc"
import 'colors'
import { NamespaceConfiguration } from 'typescript-ioc/dist/model'


/* Define enviroment Profiles */
export enum Profile {
    DEVELOPMENT = "PROFILE.DEVELOPMENT",
    TEST        = "PROFILE.TEST",
    PRODUCTION  = "PROFILE.PRODUNCTION",
} 

/* Define environment keys */
export namespace ENVKEY {
	
	export namespace CLIENT {

		export enum WEBPACK {
			//Environment 
			SHOULD_BE_VERBOS    = '@env/client/webpack/shoud_be_specific',
			//Build
			COMPILER_CONFIG     = '@env/client/webpack/compiler_config',
			CSS_PROCESSORS      = '@env/client/webpack/css_processors',
			HTML_PLUGINS        = '@env/client/webpack/html_plugins',
			//Watch
			SERVER_CONFIG       = '@env/client/webpack/server_config',
			PORT       			= '@env/client/webpack/port',
			HOST       			= '@env/client/webpack/host',

		}
	}
	
	   
	export namespace SERVER {

		export const PORT 	= '@env/server/port'
		export const HOST 	= '@env/server/host'
		export const DOMAIN = '@env/server/domain'
		export const PUBLIC_PATH = '@env/server/public_path'
		
		export namespace EXPRESS {

			export const APP = '@env/server/express/app'
		
		}

		export namespace WEBPACK {
			export const COMPILER_CONFIG = '@env/server/webpack/compiler_config'
		
		}
		
	}
	
}

const environment = {
    namespace : {
        [Profile.DEVELOPMENT] : [
			{ bindName: ENVKEY.CLIENT.WEBPACK.SHOULD_BE_VERBOS , 	to: true },
			{ bindName: ENVKEY.CLIENT.WEBPACK.HOST , 				to: 'localhost' },
			{ bindName: ENVKEY.CLIENT.WEBPACK.PORT , 				to: 3010 },			

			{ bindName: ENVKEY.SERVER.HOST , 				to: 'localhost' },
			{ bindName: ENVKEY.SERVER.DOMAIN , 				to: 'http://localhost' },
			{ bindName: ENVKEY.SERVER.PORT , 				to: 3020 },
			{ bindName: ENVKEY.SERVER.PUBLIC_PATH , 		to: '/' },
        ],
        [Profile.TEST] : [
			{ bindName: ENVKEY.CLIENT.WEBPACK.SHOULD_BE_VERBOS , 	to: false },
			{ bindName: ENVKEY.CLIENT.WEBPACK.HOST , 				to: 'localhost' },
			{ bindName: ENVKEY.CLIENT.WEBPACK.PORT , 				to: 3010 },

			{ bindName: ENVKEY.SERVER.HOST , 				to: 'localhost' },
			{ bindName: ENVKEY.SERVER.DOMAIN , 				to: 'http://localhost' },
			{ bindName: ENVKEY.SERVER.PORT , 				to: 3020 },
			{ bindName: ENVKEY.SERVER.PUBLIC_PATH , 		to: '/' },
        ],
        [Profile.PRODUCTION] : [
			{ bindName: ENVKEY.CLIENT.WEBPACK.SHOULD_BE_VERBOS , 	to: false },
			{ bindName: ENVKEY.CLIENT.WEBPACK.HOST , 				to: 'localhost' },
			{ bindName: ENVKEY.CLIENT.WEBPACK.PORT , 				to: 3010 },

			{ bindName: ENVKEY.SERVER.HOST , 				to: '127.0.0.0' },
			{ bindName: ENVKEY.SERVER.DOMAIN , 				to: 'http://localhost' },
			{ bindName: ENVKEY.SERVER.PORT , 				to: 3020 },
			{ bindName: ENVKEY.SERVER.PUBLIC_PATH , 		to: '/static/' },
        ],
    }
} as NamespaceConfiguration


Container.configure(environment)

const [profile, color] = resolveRunTimeEnvironment()
Container.environment(profile)
console.log(`${`Node Environment is now`.cyan} ${profile[color]}`)

export { Container }

function resolveRunTimeEnvironment(){
	const node_environment = process.env.NODE_ENV
	let profile:Profile
	let color:any
	switch(node_environment){
		case 'DEVELOPMENT'  : 
			profile = Profile.DEVELOPMENT
			color   = 'green'
			break
		case 'TEST'         : 
			profile = Profile.TEST
			color   = 'cyan'
			break
		case 'PRODUCTION'   : 
			profile = Profile.PRODUCTION
			color   = 'red'
			break
		default             : 
			profile = Profile.DEVELOPMENT
			color   = 'green'
	}
	return [profile, color]
}
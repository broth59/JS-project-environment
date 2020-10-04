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
export namespace EnvKey {
	/* Webpack */
	export enum Webpack {
		//Environment 
		SHOULD_BE_VERBOS          = '@env/webpack/shoud_be_specific',
		PUBLIC_PATH					= '@env/webpack/public_path',
		//Build
		WEBPACK_COMPILER_CONFIG     = '@env/webpack/webpack_compiler_config',
		CSS_PROCESSORS              = '@env/webpack/css_processors',
		HTML_PLUGINS                = '@env/webpack/html_plugins',
		//Watch
		WEBPACK_SERVER_CONFIG       = '@env/webpack/webpack_server_config',
		PORT 					    = '@env/webpack/port',	
		HOST 					    = '@env/webpack/host',
	}
       
}

const environment = {
    namespace : {
        [Profile.DEVELOPMENT] : [
			{ bindName: EnvKey.Webpack.SHOULD_BE_VERBOS , to: true },
			{ bindName: EnvKey.Webpack.HOST , 				to: 'localhost' },
			{ bindName: EnvKey.Webpack.PORT , 				to: 3010 },
			{ bindName: EnvKey.Webpack.PUBLIC_PATH , 		to: '/' },
        ],
        [Profile.TEST] : [
			{ bindName: EnvKey.Webpack.SHOULD_BE_VERBOS , to: false },
			{ bindName: EnvKey.Webpack.HOST , 				to: 'localhost' },
			{ bindName: EnvKey.Webpack.PORT , 				to: 3010 },
			{ bindName: EnvKey.Webpack.PUBLIC_PATH , 		to: '/' },
        ],
        [Profile.PRODUCTION] : [
			{ bindName: EnvKey.Webpack.SHOULD_BE_VERBOS , to: false },
			{ bindName: EnvKey.Webpack.HOST , 				to: '127.0.0.0' },
			{ bindName: EnvKey.Webpack.PORT , 				to: 3010 },
			{ bindName: EnvKey.Webpack.PUBLIC_PATH , 		to: '/static/' },
        ],
    }
} as NamespaceConfiguration


//Apply Environment
Container.configure(environment)

//Set Environment
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

Container.environment(profile)
console.log(`${`Node Environment is now`.cyan} ${profile[color]}`)



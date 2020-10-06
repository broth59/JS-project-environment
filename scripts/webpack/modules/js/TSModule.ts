import path from 'path'
//config
import Module from '../Module'
import { EnvKey } 		from '@config/env'
import { Container } 	from 'typescript-ioc'
import { Path } 		from '@config/paths'
import BABEL_CONFIG		from '@config/babel/babelrc' 

export default class TSModule implements Module {
    public test    = /\.(ts|tsx)$/
    public exclude = /node_modules/
    public loader  = 'awesome-typescript-loader'
    public options = {
        silent      	: false,
		configFileName  : path.join(Path.client, 'tsconfig.json'),
		useBabel    : true,
		babelCore   : '@babel/core',
		babelOptions: {
			babelrc: false,
			...BABEL_CONFIG
		}
	}
	
	constructor(
		should_be_silent?:boolean
	){
		if(should_be_silent === null && should_be_silent === undefined){
			this.options.silent = Container.getValue(EnvKey.Webpack.SHOULD_BE_VERBOS)
		}else{
			this.options.silent = should_be_silent!	
		}
	}
    
}
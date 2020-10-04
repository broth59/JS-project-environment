import webpack from "webpack"
import WebpackDevServer from "webpack-dev-server"
import { EnvKey } from '@config/env'
import { Container } from './bootstrap'
import 'colors'

const compiler = webpack(Container.getValue(EnvKey.Webpack.WEBPACK_COMPILER_CONFIG))
compiler.run((err, stats)=>{
	if(err){
		console.log(err.message)
	}

	const stats_info = stats.toJson() 
	if(stats.hasErrors()){
		console.log(stats_info.errors.join('\n').red)
	}
	if(stats.hasWarnings()){
		console.log(stats_info.warnings.join('\n').red)
	}
})

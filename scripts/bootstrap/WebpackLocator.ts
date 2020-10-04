import { EnvKey } from '@config/env'
import { Container } from 'typescript-ioc'
import webpack from 'webpack'
import path    from 'path'
//domains
import CssLoader    from '../webpack/modules/css/loader'
import CssModule    from '../webpack/modules/css'
import JsModule     from '../webpack/modules/js'
import StaticModule from '../webpack/modules/static'
import Plugin    	from '../webpack/plugins'
//config
import { Path } 		from '@config/paths'
import WebpackDevServer from 'webpack-dev-server'


/* Configure Webpack artificial domains */
Container
    .bindName(EnvKey.Webpack.CSS_PROCESSORS)
    .to((()=>{
        const post_css_loader  = new CssLoader.PostCssLoader()
        const css_loader       = new CssLoader.CssLoader()
        const style_loader     = new CssLoader.StyleLoader()
    
        return [
            post_css_loader,
            css_loader,
            style_loader
        ].reverse()

    })())


/* Build/Watch webpack */
Container
	.bindName(EnvKey.Webpack.WEBPACK_COMPILER_CONFIG)
	.to((()=>{
		//mode
		const should_be_specifict = Container.getValue(EnvKey.Webpack.SHOULD_BE_VERBOS) 
		const mode 	   = should_be_specifict ? 'development' 		 : 'production'
		const devtool  = should_be_specifict ? '#@inline-source-map' : ''
		//resource
		const public_path = Container.getValue(EnvKey.Webpack.PUBLIC_PATH)

		return {
			/* Define entries */
			context: Path.client,
			entry   : [ 
				//'webpack/hot/dev-server',
				'./index'
			],
			resolve: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
				alias: {
					'@config'       : Path.config,
					'@server'       : Path.server,                
					'@interface'    : Path.interface,
					'@domain'       : Path.domain,
					'@client'       : Path.client,
					'@component'   : Path.component,
					'@page'       	: path.join(Path.component, 'page'),
				}
			},

			/* Define loaders */
			module  : {
				rules: [
					{
						oneOf: [
							//Transcompile ts|tsx
							new JsModule.TSModule(),                       

							//Transcompile css
							new CssModule.CssModule(),
							new CssModule.ScssModule(),
							new CssModule.ScssModModule(),
							
							//Parse static files
							new StaticModule.UrlModule(),
							new StaticModule.FileModule(),
						]
					}                 
				]
			},

			
			/* Define output */
			output:{
				publicPath  : public_path, 
				path        : path.join(Path.dist, 'client'),
				filename    : '[name].[hash:8].js'
			},
			
			/* Define plugins */
			plugins: [
				...new Plugin.HtmlPlugins().resolvePlugins(),
				...new Plugin.ExtractPlugins().resolvePlugins()
			],
			

			/*  */
			optimization: {
				minimize   : !should_be_specifict,
				splitChunks: {
					chunks: 'all',
					name: false,
				}	
			},
			devtool	: devtool,
			mode	: mode,

		} as webpack.Configuration
	})())


Container
	.bindName(EnvKey.Webpack.WEBPACK_SERVER_CONFIG)
	.to((()=>{
		return {
			contentBase: Path.content_base,
			hot		: true,
			compress: true,
			//open	: true,

			watchOptions: {
				ignored: /node_modules/,
			},

			/* Dev-server hooks */
			before(){
				
			}

		} as WebpackDevServer.Configuration
	})())
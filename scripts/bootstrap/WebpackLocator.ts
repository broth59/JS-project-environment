import { ENVKEY } from '@config/env'
import { Container } from 'typescript-ioc'
import webpack 		from 'webpack'
import webpackNode  from 'webpack-node-externals'
import path    		from 'path'
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
    .bindName(ENVKEY.CLIENT.WEBPACK.CSS_PROCESSORS)
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
	.bindName(ENVKEY.CLIENT.WEBPACK.COMPILER_CONFIG)
	.to((()=>{
		//mode
		const should_be_specifict = Container.getValue(ENVKEY.CLIENT.WEBPACK.SHOULD_BE_VERBOS) 
		const mode 	   = should_be_specifict ? 'development' 		 : 'production'
		const devtool  = should_be_specifict ? '#@inline-source-map' : ''
		//resource
		const public_path = Container.getValue(ENVKEY.SERVER.PUBLIC_PATH)

		return {
			/* Define entries */
			context: Path.client,
			entry   : [ 
				'babel-polyfill',
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
	.bindName(ENVKEY.CLIENT.WEBPACK.SERVER_CONFIG)
	.to((()=>{
		const DOAMIN = Container.getValue(ENVKEY.SERVER.DOMAIN)
		const PORT	 = Container.getValue(ENVKEY.SERVER.PORT)

		return {
			contentBase: Path.content_base,
			hot		: true,
			compress: true,
			//open	: true,

			watchOptions: {
				ignored: /node_modules/,
			},

			proxy: {
				'/oauth/' : {
				  target: `${DOAMIN}:${PORT}`,
				  changeOrigin : true,
				},
				'/graphql/' : {
				  target: `${DOAMIN}:${PORT}`,
				  changeOrigin : true,
				}
			},

			/* Dev-server hooks */
			before(){
				
			}

		} as WebpackDevServer.Configuration
	})())



Container
	.bindName(ENVKEY.SERVER.WEBPACK.COMPILER_CONFIG) 
	.to((()=>{
		//mode
		const should_be_specifict = Container.getValue(ENVKEY.CLIENT.WEBPACK.SHOULD_BE_VERBOS) 
		const mode 	   = should_be_specifict ? 'development' 		 : 'production'
		const devtool  = should_be_specifict ? '#@inline-source-map' : ''
		//resource
		const public_path = Container.getValue(ENVKEY.SERVER.PUBLIC_PATH)

		return {
			/* Define entries */
			context: Path.server,
			target: 'node',
			entry   : [
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
					'@component'    : Path.component,
					'@page'       	: path.join(Path.component, 'page'),
				}
			},

			/* Define loaders */
			module  : {
				rules: [
					{
						oneOf: [{
							  test    : /\.(ts|tsx)$/
							, exclude : /node_modules/
							, loader  : 'awesome-typescript-loader'
							, options : {
								silent      	: false,
								configFileName  : path.join(Path.server, 'tsconfig.json'),
								useBabel    	: false,
							}	                       
						}]
					}                 
				]
			},

			
			/* Define output */
			output:{
				publicPath  : public_path, 
				path        : path.join(Path.dist, 'server'),
				filename    : 'index.js'
			},

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

			externals: [ webpackNode() ]

		} as webpack.Configuration
	})())

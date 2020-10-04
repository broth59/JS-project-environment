import { EnvKey } from '@config/env'
import { Container, InjectValue } from 'typescript-ioc'
import ManifestPlugin       from 'webpack-manifest-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'
//config
import { Path } from '@config/paths'
import Plugins from './Plugins'


export default class ExtractPlugins implements Plugins {

	@InjectValue(EnvKey.Webpack.SHOULD_BE_VERBOS)
    private should_be_verbose?: boolean	
	
	@InjectValue(EnvKey.Webpack.PUBLIC_PATH)
    private public_path?: string	


    constructor(){ }
  
    private resolveManifest(){
        return new ManifestPlugin({
			fileName		: 'asset-manifest.json',
			publicPath	: this.public_path,
			generate		: (seed, files, entrypoints) => {
				const manifestFiles = files.reduce((manifest:any, file) => {
				const file_name = file.name! 
				const file_paht = file.path
				manifest[file_name] = file.path
				return manifest
				}, seed)
				const entrypointFiles = entrypoints.main.filter(
				fileName => !fileName.endsWith('.map')
				)
	
				return {
				files		: manifestFiles,
				entrypoints	: entrypointFiles,
				}
			},
        })
    }

    private resolveCssExtractor(){
        return new MiniCssExtractPlugin({
			filename      : 'css/[name].[contenthash:8].css',
			chunkFilename : 'css/[name].[contenthash:8].chunk.css',
        })
    }
    
    resolvePlugins():Array<webpack.Plugin>{
        const plugin_list = [
          	this.resolveManifest()
        ]

        !this.should_be_verbose && plugin_list.push(this.resolveCssExtractor())  
      
        return plugin_list
    }


}
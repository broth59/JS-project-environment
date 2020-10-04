import { EnvKey } from '@config/env'
import Module from '../Module';
import webpack from 'webpack';
import { Container } from 'typescript-ioc';


 

export default class ScssModule implements Module {
	
	public test    = /\.(scss|sass)$/   
	public exclude = /\.module\.(scss|sass)$/
	public use: Array<webpack.RuleSetUse>

    constructor(){
		const css_processor: Array<webpack.RuleSetUse> = Container.getValue(EnvKey.Webpack.CSS_PROCESSORS)
		this.use = css_processor.concat({
            loader: 'sass-loader'
        })
    }
    
}
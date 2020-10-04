import { EnvKey } from '@config/env'
import Module from '../Module';
import webpack from 'webpack';
import { Container } from 'typescript-ioc';

export default class ScssModModule implements Module {
	
	public test = /\.module\.(scss|sass)$/
	public use: Array<webpack.RuleSetUse>
	
    constructor(){
        const css_processor: Array<webpack.RuleSetUse> = Container.getValue(EnvKey.Webpack.CSS_PROCESSORS)
		this.use = css_processor.concat({
            loader: 'sass-loader'
        })       
    }
    
}
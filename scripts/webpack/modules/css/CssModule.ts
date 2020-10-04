import { EnvKey } from '@config/env'
import { Inject, InjectValue, Container } from 'typescript-ioc';
import webpack from 'webpack';
import Module from '../Module';

const css_processor = Container.getValue(EnvKey.Webpack.CSS_PROCESSORS) 

export default class CssModule implements Module {
    public test    = /\.css$/
    public exclude = /\.module\.css$/ 
	public use?: Array<webpack.RuleSetUse>

    constructor(){
		const css_processor: Array<webpack.RuleSetUse> = Container.getValue(EnvKey.Webpack.CSS_PROCESSORS)
    }
    
}
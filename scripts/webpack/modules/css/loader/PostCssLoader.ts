import { EnvKey } from '@config/env'
import webpack from 'webpack';
import { Container, InjectValue, Inject } from 'typescript-ioc';


const should_use_source_map = Container.getValue(EnvKey.Webpack.SHOULD_BE_VERBOS)

export default class PostCssLoader implements webpack.RuleSetLoader {
    
    public loader   = 'postcss-loader'
    
    constructor(
        public options?: webpack.RuleSetQuery    
    ){
        this.options = {
			postcssOptions: {
				plugins: () => [
					require('postcss-flexbugs-fixes'),
					require('postcss-preset-env')({
						autoprefixer: {
							flexbox: 'no-2009',
						},
						stage: 3,
					}),
				]
			},
            sourceMap: should_use_source_map
        } || {}
        
    }

    
}
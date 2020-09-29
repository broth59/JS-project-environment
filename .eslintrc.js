

module.exports = {
	/*Source spec*/
	//source path
	files		   : [ './src/*' ],
	ignorePatterns : [ '/node_modules/' ],
	//javascript level
	env: {
		node   	: true,
		es2020 	: true,
	},
	globals: [ '$' ],
	
	/* AST Parser spec */
	parser		 : '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2020,
		sourceType: 'module'||'script',
	},

	/* Linting Rules */
	//룰 추가
	plugins: [
		'react', 
		'@typescript-eslint', 
		'import'
	],
	//룰 활성화 프리셋
	extends: [
		'eslint:recommended', 
		'plugin:react/recommended', 
		'plugin:import/recommeneded',
		
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/eslint-recommeded',
		
		'prettier',
        'prettier/@typescript-eslint'
	],
	rules: {},

	overrides: [
		//클라이언트 
		{
			files	: [ './src/client/**/*' ],
			env: {
				node   	: true,
				es2020 	: true,
			},
		},
		//서버
		{
			files	: [ './src/server/**/*' ],
			env: {
				node   	: true,
				es2020 	: true,
			},
		},
	]
} 

import { ThemeStore } from './ThemeStore'
import { observable, makeAutoObservable, action, computed } from "mobx";
import { autobind } from "core-decorators";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { Theme } from './Theme';

@autobind
export default class DefaultThemeStore implements ThemeStore{
	@observable
	private theme_list:Array<Theme>
	@observable
	private active_theme:Theme

	constructor(theme_list:Array<Theme>){
		if(theme_list.length == 0) throw Error('Theme list cannot be empty')

		this.theme_list = theme_list
		this.active_theme = theme_list[0]
		makeAutoObservable(this)
	}
	
	@computed
	getThemeList(){
		return this.theme_list
	}

	@computed
	getColorPallete(){
		return this.active_theme.getColorPallete()
	}
	
	@action
	activeThemeWith(theme:Theme){
		this.active_theme = theme
	}

}

export { ThemeStore }  
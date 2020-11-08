import { Theme } from './Theme'
import { Pallete } from './Pallete'

export default class DefaultTheme implements Theme {
	private pallete:Pallete

	constructor(pallete:Pallete){
		this.pallete = pallete
	} 
	
	getColorPallete():Pallete{
		return this.pallete
	}
}

export { DefaultTheme }
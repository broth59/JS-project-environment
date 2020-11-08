import { Theme } from './Theme';
import Pallete from './Theme/Pallete';

export default interface ThemeStore {
    getThemeList(): Array<Theme>;
    activeThemeWith(theme: Theme): void;
    getColorPallete(): Pallete;
}

export { ThemeStore };

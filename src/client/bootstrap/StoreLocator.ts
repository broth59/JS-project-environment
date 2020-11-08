import { ENVKEY, Container } from '@config/env';
//config
import RootStore from '@client/store/RootStore';
import DefaultThemeStore from '@client/store/UI/DefaultThemestore';
import { DefaultTheme } from '@client/store/UI/Theme';

Container.bindName(ENVKEY.CLIENT.STORE.ROOT).to(
    (() => {
        return new RootStore({
            ui_store: {
                theme_store: new DefaultThemeStore([
                    new DefaultTheme({
                        PRIMARY_COLOR: '#800000',
                        SECONDARY_COLOR: '#ff6666',
                        COMPLEMENTARY_COLOR: '#660066',
                    }),
                ]),
                screen_store: {},
            },
            user_store: {},
            assignment_store: {},
            lecture_store: {},
        });
    })()
);

import { ENVKEY, Container } from '@config/env';
//config
import RootStore from '@client/store/RootStore';
import DefaultThemeStore from '@client/store/UI/DefaultThemestore';
import { DefaultTheme } from '@client/store/UI/Theme';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import LectureStore from '@client/store/Lecture/LectureStore';
import LectureRepository from '@client/repository/LectureRepository';

Container.bindName(ENVKEY.CLIENT.STORE.CLIENT).to(
    (() => {
        const DOAMIN = Container.getValue(ENVKEY.SERVER.DOMAIN);
        const PORT = Container.getValue(ENVKEY.SERVER.PORT);

        return new ApolloClient({
            uri: `${DOAMIN}:${PORT}/graphql`,
            cache: new InMemoryCache(),
        });
    })()
);

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
            lecture_store: new LectureStore(
                new LectureRepository(
                    Container.getValue(ENVKEY.CLIENT.STORE.CLIENT)
                )
            ),
        });
    })()
);

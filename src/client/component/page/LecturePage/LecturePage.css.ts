import { css } from '@emotion/core';
import { Pallete } from '@client/store/UI/Theme';
import { Screen } from '@component/css/Screen';

const { mobile, tablet, laptop, desktop } = Screen.media_query;
const { flex } = Screen;

export default ({
    PRIMARY_COLOR,
    SECONDARY_COLOR,
    COMPLEMENTARY_COLOR,
}: Pallete) => {
    return {
        lecture_page: css`
            display: flex;
            flex-direction: column;
            align-items: center;

            width: 100%;
            height: 100%;
            padding: 0.3em;

            color: ${COMPLEMENTARY_COLOR};
            text-overflow: ellipsis;

            ${mobile(css``)}
            ${tablet(css``)}
			${laptop(css``)}
			${desktop(css``)}
        `,

        lecture_header: css`
            display: flex;
            flex-direction: column;
            align-items: center;

            width: 100%;
            height: 5%;

            color: ${COMPLEMENTARY_COLOR};
            text-overflow: ellipsis;

            ${mobile(css``)}
            ${tablet(css``)}
			${laptop(css``)}
			${desktop(css``)}
        `,

        card_list: css`
            display: grid;
            grid: wrap;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            grid-template-rows: repeat(auto-fit, auto);
            align-content: start;
            gap: 1em;

            width: 100%;
            height: 100%;

            color: ${COMPLEMENTARY_COLOR};
            text-overflow: ellipsis;

            ${mobile(css`
                grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            `)}
            ${tablet(css``)}
			${laptop(css``)}
			${desktop(css``)}
        `,
    };
};

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
        card: css`
            display: flex;
            flex-direction: column;
            align-items: center;

            width: 100%;
            padding-bottom: 100%;
            border: 1px solid black;

            color: ${COMPLEMENTARY_COLOR};
            text-overflow: ellipsis;

            & * {
                position: absolute;
            }

            ${mobile(css``)}
            ${tablet(css``)}
			${laptop(css``)}
			${desktop(css``)}
        `,
    };
};

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
        content: css`
            ${flex.center(css`
                align-items: flex-start;
            `)}
            padding: 1em;

            color: ${SECONDARY_COLOR};
            text-overflow: ellipsis;

            ${mobile(css``)}
            ${tablet(css``)}
			${laptop(css``)}
			${desktop(css``)}
        `,
    };
};

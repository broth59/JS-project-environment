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
        content_title: css`
            ${flex.center()}
            padding: 1em;

            color: ${PRIMARY_COLOR};

            ${mobile(css``)}
            ${tablet(css``)}
			${laptop(css``)}
			${desktop(css``)}
        `,
    };
};

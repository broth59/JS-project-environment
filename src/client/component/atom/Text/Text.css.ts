import { css } from '@emotion/core';
import { Pallete } from '@client/store/UI/Theme';
import { Screen } from '@component/css/Screen';

const { mobile, tablet, laptop, desktop } = Screen.media_query;

export default ({
    PRIMARY_COLOR,
    SECONDARY_COLOR,
    COMPLEMENTARY_COLOR,
}: Pallete) => {
    return {
        label: css`
            color: ${PRIMARY_COLOR};
            border: 1px solid ${SECONDARY_COLOR};

            &:hover {
                background-color: ${COMPLEMENTARY_COLOR};
            }

            ${mobile(css`
                font-weight: bold;
            `)}

            ${tablet(css``)}

			${laptop(css``)}

			${desktop(css``)}
        `,
    };
};

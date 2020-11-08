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
        area: css`
			display: flex;

			grid-column: 1 / -1;
			grid-row: 1 / 2;
			
			background-color: ${SECONDARY_COLOR};

            &:hover {
                background-color: ${COMPLEMENTARY_COLOR};
			}
			

            ${mobile(css`
				
            `)}

			${tablet(css`
			
			`)}

			${laptop(css``)}

			${desktop(css``)}
        `,
    };
};

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

			grid-column: 2 / -1;
			grid-row: 2 / -1;
			
			background-color: white;
			
            &:hover {
                background-color: white;
            }

            ${mobile(css`
				grid-column: 1 / -1;
            `)}

			${tablet(css`
				grid-column: 1 / -1;
			`)}

			${laptop(css``)}

			${desktop(css``)}
		`,
		
    };
};

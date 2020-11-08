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

			grid-column: 1 / 2;
			grid-row: 2 / -1;
			
			background-color: ${COMPLEMENTARY_COLOR};
			
            &:hover {
                background-color: ${SECONDARY_COLOR};
            }

            ${mobile(css`
				display: none;
				
				&.visible{
					display: flex;
				}

				transition: all 1s;
            `)}

			${tablet(css``)}

			${laptop(css``)}

			${desktop(css``)}
		`,
		
		button: css`
			display: none;

			width: 30px;
			height: 30px;

			color: none;

			${mobile(css`
				display: flex;
            `)}

			${tablet(css`
			
			`)}

			${laptop(css``)}

			${desktop(css``)}
		`
    };
};

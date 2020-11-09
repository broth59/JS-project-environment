import { css } from '@emotion/core';
import { Pallete } from '@client/store/UI/Theme';
import { Screen } from '@component/css/Screen';

const { mobile, tablet, laptop, desktop } = Screen.media_query;

export default ({
    PRIMARY_COLOR,
    SECONDARY_COLOR,
    COMPLEMENTARY_COLOR,
}: Pallete) => {
	const COLS = 5
	const ROWS = 12 

	const HEIGHT = 100
	const WIDTH = 100

    return {
		app: css`
		
			display: grid;
			grid-template-rows: repeat(${ROWS}, ${HEIGHT/ROWS}vh);
			grid-template-columns: repeat(${COLS}, minmax(${320/COLS}px,${HEIGHT/COLS}vw));
			;

			width: ${WIDTH}vw;
			height: ${HEIGHT}vh;

            &:hover {
                background-color: ${COMPLEMENTARY_COLOR};
            }

			${mobile(css`
				min-width: 320px;
			`)}

            ${tablet(css``)}

			${laptop(css``)}

			${desktop(css``)}
        `,
    };
};

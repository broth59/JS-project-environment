import { css } from '@emotion/core';
import { Pallete } from '@client/store/UI/Theme';
import { Screen } from '@component/css/Screen';
import { useMemo } from 'react';

const { mobile, tablet, laptop, desktop } = Screen.media_query;
const { flex } = Screen

export default ({
    PRIMARY_COLOR,
    SECONDARY_COLOR,
    COMPLEMENTARY_COLOR,
}: Pallete) => {

	const hidden_status = useMemo(()=>css`
		display: none;
				
		&.visible{
			display: flex;
		}

		transition: all 1s;
	`, [])

    return {
        area: css`
			display: flex;
			flex-direction: column;

			grid-column: 1 / 2;
			grid-row: 2 / -1;
			
			border: 1px solid ${COMPLEMENTARY_COLOR};
			

            ${mobile(css`
				${hidden_status}
            `)}
			${tablet(css`
				${hidden_status}
			`)}
			${laptop(css``)}
			${desktop(css``)}
		`,
		
		button: css`
			display: none;

			width: 30px;
			height: 30px;

			color: none;

			${mobile(css`display: flex;`)}

			${tablet(css`
			
			`)}

			${laptop(css``)}

			${desktop(css``)}
		`,

		label: css`
			${flex.center()}

			width: 100%;
			height: 30px;

			${mobile(css`display: flex;`)}
			${tablet(css``)}
			${laptop(css``)}
			${desktop(css``)}
		`,

		link: css`
			
			text-decoration: none;
			color: black;

			${mobile(css`display: flex;`)}
			${tablet(css``)}
			${laptop(css``)}
			${desktop(css``)}			
		`
    };
};

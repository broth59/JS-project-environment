import { css, SerializedStyles } from '@emotion/core';

namespace Screen {
    export const media_query = {
        mobile: (css_block: SerializedStyles) => css`
            @media (max-width: ${'480px'}) {
                ${css_block}
            }
        `,
        tablet: (css_block: SerializedStyles) => css`
            @media (max-width: ${'768px'}) and (min-width: ${'480px'}) {
                ${css_block}
            }
        `,
        laptop: (css_block: SerializedStyles) => css`
            @media (max-width: ${'1024px'}) and (min-width: ${'768px'}) {
                ${css_block}
            }
        `,
        desktop: (css_block: SerializedStyles) => css`
            @media (max-width: ${'1200px'}) and (min-width: ${'1024px'}) {
                ${css_block}
            }
        `,
    };

    export const flex = {
        center: (css_block?: SerializedStyles) => css`
            display: flex;
            align-items: center;
            justify-content: center;
            ${css_block}
        `,
    };
}

export { Screen };

export default Screen;

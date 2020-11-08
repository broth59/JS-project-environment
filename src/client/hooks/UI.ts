import { useRootData } from '@client/context/StoreContext';
import { UIStore } from '@store/UI/UIStore';
import { useState, useCallback, useMemo } from 'react';
import { Pallete } from '@client/store/UI/Theme';

namespace UI {
    export function useStyle<T>(loadCss: (pallete: Pallete) => T): T {
        const theme_store = useRootData((root) => root.ui_store.theme_store);
        const pallete = theme_store.getColorPallete();
        console.log(pallete);
        const loaded_css = useMemo(() => loadCss(pallete), [pallete]);
        return loaded_css;
        return {} as any;
    }
}

export { UI };

import React, { createContext, useMemo } from 'react';
import { type MediaQueryAllQueryable, useMediaQuery } from 'react-responsive';

type Context = Readonly<{
  desktop: boolean;
  laptop: boolean;
  tablet: boolean;
  sp: boolean;
}>;

const MediaQueryContext = createContext<Context>({
  desktop: true,
  laptop: false,
  tablet: false,
  sp: false,
});

const screens = {
    sp: { min: '0px', max: '639px' },
    tablet: { min: '640px', max: '1279px' },
    laptop: { min: '1280px', max: '1919px' },
    desktop: { min: '1920px' },
  }

const mediaQueries: Record<keyof Context, MediaQueryAllQueryable> = {
  desktop: { minWidth: screens.desktop.min as string },
  laptop: { minWidth: screens.laptop.min as string, maxWidth: screens.laptop.max as string },
  tablet: { minWidth: screens.tablet.min as string, maxWidth: screens.tablet.max as string },
  sp: { minWidth: screens.sp.min as string, maxWidth: screens.sp.max as string },
};

type MediaQueryProviderPropertiesType = Readonly<{
  children: React.ReactNode;
}>;

export const MediaQueryProvider = ({ children }: MediaQueryProviderPropertiesType) => {
  const desktop = useMediaQuery(mediaQueries.desktop);
  const laptop = useMediaQuery(mediaQueries.laptop);
  const tablet = useMediaQuery(mediaQueries.tablet);
  const sp = useMediaQuery(mediaQueries.sp);

  const mediaQueryContext = useMemo(
    () => ({
      desktop,
      laptop,
      tablet,
      sp,
    }),
    [desktop, laptop, tablet, sp],
  );

  return <MediaQueryContext.Provider value={mediaQueryContext}>{children}</MediaQueryContext.Provider>;
};

// export const useMediaQueryContext = (): Context => useContext(MediaQueryContext);

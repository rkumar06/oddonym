import { createStitches } from '@stitches/react';

export const {
    styled,
    css,
    globalCss,
    keyframes,
    getCssText,
    theme,
    createTheme,
    config,
  } = createStitches({
    theme: {
      colors: {
        gray400: 'gainsboro',
        gray500: 'lightgray',
        gray700: '#374151'
      },
      space: {
        lg: '0.75rem',
        xl: '1rem',
        xxl: '2rem',
        xxxl: '2.5rem',
      },
      radii: {
        rounded: '0.25rem',
        rounded_md: '0.375rem',
        rounded_lg: '2.75rem',
        rounded_xl: '3.5rem',
        rounded_xxl: '5rem',
      },
      fontSizes: {
        sm: '0.875rem',
        lg: '1.25rem',
        xl: '2.5rem',
      },
      lineHeights: {
        sm: '1.25rem',
        tight: '1.25',
      },
      fontWeights: {
        semibold: '650',
        bold: '700',
      },
      sizes: {
        full: '100%',
      },

    },
    media: {
      tablet: '(max-width: 900px)',
      mobile: '(max-width: 600px)',
    },
    utils: {
        // paddings
        p: (value) => ({
            padding: value,
        }),
        pt: (value) => ({
            paddingTop: value,
        }),
        pr: (value) => ({
            paddingRight: value,
        }),
        pb: (value) => ({
            paddingBottom: value,
        }),
        pl: (value) => ({
            paddingLeft: value,
        }),
        px: (value) => ({
            paddingLeft: value,
            paddingRight: value,
        }),
        py: (value) => ({
            paddingTop: value,
            paddingBottom: value,
        }),

        // margins
        m: (value) => ({
            margin: value,
        }),
        mt: (value) => ({
            marginTop: value,
        }),
        mr: (value) => ({
            marginRight: value,
        }),
        mb: (value) => ({
            marginBottom: value,
        }),
        ml: (value) => ({
            marginLeft: value,
        }),
        mx: (value) => ({
            marginLeft: value,
            marginRight: value,
        }),
        my: (value) => ({
            marginTop: value,
            marginBottom: value,
        }),
    },
    
  });
import { Palette, TypographyVariantsOptions } from "@mui/material/styles";

const typography = (palette: Palette): TypographyVariantsOptions => ({
  fontFamily: "Roboto, sans-serif",

  h1: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: "20px",
    letterSpacing: "-1.5px",
    lineHeight: "20px",
  },

  subtitle1: {
    letterSpacing: "0.15px",
    color: palette.text.primary,
    fontSize: "12px",
    lineHeight: "12px",
    fontWeight: 400,
    margin: 0,
    marginTop: "2px",
  },

  h5: {
    fontWeight: 500,
    letterSpacing: 0,
    color: palette.text.primary,
  },

  h2: {
    fontWeight: 500,
    letterSpacing: "-0.5px",
    color: palette.text.primary,
  },
  h3: {
    fontWeight: 500,
    letterSpacing: 0,
    color: palette.text.primary,
  },
  h4: {
    fontWeight: 500,
    letterSpacing: "0.25px",
    color: palette.text.primary,
  },
  h6: {
    letterSpacing: "0.15px",
    color: palette.text.primary,
  },

  subtitle2: {
    letterSpacing: "0.1px",
    color: palette.text.secondary,
  },
  body1: {
    letterSpacing: "0.15px",
    color: palette.text.primary,
  },
  body2: {
    lineHeight: 1.429,
    letterSpacing: "0.15px",
    color: palette.text.secondary,
  },
  button: {
    letterSpacing: "0.4px",
    color: palette.text.primary,
  },
  caption: {
    lineHeight: 1.25,
    letterSpacing: "0.4px",
    color: palette.text.secondary,
  },
  overline: {
    letterSpacing: "1px",
    color: palette.text.secondary,
  },
});

export default typography;

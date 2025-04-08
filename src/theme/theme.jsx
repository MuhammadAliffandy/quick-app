import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#2480ED", 
            black: "#4f4f4f", 
            grey: "#828282", 
            white: "#e0e0e0", 
        },
        profile: {
            main: "#2F80ED",
            grey: "#E0E0E0",
        },
        indicator: {
            main: "#f8b76b", 
            purple: "#8785ff", 
            red: "#eb5757", 
            beige: "#f2c94c", 
        },
        chats: {
            main: "#fceed3", 
            yellowDark: "#e5a443", 
            purple: "#eedcff", 
            purpleDark: "#9b51e0", 
            green: "#d2f2ea", 
            greenDark: "#43b78d", 
        },
        stikers: {
            main: "#e9f3ff", 
            purpleLight: "#cfcef9", 
            orangeLight: "#fdcfa4", 
            yellowLight: "#f9e9c3", 
            greenLight: "#cbf1c2", 
            toscaLight: "#afebdb", 
            pinkLight: "#f9e0fd", 
        },
    },
    typography: {
        fontFamily: 'var(--font-lato)',
    },
});

export default theme;
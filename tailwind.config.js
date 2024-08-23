import {nextui} from "@nextui-org/theme";

/** @type {import("tailwindcss").Config} */
module.exports = {
    content: [
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-sans)"],
                mono: ["var(--font-geist-mono)"]
            }
        }
    },
    darkMode: "class",
    plugins: [
        nextui({
            prefix: "nextui", // prefix for themes variables
            addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
            defaultTheme: "dark", // default theme from the themes object
            defaultExtendTheme: "dark", // default theme to extend on custom themes
            layout: {}, // common layout tokens (applied to all themes)
            light: {
                colors: {
                    background: "#FFFFFF",
                    foreground: "#11181C",
                    primary: {
                        50: "#EBF8FF",
                        100: "#BEE3F8",
                        200: "#90CDF4",
                        300: "#63B6FF",
                        400: "#4299E1",
                        500: "#3182CE",
                        600: "#2B6CB0",
                        700: "#2C5282",
                        800: "#2A4365",
                        900: "#1A365D",
                        foreground: "#FFFFFF",
                        DEFAULT: "#006FEE"
                    },
                    secondary: {
                        DEFAULT: "#38A169",
                        foreground: "#FFFFFF"
                    },
                    success: {
                        DEFAULT: "#48BB78"
                    },
                    error: {
                        DEFAULT: "#F56565"
                    },
                    warning: {
                        DEFAULT: "#ED8936"
                    },
                    info: {
                        DEFAULT: "#4299E1"
                    }
                }
            },
            dark: {
                colors: {
                    background: "linear-gradient(179.4deg, rgb(12, 20, 69) -16.9%, rgb(71, 30, 84) 119.9%)",
                    foreground: "#ECEDEE",
                    primary: {
                        50: "#EBF8FF",
                        100: "#BEE3F8",
                        200: "#90CDF4",
                        300: "#63B6FF",
                        400: "#4299E1",
                        500: "#3182CE",
                        600: "#2B6CB0",
                        700: "#2C5282",
                        800: "#2A4365",
                        900: "#1A365D",
                        foreground: "#FFFFFF",
                        DEFAULT: "#006FEE"
                    },
                    secondary: {
                        DEFAULT: "#38A169",
                        foreground: "#FFFFFF"
                    },
                    success: {
                        DEFAULT: "#48BB78"
                    },
                    error: {
                        DEFAULT: "#F56565"
                    },
                    warning: {
                        DEFAULT: "#ED8936"
                    },
                    info: {
                        DEFAULT: "#4299E1"
                    }
                }
            }
        })
    ]
};
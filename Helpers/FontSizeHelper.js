import {createContext, useState, useContext, useMemo} from 'react'

/*
Medium - default
Small - 0.75 * medium
Large - 1.25 * medium
*/
const FontSizeContext = createContext(); // stores current size, setter, and calclulated font scale value

// wraps around parts of app we use to display text to user
export const FontSizeProvider = ({ children}) => {

    const [size, setSize] = useState("Medium")

    // scale based on user choice
    let multiplier = 1;
    if (size === "Small") multiplier = 0.75
    else if (size === "Large") multiplier = 1.25

    const fontScale = multiplier // whats used across app

    const value = useMemo(() => ({size, setSize, fontScale}), [size, fontScale]); // avoid unecessary re renders

    return (
        <FontSizeContext.Provider value = {value}>
            {children}
        </FontSizeContext.Provider>
    );
};

// gives easy access to context
export function useFontSize() {
    return useContext(FontSizeContext);
}
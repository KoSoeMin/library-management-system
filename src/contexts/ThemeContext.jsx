//ThemeContext
import { createContext, useReducer } from 'react';
export const ThemeContext = createContext();

let ThemeReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_THEME':
            return { ...state, theme: action.payload };
        default:
            return state;
    }
}
//ThemeContextProvider
export const ThemeProvider = ({ children }) => {

    let [state, dispatch] = useReducer(ThemeReducer, { theme: 'light' });

    let changeTheme = (theme) => {
        //action -> type + payload -> {type, payload}
        dispatch({ type: 'CHANGE_THEME', payload: theme });
    }
    return (
        <ThemeContext.Provider value={{ ...state, changeTheme }}>
            {children}
        </ThemeContext.Provider>
  );
}
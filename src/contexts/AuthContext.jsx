import { createContext } from 'react';

const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  return (
    <AuthContext.Provider value={{user : ""}}>
        {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider };
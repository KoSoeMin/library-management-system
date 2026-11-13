import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useReducer, useEffect } from 'react';
import { auth } from '../firebase'

const AuthContext = createContext(null);

const AuthReducer = (state, action) => {
      switch(action.type) {
        case "LOG_IN":
            return {...state, user : action.payload}
        case "LOG_OUT":
            return {...state, user : null}
        default:
            return state;
      }
}

export default function AuthContextProvider({ children }) {

  let [state, dispatch] = useReducer(AuthReducer, { user: null });

  useEffect(() => {
      onAuthStateChanged(auth, (user) => {
          if (user) {
            dispatch({type: "LOG_IN", payload : user})
          }else {
            dispatch({type: "LOG_OUT"})
          }
      })
  }, [])

  return (

    <AuthContext.Provider value={{ user: state.user }}>
        {children}
    </AuthContext.Provider>

  )
}

export { AuthContext, AuthContextProvider };
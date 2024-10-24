import { createContext, useContext, useState } from "react";
import { useCookies } from "react-cookie";

const StateContext = createContext({

    user: null,
    token: null,
    role: null,
    userID: null,
    setUser: () => {},
    setToken: () => {},
    setRole: () => {},
    setUserID: () => {}
});


export const ContextAPI = ({children}) => {

    const [cookies, removeCookie, remove, setCookie] = useCookies(['sessionID', 'role']);
    const [user, setUser] = useState({});
    const [userID, _setUserID] = useState(localStorage.getItem('userID'));
    const [token, _setToken] = useState(localStorage.getItem('sessionID'));
    const [role, _setRole] = useState(localStorage.getItem('role'));

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            //checks if the token exist and if exist store it into the local storage
            localStorage.setItem('sessionID', token);
            
        } else {
            //on the other hand, if it does not exist therefore there is no access
            localStorage.removeItem('sessionID');
            localStorage.removeItem('role');


        }
    };

    const setUserID = (userID) => {
        _setUserID(userID)

        if(userID) {
            localStorage.setItem('userID', userID);

        }else {
            localStorage.removeItem('userID', userID);
            
        }
    }

    const setRole = (role) => {
        _setRole(role)

        if(role) {
            localStorage.setItem('role', role);

        }else {
            localStorage.removeItem('role', role);
            
        }
    }

    return (
        // the value is from the functions above, setToken function is being used rather than the setStudToken because
        //setToken is the one who haves the value for setStudToken and also checks if that student token exists
        <StateContext.Provider
            value={{
             
                user,
                token,
                role,
                userID,
                setUser,
                setToken,
                setRole,
                setUserID
            }}
        >
            {children}
        </StateContext.Provider>
    );
}

export const useStateContext = () => useContext(StateContext);


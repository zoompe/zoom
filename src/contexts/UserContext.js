import React , {createContext, useState} from 'react';

const currentUserFunction = "Admin" //database


export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [userFunction] = useState(currentUserFunction);

    return  (
        <UserContext.Provider value={{ userFunction }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
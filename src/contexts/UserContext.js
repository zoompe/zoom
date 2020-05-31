import React , {createContext, useState} from 'react';

//data from database
const currentUserFunction = "admin"


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
import React from 'react';

//data from database
const currentUserPermissions = [
    "load data",
]

export const UserContext = React.createContext();

const UserContextProvider = (props) => {
    const [userPermissions, handleUserPermissions] = React.useState(currentUserPermissions);

    return  (
        <UserContext.Provider value={{ userPermissions }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
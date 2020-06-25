import React , {createContext, useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

//database
const currentUser = 
{idgasi: '',
Name: '',
Fonction: 'Admin',
Team: '',
P_User:'',
Libelle_APE:'',
}

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [user, setUser] = useState(currentUser);

    const logUser = (user) => { 
        fetch("/auth/signin",
            {
                method:  'POST',
                headers:  new  Headers({
                    'Content-Type':  'application/json'
                }),
                body:  JSON.stringify(user),
            })
        .then(res  => {
            if (res.ok)
                return  res.json()
            else
                throw  new  Error(res.statusText);
            })
            .then(res =>  {
                const token = res.token;
                setUser(res.user)
                Cookies.set('authToken', token, { expires: 7 })
            }
            )
        // .then(res  =>  setUser({ "flash":  res.message }))
        // .catch(err  => setUser({ "flash":  err.message }))
    }
    
// const logUser = (idgasi) => {
//     axios.get(`http://localhost:3001/api/login/${idgasi}`)
//     // .then (response => console.log(response.data))
//     .then (response => setUser({ ...user, IDGASI: response.data.IDGASI, isConnected:true }))
//     .catch((error) => {
//         if (error.response.status===404) {
//             console.log('login')
//             setUser({ ...user, isConnected:false })
//             console.log(user)
//         } 
//         console.log(error)
//         setUser({ ...user, isConnected:false })
//         console.log(user)
//     })
//     console.log(user)
// }

// const logUser = (userlogin) => {
//       axios.post("/auth/signin", userlogin)
//         .then((res) => setUser({ ...user, idgasi: res.data.idgsi }))
//         console.log(user)
//     }
  



    return  (
        <UserContext.Provider value={{ user,logUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
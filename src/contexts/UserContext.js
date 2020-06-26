import React , {createContext, useState, useEffect} from 'react';
// import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

//database
const currentUser = 
{idgasi: '',
Name: '',
Fonction: '',
Function_id: null,
Team: '',
Team_id: null,
P_User:'',
Libelle_APE:'',
APE_id: null,
token:'',
flash:''
}
 
export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [user, setUser] = useState(currentUser);
   
    const history = useHistory();
    useEffect(() => {
        if (user.token.length > 0) 
         {history.push({pathname: '/home/main'})}
        else {history.push({pathname: '/'})}}
    , [user,history])


    const deleteUser = () => {
        setUser({idgasi: '',
		Name: '',
        Fonction: '',
        Function_id: null,
        Team: '',
        Team_id: null,
		P_User:'',
        Libelle_APE:'',
        APE_id: null,
		token:'',
		flash:''
		})
    }


    const logUser = (user) => { 
        fetch("/auth/signin",
            {
                method:  'POST',
                headers:  new  Headers({
                    'Content-Type':  'application/json'
                }),
                body:  JSON.stringify(user),
            })
            .then(res  =>  res.json())
            .then(res =>  {
                const token = res.token;
               console.log(res)
                setUser({...user, 
                    idgasi: res.user.idgasi, 
                    Name:res.user.Name, 
                    Fonction:res.user.Fonction,
                    Function_id: res.user.Function_id,
                    Team: res.user.Team,
                    Team_id: res.user.Team_id,
                    P_User:res.user.P_User,
                    Libelle_APE:res.user.Libelle_APE,
                    APE_id:res.user.APE_id,
                    token: res.token,
                    flash: res.flash
                })
                // setUser(res.user)
                Cookies.set('authToken', token, { expires: 7 })
               
            }
            )
             .catch(err => console.log( err.flash))
            //  .catch(err  => setUser({ ...user, flash:  err.flash, token:'' }))
    }

    return  (
        <UserContext.Provider value={{ user,logUser, deleteUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
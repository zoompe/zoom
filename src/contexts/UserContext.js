import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

//database
const currentUser = {
	idgasi: '',
	Name: '',
	Fonction: '',
	Function_id: null,
	Team: '',
	Team_id: null,
	P_User: '',
	Libelle_APE: '',
	APE_id: null,
	token: false,
	flash: ''
};

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [ user, setUser ] = useState(currentUser);

    // const [ countPort, setCountPort ] = useState(0);
    // const [ countEfo, setCountEfo ] = useState(0);

    const history = useHistory();
    
    useEffect(() => {
        if (Cookies.get('authToken')) 
         {history.push({pathname: '/home/main'})}
        else {history.push({pathname: '/'})}
        console.log('Page Refreshmain')
    }
    , [user,history])

    
	// useEffect(() => {
	// 	console.log('Token Exists: ', Cookies.get('authToken'))
	// 	if(Cookies.get('authToken') && !user.idgasi) {
    //         getUser()
    //         // getCountPort();
	// 	}
	// 	console.log('Page Refresh')
	// }, [user]);

    const deleteUser = () => {
		setUser({
			idgasi: '',
			name: '',
			fonction: '',
			function_id: null,
			team: '',
			team_id: null,
			p_user: '',
			libelle_ape: '',
			ape_id: null,
			token: false,
            flash: '',
		});
	};

	const getUser = () => {
		console.log('attempting to get user')
        axios({
            method: 'get',
            url: "/auth/profile",
            headers: {
                Authorization: 'Bearer ' + Cookies.get('authToken')
            }
        })
		  .then((res) =>  setUser(res.data))
		
        
    };


    //count nav bar portefeuille
    // const getCountPort = (function_id, p_user,ape_id) => {
    //     let source =''
    //     switch (function_id) {
    //         //conseiller
    //         case "1":
    //             source = `/count/portefeuille?dc_dernieragentreferent=${p_user}`
    //             break;
    //         //ELP    
    //         case "2":
    //             source = `/count/portefeuille?dc_dernieragentreferent=${ape_id}`
    //             break;
    //         //DTNE    
    //         case "3":
    //             source = `/count/portefeuille?/count/portefeuille?dt=DTNE`
    //             break;
    //         //DTSO    
    //         case "4":
    //             source = `/count/portefeuille?/count/portefeuille?dt=DTSO`
    //             break;
                
    //         //DR ADMIN
    //         case "5":
    //         case "6":
    //             source = `/count/portefeuille?/count/portefeuille`
    //             break;
                
    //         default : console.log('function_id missing') ;
    //      }

    //      axios({
    //         method: 'get',
    //         url: source,
    //         headers: {
    //             Authorization: 'Bearer ' + Cookies.get('authToken')
    //         }
    //     })
    //       .then((res) =>  setCountPort(res.data))
    //       console.log(countPort)
         
    // }
    

  
	const logUser = (user) => {
		fetch('/auth/signin', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(user)
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.hasOwnProperty('user')) {
					const token = res.token;
					//    console.log(res)
					setUser({
						idgasi: res.user.idgasi,
						name: res.user.Name,
						fonction: res.user.Fonction,
						function_id: res.user.Function_id,
						team: res.user.Team,
						team_id: res.user.Team_id,
						p_user: res.user.P_User,
						libelle_ape: res.user.Libelle_APE,
						ape_id: res.user.APE_id,
						token: true,
						flash: res.flash
					});
					// setUser(res.user)
					Cookies.set('authToken', token, { expires: 7 });
				} else {
                    setUser({ flash: res.flash, token: false });
                    
				}
			});
		//  .catch(err => console.log( err.flash))
		//   .catch(err  => setUser({flash:  err.flash, token:false }))
	};

	return <UserContext.Provider value={{ user, logUser, deleteUser, getUser }}>{props.children}</UserContext.Provider>;
};

export default UserContextProvider;

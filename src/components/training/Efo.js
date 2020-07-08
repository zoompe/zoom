import React, { useContext,useState, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import EfoTab from './EfoTab';
import axios from 'axios';
import Cookies from 'js-cookie';


const Efo = () => {

	const { user } = useContext(UserContext);

	const [ dataEfo, setDataEfo ] = useState([]);
	const [ sourceEfo, setSourceEfo ] = useState('');
	const [ sourceUser, setSourceUser ] = useState('');

    //function source according to the user
    const getSourceUser = (fonction_id, p_user,ape_id) => {
		// console.log(fonction_id)
        switch (fonction_id) {
            //conseiller
            case 1:
                setSourceUser(`/efo?dc_dernieragentreferent=${p_user}`)
                break;
            //ELP    
            case 2:
                setSourceUser(`/efo?dc_structureprincipalede=${ape_id}`)
                break;
            //DTNE    
            case 3:
                setSourceUser( `/efo?dt=DTNE`)
                break;
            //DTSO    
            case 4:
                setSourceUser( `/efo?dt=DTSO`)
                break;
                
            //DR ADMIN
            case 5:
            case 6:
                setSourceUser(`/jalons`)
                break;
                
            default : console.log('function_id missing') ;
		 }
		}

		useEffect(() => {
			console.log('source' + sourceUser )
			getSourceUser(user.fonction_id, user.p_user,user.ape_id)

			if(sourceUser !== ''){

					if(sourceUser !== ''){
					axios({
						method: 'get',
						url: sourceUser,
						headers: {
							Authorization: 'Bearer ' + Cookies.get('authToken')
						}
					})
					.then((res) =>  setDataEfo(res.data[0]))
				}
			}}
		
		// eslint-disable-next-line react-hooks/exhaustive-deps
		, [sourceUser])

	
	return (
		
	<div>
		<h1>Photo EFO DE en/hors portefeuille</h1>
			<div>
			<EfoTab dataEfo={dataEfo}/>	 	 
			</div>
			
	</div>	
	)
	;
};

export default Efo;


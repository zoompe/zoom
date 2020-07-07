import React, { useContext,useState, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import JalonPie from './JalonPie';
import JalonTab from './JalonTab';
import axios from 'axios';
import Cookies from 'js-cookie';
import './jalon.css'

const Jalons = () => {

	const { user } = useContext(UserContext);

	const [ dataJalon, setDataJalon ] = useState([]);
	const [ sourceJalon, setSourceJalon ] = useState('');

	//chart pie
	const [dataPie, setDataPie] = useState([])


    //function source according to the user
    const getCountJalon = (fonction_id, p_user,ape_id) => {
		// console.log(fonction_id)
        switch (fonction_id) {
            //conseiller
            case 1:
                setSourceJalon(`/jalons?dc_dernieragentreferent=${p_user}`)
                break;
            //ELP    
            case 2:
                setSourceJalon(`/jalons?dc_structureprincipalede=${ape_id}`)
                break;
            //DTNE    
            case 3:
                setSourceJalon( `/jalons?dt=DTNE`)
                break;
            //DTSO    
            case 4:
                setSourceJalon( `/jalons?dt=DTSO`)
                break;
                
            //DR ADMIN
            case 5:
            case 6:
                setSourceJalon(`/jalons`)
                break;
                
            default : console.log('function_id missing') ;
		 }
		}

		useEffect(() => {
			 getCountJalon(user.fonction_id, user.p_user,user.ape_id)
			//  console.log('sourcejalon=' + sourceJalon)
			 if(sourceJalon !== ''){
			 axios({
				method: 'get',
				url: sourceJalon,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken')
				}
			})
			.then((res) =>  setDataJalon(res.data))
		}
	}
		// eslint-disable-next-line react-hooks/exhaustive-deps
		, [sourceJalon])

	
	const builtdatachart = () => {
		let tab = []
		const denom = dataJalon.reduce((total, currentValue) => total + currentValue[Object.keys(dataJalon[0])[6]], 0)
		for (let i=1;i < 6;i++){
			tab.push({ id:i-1, value:dataJalon.reduce((total, currentValue) => total + currentValue[Object.keys(dataJalon[0])[i]], 0) / denom})
		}
		return tab
	}	
		
		useEffect(() => {
			setDataPie(builtdatachart())	
   }
	   // eslint-disable-next-line react-hooks/exhaustive-deps
	   , [dataJalon])


	return (
		
	<div>
		<h1>Photo Jalons DE en portefeuille</h1>
		<div className="container-jalon">
			<div className="box">
			<JalonTab dataJalon={dataJalon}/>	 	 
			</div>
			<div className="box">
			<JalonPie data={dataPie}/>
			</div>
		</div>	
	</div>	
	)
	;
};

export default Jalons;

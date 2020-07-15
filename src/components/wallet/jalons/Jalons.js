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
	const [ sourceJalon, setSourceJalon ] = useState('soon');

	//chart pie
	const [dataPie, setDataPie] = useState([])


    //function source according to the user
    const getCountJalon = (fonction_id, p_user,ape_id) => {
		// console.log(fonction_id)
        switch (fonction_id) {
            //conseiller
            case 1:
                setSourceJalon(`dc_dernieragentreferent=${p_user}`)
                break;
            //ELP    
            case 2:
                setSourceJalon(`dc_structureprincipalede=${ape_id}`)
                break;
            //DTNE    
            case 3:
                setSourceJalon( `dt=DTNE`)
                break;
            //DTSO    
            case 4:
                setSourceJalon( `dt=DTSO`)
                break;
                
            //DR ADMIN
            case 5:
            case 6:
                setSourceJalon(``)
                break;
                
            default : setSourceJalon('soon') ;
		 }
		}

		

		useEffect(() => {
			 getCountJalon(user.fonction_id, user.p_user,user.ape_id)
			//  console.log('sourcejalon=' + sourceJalon)
			 if(sourceJalon !== 'soon'){
			 axios({
				method: 'get',
				url: '/jalons?' + sourceJalon,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken')
				}
			})
			.then((res) =>  setDataJalon(res.data))
			
		}
	}
		// eslint-disable-next-line react-hooks/exhaustive-deps
		, [sourceJalon,user])

		const exportIDE = () => {
			axios({
				method: 'get', 
				responseType: 'blob', 
				url: '/jalonxlsx/ide?' + sourceJalon,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken'),
				}
			})
			.then((response) => {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', 'jalonIDE.xlsx'); 
				document.body.appendChild(link);
				link.click();
			 });
			
		}

		const exportRef = () => {
			axios({
				method: 'get', 
				responseType: 'blob', 
				url: '/jalonxlsx/ref?' + sourceJalon,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken'),
				}
			})
			.then((response) => {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', 'jalonREF.xlsx'); 
				document.body.appendChild(link);
				link.click();
			 });
			
		}
		const exportApe = () => {
			axios({
				method: 'get', 
				responseType: 'blob', 
				url: '/jalonxlsx/ape?' + sourceJalon,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken'),
				}
			})
			.then((response) => {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', 'jalonAPE.xlsx'); 
				document.body.appendChild(link);
				link.click();
			 });
			
		}

	
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
		<h4>Photo Jalons DE en portefeuille</h4>
		<div className="container-jalon">
			<div className="box">
			<JalonTab dataJalon={dataJalon}/>	 	 
			</div>
			<div className="box">
			<JalonPie data={dataPie}/>
			</div>
		</div>
	
	<button onClick={exportIDE}>Export Resultat multi-critères IDE</button>
	<button onClick={exportRef}>Export Resultat multi-critères par référent</button>
	<button onClick={exportApe}>Export Resultat multi-critères par APE</button>
	</div>	
	)
	;
};

export default Jalons;

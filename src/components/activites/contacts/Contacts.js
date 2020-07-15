import React, { useContext,useState, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import ContactTab from './ContactTab';
import axios from 'axios';
import Cookies from 'js-cookie';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
	formControl: {
	  margin: theme.spacing(1),
	  minWidth: 120,
	},
	selectEmpty: {
	  marginTop: theme.spacing(1),
	},
  }));

const Contacts = () => {

  const classes = useStyles();

  const [ sourceFilter, setSourceFilter ] = useState({
	dc_structureprincipalesuivi: 'all',
	dc_agentreferent: 'all',
	dc_modalitesuiviaccomp_id: 'all',
	annee: 'all',
});

	const { user } = useContext(UserContext);

	const [ dataActi, setDataActi ] = useState([]);

	const [ sourceUser, setSourceUser ] = useState('soon');
	const [ listeStructure, setListeStructure] = useState([]);
    const [ listeRef, setListeRef] = useState([]);
    const [ listeModAcc, setListeModAcc] = useState([]);
    const [ listeYear, setListeYear] = useState([]);
    

   // load dropdown from database listestructure
    useEffect(() => {
		if(sourceUser !== 'soon'){

			axios({
				method: 'get',
				url: `/activites/listestructure?${sourceUser}`,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken')
				}
			})
			.then((res) =>  setListeStructure(res.data));
		
    }
	}, [sourceUser])

	// load dropdown from database listeRef
    useEffect(() => {
		if(sourceUser !== 'soon'){

			axios({
				method: 'get',
				url: `/activites/listeref?${sourceUser}`,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken')
				}
			})
			.then((res) =>  setListeRef(res.data));
		
    }
	}, [sourceUser])

		// load dropdown from database listeModAcc
		useEffect(() => {
			if(sourceUser !== 'soon'){
	
				axios({
					method: 'get',
					url: `/activites/listemodeacc?${sourceUser}`,
					headers: {
						Authorization: 'Bearer ' + Cookies.get('authToken')
					}
				})
				.then((res) =>  setListeModAcc(res.data));
			
		}
		}, [sourceUser])

			// load dropdown from database listeYear
			useEffect(() => {
				if(sourceUser !== 'soon'){
		
					axios({
						method: 'get',
						url: `/activites/listeyear?${sourceUser}`,
						headers: {
							Authorization: 'Bearer ' + Cookies.get('authToken')
						}
					})
					.then((res) =>  setListeYear(res.data));
				
			}
			}, [sourceUser])


    //function source according to the user
    const getSourceUser = (fonction_id, p_user,ape_id) => {
		// console.log(fonction_id)
        switch (fonction_id) {
            //conseiller
            case 1:
                setSourceUser(`dc_agentreferent=${p_user}`)
                break;
            //ELP    
            case 2:
                setSourceUser(`dc_structureprincipalesuivi=${ape_id}`)
                break;
            //DTNE    
            case 3:
                setSourceUser( `dt=DTNE`)
                break;
            //DTSO    
            case 4:
                setSourceUser( `dt=DTSO`)
                break;
                
            //DR ADMIN
            case 5:
            case 6:
                setSourceUser(``)
                break;
                
            default : setSourceUser('soon') ;
		 }
		}

		useEffect(() => {
			// console.log('source' + sourceUser )
			getSourceUser(user.fonction_id, user.p_user,user.ape_id)

			if(sourceUser !== 'soon'){

					axios({
						method: 'get',
						url: `/activites?${sourceUser}`,
						headers: {
							Authorization: 'Bearer ' + Cookies.get('authToken')
						}
					})
					.then((res) =>  setDataActi(res.data))
				
			}}
		
		// eslint-disable-next-line react-hooks/exhaustive-deps
		, [sourceUser,user])

		const handleChange = (event) => {
			const name= event.target.name
			const value = event.target.value; 
			setSourceFilter({ ...sourceFilter, [name]: value }); 
		 };
	   
		 const [ checkUrl, setCheckUrl ] = useState('');
		 
		 const updateTable = () => {
		   let sql=''
		   for (let i=0;i<Object.keys(sourceFilter).length;i++){
			   if (i===Object.keys(sourceFilter).length-1){
			   sql=sql+Object.keys(sourceFilter)[i]+'='+Object.values(sourceFilter)[i]		
			   }
			   else{
			   sql=sql+Object.keys(sourceFilter)[i]+'='+Object.values(sourceFilter)[i]+'&'		
			   }
		   }
		//    console.log(sql)
		   axios({
			   method: 'get',
			   url: `/activites?${sourceUser}&${sql}`,
			   headers: {
				   Authorization: 'Bearer ' + Cookies.get('authToken')
			   }
		   })
		   .then(res => {setDataActi(res.data)}, setCheckUrl(`${sourceUser}&${sql}`))
		 }

		 useEffect(() => {
			if(sourceUser !== 'soon'){
		 updateTable()
			} 
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
		, [sourceFilter,sourceUser])

		//export excel
		
		const exportRef = () => {
			axios({
				method: 'get', 
				responseType: 'blob', 
				url: '/activitexlsx/ref?' + checkUrl,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken'),
				}
			})
			.then((response) => {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', 'activiteREF.xlsx'); 
				document.body.appendChild(link);
				link.click();
			 });
		}
	
	
	const exportApe = () => {
			axios({
				method: 'get', 
				responseType: 'blob', 
				url: '/activitexlsx/ape?' + checkUrl,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken'),
				}
			})
			.then((response) => {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', 'activiteAPE.xlsx'); 
				document.body.appendChild(link);
				link.click();
			 });
		
	}
	

		// const test= () => {
		// 	console.log(dataActi)
		// 	console.log(checkUrl)
		// }
	
	return (
		
	<div>
		{/* <button onClick={test}></button> */}
		<h4>Contacts DE inscrits au moins un jour dans le mois, affectés à un conseiller référent</h4>
		<h5>(sans situation,rattaché,en portefeuille)</h5>	
			<div>

				<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-outlined-label">Structure</InputLabel>
						<Select
						name="dc_structureprincipalesuivi"
						value={sourceFilter.dc_structureprincipalesuivi}
						onChange={handleChange}
						label="Structure"
						>
						<MenuItem value="all"><em>Tous</em></MenuItem>
						{listeStructure.map(option => (
						<MenuItem 
						key={option.dc_structureprincipalesuivi}
						value={option.dc_structureprincipalesuivi}
						>{option.dc_structureprincipalesuivi}</MenuItem>
						))}
						</Select>
				</FormControl>
				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel id="demo-simple-select-outlined-label">Référent</InputLabel>
					<Select
					name="dc_agentreferent"
					value={sourceFilter.dc_agentreferent}
					onChange={handleChange}
					label="Référent"
					>
					<MenuItem value="all"><em>Tous</em></MenuItem>
					{listeRef.map(option => (
					<MenuItem 
					key={option.dc_agentreferent}
					value={option.dc_agentreferent}
					>{option.dc_agentreferent}</MenuItem>
					))}
					</Select>
				</FormControl>
				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel id="demo-simple-select-outlined-label">Modalité d'acc</InputLabel>
					<Select
					name="dc_modalitesuiviaccomp_id"
					value={sourceFilter.dc_modalitesuiviaccomp_id}
					onChange={handleChange}
					label="Modalité d'acc"
					>
					<MenuItem value="all"><em>Tous</em></MenuItem>
					{listeModAcc.map(option => (
					<MenuItem 
					key={option.dc_modalitesuiviaccomp_id}
					value={option.dc_modalitesuiviaccomp_id}
					>{option.dc_modalitesuiviaccomp_id}</MenuItem>
					))}
					</Select>
				</FormControl>
				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel id="demo-simple-select-outlined-label">Année</InputLabel>
					<Select
					name="annee"
					value={sourceFilter.annee}
					onChange={handleChange}
					label="Année"
					>
					<MenuItem value="all"><em>Tous</em></MenuItem>
					{listeYear.map(option => (
					<MenuItem 
					key={option.annee}
					value={option.annee}
					>{option.annee}</MenuItem>
					))}
					</Select>
				</FormControl>
			               

			</div>
			
			
			<div>
			<ContactTab dataActi={dataActi}/>	 	 
			</div>
			<button onClick={exportRef}>Export selon filtre référent</button>
			<button onClick={exportApe}>Export selon filtre APE</button> 
					
	</div>	
	)
	;
};

export default Contacts;

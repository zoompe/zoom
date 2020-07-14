import React, { useContext,useState, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import EfoTab from './EfoTab';
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

const Efo = () => {

  const classes = useStyles();

  const [ sourceFilter, setSourceFilter ] = useState({
	dc_situationde: 'all',
	dc_parcours: 'all',
	dc_categorie: 'all',
	dc_statutaction_id: 'all',
	dc_formacode_id:'all',
});

	const { user } = useContext(UserContext);

	const [ dataEfo, setDataEfo ] = useState([]);

	const [ sourceUser, setSourceUser ] = useState('soon');
	const [ listeSituationde, setListeSituationde] = useState([]);
    const [ listeParcours, setListeParcours] = useState([]);
    const [ listeCategorie, setListecategorie] = useState([]);
    const [ listeStatutAction, setListeStatutAction] = useState([]);
    const [ listeFormacode, setListeformacode] = useState([]);

   // load dropdown from database listesituationde
    useEffect(() => {
		if(sourceUser !== 'soon'){

			axios({
				method: 'get',
				url: `/efo/listesituationde?${sourceUser}`,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken')
				}
			})
			.then((res) =>  setListeSituationde(res.data));
		
    }
	}, [sourceUser])

	// load dropdown from database listeParcours
    useEffect(() => {
		if(sourceUser !== 'soon'){

			axios({
				method: 'get',
				url: `/efo/listeparcours?${sourceUser}`,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken')
				}
			})
			.then((res) =>  setListeParcours(res.data));
		
    }
	}, [sourceUser])

		// load dropdown from database listeCategorie
		useEffect(() => {
			if(sourceUser !== 'soon'){
	
				axios({
					method: 'get',
					url: `/efo/listecategorie?${sourceUser}`,
					headers: {
						Authorization: 'Bearer ' + Cookies.get('authToken')
					}
				})
				.then((res) =>  setListecategorie(res.data));
			
		}
		}, [sourceUser])

			// load dropdown from database listeStatutAction
			useEffect(() => {
				if(sourceUser !== 'soon'){
		
					axios({
						method: 'get',
						url: `/efo/listestatutaction?${sourceUser}`,
						headers: {
							Authorization: 'Bearer ' + Cookies.get('authToken')
						}
					})
					.then((res) =>  setListeStatutAction(res.data));
				
			}
			}, [sourceUser])
	
   // load dropdown from database listeformacode
   useEffect(() => {
	if(sourceUser !== 'soon'){	
		axios({
			method: 'get',
			url: `/efo/listeformacode?${sourceUser}`,
			headers: {
				Authorization: 'Bearer ' + Cookies.get('authToken')
			}
		})
		.then((res) =>  setListeformacode(res.data));
	
}
}, [sourceUser])


    //function source according to the user
    const getSourceUser = (fonction_id, p_user,ape_id) => {
		// console.log(fonction_id)
        switch (fonction_id) {
            //conseiller
            case 1:
                setSourceUser(`dc_dernieragentreferent=${p_user}`)
                break;
            //ELP    
            case 2:
                setSourceUser(`dc_structureprincipalede=${ape_id}`)
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
			console.log('source' + sourceUser )
			getSourceUser(user.fonction_id, user.p_user,user.ape_id)

			if(sourceUser !== 'soon'){

					axios({
						method: 'get',
						url: `/efo?${sourceUser}`,
						headers: {
							Authorization: 'Bearer ' + Cookies.get('authToken')
						}
					})
					.then((res) =>  setDataEfo(res.data[0]))
				
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
			   url: `/efo?${sourceUser}&${sql}`,
			   headers: {
				   Authorization: 'Bearer ' + Cookies.get('authToken')
			   }
		   })
		   .then(res => {setDataEfo(res.data[0])}, setCheckUrl(`${sourceUser}&${sql}`))
		 }

		 useEffect(() => {
			if(sourceUser !== 'soon'){
		 updateTable()
			} 
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
		, [sourceFilter,sourceUser])

		//export excel
		
		const exportIDE = () => {
			axios({
				method: 'get', 
				responseType: 'blob', 
				url: '/efoxlsx/ide?' + checkUrl,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken'),
				}
			})
			.then((response) => {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', 'efoIDE.xlsx'); 
				document.body.appendChild(link);
				link.click();
			 });
			
		}
		const exportRef = () => {
			axios({
				method: 'get', 
				responseType: 'blob', 
				url: '/efoxlsx/ref?' + checkUrl,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken'),
				}
			})
			.then((response) => {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', 'efoREF.xlsx'); 
				document.body.appendChild(link);
				link.click();
			 });
		}
	
	
	const exportApe = () => {
			axios({
				method: 'get', 
				responseType: 'blob', 
				url: '/efoxlsx/ape?' + checkUrl,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken'),
				}
			})
			.then((response) => {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', 'efoAPE.xlsx'); 
				document.body.appendChild(link);
				link.click();
			 });
		
	}
	

		const test= () => {
		
			// console.log(listeSituationde)
			// console.log(sourceFilter)
			console.log(checkUrl)
		}
	
	return (
		
	<div>
		<button onClick={test}></button>
		<h1>Photo EFO DE en/hors portefeuille</h1>
			
			<div>
		
       
				<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-outlined-label">Situation DE</InputLabel>
						<Select
						name="dc_situationde"
						value={sourceFilter.dc_situationde}
						onChange={handleChange}
						label="Situation DE"
						>
						<MenuItem value="all"><em>Tous</em></MenuItem>
						{listeSituationde.map(option => (
						<MenuItem 
						key={option.dc_situationde}
						value={option.dc_situationde}
						>{option.dc_situationde}</MenuItem>
						))}
						</Select>
				</FormControl>
				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel id="demo-simple-select-outlined-label">Parcours DE</InputLabel>
					<Select
					name="dc_parcours"
					value={sourceFilter.dc_parcours}
					onChange={handleChange}
					label="Parcours DE"
					>
					<MenuItem value="all"><em>Tous</em></MenuItem>
					{listeParcours.map(option => (
					<MenuItem 
					key={option.dc_parcours}
					value={option.dc_parcours}
					>{option.dc_parcours}</MenuItem>
					))}
					</Select>
				</FormControl>
				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel id="demo-simple-select-outlined-label">Catégorie DE</InputLabel>
					<Select
					name="dc_categorie"
					value={sourceFilter.dc_categorie}
					onChange={handleChange}
					label="Catégorie DE"
					>
					<MenuItem value="all"><em>Tous</em></MenuItem>
					{listeCategorie.map(option => (
					<MenuItem 
					key={option.dc_categorie}
					value={option.dc_categorie}
					>{option.dc_categorie}</MenuItem>
					))}
					</Select>
				</FormControl>
				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel id="demo-simple-select-outlined-label">Statut Action</InputLabel>
					<Select
					name="dc_statutaction_id"
					value={sourceFilter.dc_statutaction_id}
					onChange={handleChange}
					label="Statut Action"
					>
					<MenuItem value="all"><em>Tous</em></MenuItem>
					{listeStatutAction.map(option => (
					<MenuItem 
					key={option.dc_statutaction_id}
					value={option.dc_statutaction_id}
					>{option.dc_statutaction_id}</MenuItem>
					))}
					</Select>
				</FormControl>
				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel id="demo-simple-select-outlined-label">Format Code</InputLabel>
					<Select
					name="dc_formacode_id"
					value={sourceFilter.dc_formacode_id}
					onChange={handleChange}
					label="Statut Action"
					>
					<MenuItem value="all"><em>Tous</em></MenuItem>
					{listeFormacode.map(option => (
					<MenuItem 
					key={option.dc_formacode_id}
					value={option.dc_formacode_id}
					>{option.dc_lblformacode}</MenuItem>
					))}
					</Select>
				</FormControl>
				{/* //test */}
				<select
              name='dc_formacode_id'
              defaultValue='all'
              onChange={handleChange}
              >
              <option value='all'>Tous</option>
              {listeFormacode.map(option => ( 
                  <option 
                    key={option.dc_formacode_id}
                    value={option.dc_formacode_id}
                    >
                      {option.dc_lblformacode}
                  </option>
                ))}         
            </select>
			
                              

			</div>
			
			
			<div>
			<EfoTab dataEfo={dataEfo}/>	 	 
			</div>
			<button onClick={exportIDE}>Export selon filtre IDE</button>
			<button onClick={exportRef}>Export selon filtre référent</button>
			<button onClick={exportApe}>Export selon filtre APE</button>
					
	</div>	
	)
	;
};

export default Efo;


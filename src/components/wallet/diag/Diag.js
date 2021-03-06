import React, { useContext, useState, useEffect } from 'react';
import Pmp from './onglets/Pmp';
import Re from './onglets/Re';
import Freins from './onglets/Freins';
import { UserContext } from '../../../contexts/UserContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './diag.css'
import ide from '../../../image/ide.png';
import ref from '../../../image/ref.png';
import ape from '../../../image/ape.png';
import { namefield } from '../../../utils/diagNameColonne';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const useToolbarStyles = makeStyles((theme) => ({
	root: {
	  paddingLeft: theme.spacing(2),
	  paddingRight: theme.spacing(1),
	},
	highlight:
	  theme.palette.type === 'light'
		? {
			color: theme.palette.secondary.main,
			backgroundColor: lighten(theme.palette.secondary.light, 0.85),
		  }
		: {
			color: theme.palette.text.primary,
			backgroundColor: theme.palette.secondary.dark,
		  },
	title: {
	  flex: '1 1 100%',
	},
  }));
  
  const EnhancedTableToolbar = (props) => {
	const classes = useToolbarStyles();
	const { numSelected } = props;
  
	return (
	  <Toolbar
		className={clsx(classes.root, {
		  [classes.highlight]: numSelected > 0,
		})}
	  >
		{numSelected > 0 && (
		  <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
			{numSelected} selected
		  </Typography>
		)}
  
	  </Toolbar>
	);
  };
  
  EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
  };

const Diag = () => {

	const { user } = useContext(UserContext);

	const [ dataDiag, setDataDiag ] = useState([]);
	const [ dataDiagLength, setDataDiagLength ] = useState(0);
	const [ sourceUser, setSourceUser ] = useState('soon');
	const [ multi, setmulti ] = useState(0);
	// const [field, setField] = useState(['dc_individu_local','dc_civilite'])


	const [ dataDiagMod, setDataDiagMod ] = useState({
colonne40 : "B",
colonne41 : "B",
colonne42 : "B",
colonne43 : "B",
colonne44 : "B",
colonne45 : "B",
colonne46 : "B",
colonne47 : "B",
colonne48 : "B",
colonne49 : "B",
colonne50 : "B",
colonne51 : "B",
colonne163 : "B",
colonne64 : "B",
colonne65 : "B",
colonne66 : "B",
colonne80 : "B",
colonne82 : "B",
colonne83 : "B",
colonne84 : "B",
colonne85 : "B",
colonne86 : "B",
colonne95 : "B",
colonne96 : "B",
colonne97 : "B",
colonne98 : "B",
colonne99 : "B",
colonne143: "B",
colonne144: "B",
colonne145: "B",
colonne146: "B",
colonne147: "B",
colonne160: "B",
colonne109: "O",
colonne113: "O",
colonne117: "O",
colonne122: "O",
colonne127: "O",
colonne136: "O",
colonne140: "O",
	})

	
	const [selected, setSelected] = useState([]);

	useEffect(() => {
		getFindUrl(user.fonction_id, user.p_user,user.ape_id)
		if(sourceUser !== 'soon'){
		let tempo = []
		let source = ''
		for (let i=0;i<Object.keys(dataDiagMod).length;i++){
				source = '/count/diag?'+Object.keys(dataDiagMod)[i]+'='+Object.values(dataDiagMod)[i]+sourceUser
				axios({
				   method: 'get',
				   url: source,
				   headers: {
					   Authorization: 'Bearer ' + Cookies.get('authToken')
				   }
			   })
			   .then((res) =>  tempo.push(res.data[0]))
			   .then(() => setDataDiagLength(tempo.length))
		
		
	}
	setDataDiag(tempo)
}}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	, [sourceUser,user])


	//function source according to the user
    const getFindUrl = (fonction_id, p_user,ape_id) => {
		// console.log(fonction_id)
        switch (fonction_id) {
            //conseiller
            case 1:
                setSourceUser(`&dc_dernieragentreferent=${p_user}`)
                break;
            //ELP    
            case 2:
                setSourceUser(`&dc_structureprincipalede=${ape_id}`)
                break;
            //DTNE    
            case 3:
                setSourceUser( `&dt=DTNE`)
                break;
            //DTSO    
            case 4:
                setSourceUser( `&dt=DTSO`)
                break;
                
            //DR ADMIN
            case 5:
            case 6:
				setSourceUser('')
                break;
                
            default : setSourceUser('soon') ;
		 }
		}


	const [ choice, setChoice ] = useState(0);

	const choice1 = (event) => {
		event.preventDefault()
		setChoice(1)
	}
	const choice2 = (event) => {
		event.preventDefault()
		setChoice(2)
	}
	const choice3 = (event) => {
		event.preventDefault(event)
		setChoice(3)
	}

	const  handleChangeMod = (event) => { 
        const name = event.target.name;
		const value = event.target.value;
		setDataDiagMod({...dataDiagMod, [name]: value })
		changeOne(name,value)
	}

	function updateOne(arr, namecol, newvalue) {
		const look = arr.map(el => {
			if(el.name === namecol){
				el.nb = newvalue
			}
			return el
		})
		return look;
	}

	const changeOne = (namecol,val) => {
		const sourceone = `/count/diag?${namecol}=${val}` + sourceUser
	
		// console.log(sourceone)
		axios({
		   method: 'get',
		   url: sourceone,
		   headers: {
			   Authorization: 'Bearer ' + Cookies.get('authToken')
		   }
	   })
	   .then(res => {
		   const copie = dataDiag
		   const updated = updateOne(copie, namecol, res.data[0].nb)
		   setDataDiag(updated)
		})
		
	}	
	

	//deselect all
	const deselect = () => {
		setSelected([]);
		setFilter([]);
	  };


	//select one
	  const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];
	
		if (selectedIndex === -1) {
		  newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
		  newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
		  newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
		  newSelected = newSelected.concat(
			selected.slice(0, selectedIndex),
			selected.slice(selectedIndex + 1),
		  );
		}
		setSelected(newSelected);
	  }; 
	  //end
	  
	  const [ checkUrl, setCheckUrl ] = useState('');
	  const [ filter, setFilter ] = useState([]);

	  const getResultMulti = () =>{

		  let url ='/count/diag?'
		  let checkedUrl=''
		  let filterName= []
		  if (selected.length>0){
			for (let i=0;i<selected.length;i++){
				if (i===0) {
				  checkedUrl += `${selected[i]}=${dataDiagMod[selected[i]]}`
				}
				else {
					checkedUrl += `&${selected[i]}=${dataDiagMod[selected[i]]}`
				}
				filterName.push(`${namefield(selected[i])}=${dataDiagMod[selected[i]]}`)
				
			}
				  const sourcemulti = url + checkedUrl + sourceUser
				  axios({
				  method: 'get',
				  url: sourcemulti,
				  headers: {
					  Authorization: 'Bearer ' + Cookies.get('authToken')
				  }
			  })
			  .then(res => {setmulti(res.data[0].nb)}, setCheckUrl(checkedUrl+ sourceUser),setFilter(filterName))
		  } else {
			setmulti(0)
			setFilter([])
		  }
	}

	useEffect(() => {
		getResultMulti()
	}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	, [selected])

	useEffect(() => {
		getResultMulti()
	}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	, [dataDiagMod])

	// const test= () => {
	// 	console.log(checkUrl)
	// }

	const exportIDE = () => {
		axios({
			method: 'get', 
			responseType: 'blob', 
			url: '/diagxlsx/ide?' + checkUrl,
			headers: {
				Authorization: 'Bearer ' + Cookies.get('authToken'),
			}
		})
		.then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'diagIDE.xlsx'); 
			document.body.appendChild(link);
			link.click();
		 });
		
	}
	const exportRef = () => {
		axios({
			method: 'get', 
			responseType: 'blob', 
			url: '/diagxlsx/ref?' + checkUrl,
			headers: {
				Authorization: 'Bearer ' + Cookies.get('authToken'),
			}
		})
		.then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'diagRef.xlsx'); 
			document.body.appendChild(link);
			link.click();
		 });
		
	}


const exportApe = () => {
	axios({
		method: 'get', 
		responseType: 'blob', 
		url: '/diagxlsx/ape?' + checkUrl,
		headers: {
			Authorization: 'Bearer ' + Cookies.get('authToken'),
		}
	})
	.then((response) => {
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', 'diagApe.xlsx'); 
		document.body.appendChild(link);
		link.click();
	 });
	
}

	return (
	<div>
	{/* <button onClick={test}> test</button> */}
	
	{(dataDiagLength===40) &&
	<>
	<h4>Photo diagnostic DE en portefeuille</h4>
	{(multi>0) && 
	<div className='excel'>
 	<img onClick={exportIDE} src={ide} alt='IDE' title='Resultat multi-critères par IDE'/>
 	<img onClick={exportRef} src={ref} alt='REF' title='Resultat multi-critères par REF'/>
 	<img onClick={exportApe} src={ape} alt='APE' title='Resultat multi-critères par APE'/>
	</div>
}
	<button className={choice===1 ? "on" : "off"} onClick={choice1}>Projet et mobilité professionnelle</button>
	<button className={choice===2 ? "on" : "off"} onClick={choice2}>Recherche d'emploi</button>
	<button className={choice===3 ? "on" : "off"}onClick={choice3}>Freins périphériques à l'emploi</button>
	</>
}	
	<EnhancedTableToolbar numSelected={selected.length} />
	
	{(dataDiagLength<40) &&
	<h3>Chargement en cours {dataDiagLength} sur 40 </h3> 
}
	
	{(choice===1) && <Pmp 
	dataDiagMod={dataDiagMod}
	handleChangeMod={handleChangeMod}
	dataDiag1={dataDiag.filter(el => el.groupe2 === 'Profil et situation')}
	dataDiag2={dataDiag.filter(el => el.groupe2 === 'Projet professionnel')}
	dataDiag3={dataDiag.filter(el => el.groupe2 === 'Marché du travail, environnement professionnel')}
	selected={selected}
	handleClick={handleClick}
	choice={choice}
	/>}
	{(choice===2) && <Re
		dataDiagMod={dataDiagMod}
		handleChangeMod={handleChangeMod}
		dataDiag1={dataDiag.filter(el => el.groupe2 === 'Stratégie')}
		dataDiag2={dataDiag.filter(el => el.groupe2 === 'Techniques')}
		dataDiag3={dataDiag.filter(el => el.groupe2 === 'Capacités numériques')}
		dataDiag4={dataDiag.filter(el => el.groupe2 === "Retour direct à l'emploi")}
		selected={selected}
		handleClick={handleClick}
		choice={choice}
		/>
	}
	{(choice===3) && <Freins
		dataDiagMod={dataDiagMod}
		handleChangeMod={handleChangeMod}
		dataDiag1={dataDiag.filter(el => el.groupe2 === "Freins périphériques à l'emploi")}
		selected={selected}
		handleClick={handleClick}
		choice={choice}
		/>
	}
		{(choice>0) &&
	<>
	<h4>Résultat multi critères: {multi.toLocaleString()} DE</h4>
	<h5>Critères:</h5>
		  <IconButton aria-label="delete" onClick={deselect}>
            <DeleteIcon />
          </IconButton>
	<ol className='diag-ol'>
	{filter.map(el => (
	<li key={el}>
		{el}
	</li>)
	)}
	</ol>

	</>
	}

	</div>
)};

export default Diag;


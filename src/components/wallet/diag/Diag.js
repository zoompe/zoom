import React, { useContext, useState, useEffect } from 'react';
import Pmp from './onglets/Pmp';
import { UserContext } from '../../../contexts/UserContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
	const [ sourceUser, setSourceUser ] = useState('');

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
	})

	//to do
	const [selected, setSelected] = useState([]);

	const sourceAll = [
		"/count/diag?colonne40=",
		"/count/diag?colonne41=",
		"/count/diag?colonne42=",
		"/count/diag?colonne43=",
		"/count/diag?colonne44=",
		"/count/diag?colonne45=",
		"/count/diag?colonne46=",
		"/count/diag?colonne47=",
		"/count/diag?colonne48=",
		"/count/diag?colonne49=",
		"/count/diag?colonne50=",
		"/count/diag?colonne51=",
		"/count/diag?colonne163=",
	]

	

	useEffect(() => {
		console.log ("ttt")
		getFindUrl(user.fonction_id, user.p_user,user.ape_id)
		let tempo = []
		for (let i=0;i<sourceAll.length;i++){
			// if(sourceUser !== ''){
				let source = sourceAll[i]+Object.values(dataDiagMod)[i]+sourceUser
				console.log(source)
				axios({
				   method: 'get',
				   url: source,
				   headers: {
					   Authorization: 'Bearer ' + Cookies.get('authToken')
				   }
			   })
			   .then((res) =>  tempo.push(res.data[0]))
		// }
	}
	setDataDiag(tempo)
	}
	, [sourceUser,user.fonction_id])


	//function source according to the user
    const getFindUrl = (fonction_id, p_user,ape_id) => {
		console.log(fonction_id)
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
                
            default : console.log('function_id missing') ;
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
	}

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
	
	const test =() => {
		console.log(dataDiagMod)
		console.log(dataDiag)
	}
	

	return (
	<div>
		<button onClick={test}>test</button>
	<h1>Photo Diag DE en portefeuille</h1>
	<button onClick={choice1}>Projet et mobilité professionnelle</button>
	<button onClick={choice2}>Recherche d'emploi</button>
	<button onClick={choice3}>Freins périphériques à l'emploi</button>

	<EnhancedTableToolbar numSelected={selected.length} />
	
	{(choice===1) && <Pmp 
	dataDiagMod={dataDiagMod}
	handleChangeMod={handleChangeMod}
	dataDiag={dataDiag}
	selected={selected}
	handleClick={handleClick}
	/>
	
	}
	
	</div>
	)};

export default Diag;

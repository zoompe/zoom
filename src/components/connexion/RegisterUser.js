import React, { useState, useEffect } from 'react';
import { SnackbarContent } from '@material-ui/core';
import Select from '../shared/Select';
import SelectFonction from './Select/SelectFonction';
import SelectTeam from './Select/SelectTeam';
import SelectStructure from './Select/SelectStructure';
import { isUserPermitted } from '../../utils/permissions';
import { CONSEILLER, ELP } from '../../utils/permissionsTypes';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './registerUser.css';

const RegisterUser = () => {

    const history = useHistory();

    const [ register, setRegister ] = useState({idgasi: '' , name: '',
    function_id: '', team_id: null , password: '', p_user: '' , ape_id: null , flash:''});

    
    const [ listFunction, SetListFunction] = useState([]);
    const [ listTeam, SetListTeam] = useState([]);
    const [ listAPE, SetListAPE] = useState([]);
    const [ listPuser, SetListPuser] = useState([]);

   // load datas from database - Mimic ComponentDidMount
    useEffect(() => {
    axios.get('/fonctions')
    .then(res => { 
        SetListFunction(res.data);
    })
    }, [])
    useEffect(() => {
        axios.get('/teams')
        .then(res => { 
            SetListTeam(res.data);
        })
        }, [])
    useEffect(() => {
        axios.get('/apes')
        .then(res => { 
            SetListAPE(res.data);
        })
        }, [])
    useEffect(() => {
        axios.get('/pusers')
        .then(res => { 
            SetListPuser(res.data.map(el => el.dc_dernieragentreferent));
        })
        }, []) 
        
   
        useEffect(() => {
            if (register.flash === 'User has been signed up !') history.push({pathname: '/'})
        }, [register,history])    



    const  handleChange = (event) => { 
        const name = event.target.name;
        const value = event.target.value;
        if  (name === 'function_id') {
        setRegister({...register, [name]: value, team_id: null , p_user: '' , ape_id: null})   
        } 
        else {
        setRegister({...register, [name]: value })
        }
    }
 
    //   const handleSubmit= (event) => {
    //     event.preventDefault();
    //     axios.post('/auth/signup', register)
    //       .then(response => {
    //           console.log(response.data)
    //         setRegister({...register, flash: response.flash })
    //       })
    //       .catch(error => {
    //         setRegister({...register, flash: error.flash })
    //         console.log(register)
    //       }) 
    // }

    const handleSubmit = (event) => {
         event.preventDefault();
                  fetch("/auth/signup",
              {
                  method:  'POST',
                  headers:  new  Headers({
                      'Content-Type':  'application/json'
                  }),
                  body:  JSON.stringify(register),
              })
              .then(res  =>  res.json())
              .then(
                  res  => setRegister({...register, flash: res.flash}),
                  err  =>  setRegister({...register, flash: err.flash })
              )
    }
    

      
      return (
        <div className="login">
        <div className="container">
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>Register</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                </div>
                                <input type="text" className="form-control" placeholder="idgasi" required
                                name="idgasi" value={register.idgasi} onChange={handleChange}>
                                </input>
                            </div>    
                           
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div>
                                <input type="text" className="form-control" placeholder="name" required
                                name="name" value={register.name} onChange={handleChange}>
                                </input>
                            </div>
                            
                                <SelectFonction
                               name = 'function_id'
                               options = {listFunction} //database
                               handleChange = {handleChange}
                               placeholder = {'Select fonction'}
                                />  
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div>
                                <input type="password" className="form-control" placeholder="password" required
                                name="password" value={register.password} onChange={handleChange}>
                                </input>
                            </div>
                            {isUserPermitted(CONSEILLER, register.function_id) &&
                             <div>
                               <SelectTeam
                               name = 'team_id'
                               options = {listTeam} //database
                               handleChange = {handleChange}
                               placeholder = {'Select team'}
                                /> 
                                <Select 
                                name = 'p_user' 
                                options = {listPuser} //database
                                value = {register.p_user}
                                handleChange = {handleChange}
                                />
                                <SelectStructure
                               name = 'ape_id'
                               options = {listAPE} //database
                               handleChange = {handleChange}
                               placeholder = {'Select APE'}
                                /> 
                            </div>
                             }
                            {isUserPermitted(ELP,  register.function_id) &&
                             <div>
                                <SelectTeam
                               name = 'team_id'
                               options = {listTeam} //database
                               handleChange = {handleChange}
                               placeholder = {'Select team'}
                                /> 
                                <SelectStructure
                               name = 'ape_id'
                               options = {listAPE} //database
                               handleChange = {handleChange}
                               placeholder = {'Select APE'}
                                />  
                              
                            </div>
                            }
                             <div className="card-footer">
                                <div className="d-flex justify-content-center links">
                                <input type="submit" value="Register" className="btn float-right login_btn"></input>
                                </div>
                            </div>   
                        </form>
                        </div>
                    <div>
				        <div className="d-flex justify-content-center links">
                        <Link className="btn float-right login_btn" to="/">Already have an account? Sign in</Link>
				    </div>
			        </div>
                </div>
            </div>
        </div>
                <div> 
                   {register.flash &&  <SnackbarContent message={register.flash} />}
               </div>
        </div>          
                   
    )
}


export default RegisterUser;


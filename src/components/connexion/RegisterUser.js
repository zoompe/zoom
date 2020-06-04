import React, { useState } from 'react';
import Select from '../shared/Select';
import { isUserPermitted } from '../../utils/permissions';
import { CONSEILLER, ELP } from '../../utils/permissionsTypes';
import { Link } from 'react-router-dom';
import './registerUser.css';

const RegisterUser = () => {


    const [ register, setRegister ] = useState({idgasi: '' , name: '', 
    function: '', password: '', team: '', user: '' , structure:''});

    const  handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setRegister({...register, [name]: value })
        
      }
    
      const regist= (event) => {
        event.preventDefault();
        console.log(register)
      //do someting
    
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
                        <form onSubmit={regist}>
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
                            
                                <Select 
                               name = 'function' 
                               options = {['Conseiller','ELP','DTNE', 'DTSO', 'DR' ]} //database
                               value = {register.function}
                               handleChange = {handleChange}
                                />  
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div>
                                <input type="password" className="form-control" placeholder="password" required
                                name="password" value={register.password} onChange={handleChange}>
                                </input>
                            </div>
                            {isUserPermitted(CONSEILLER, register.function) &&
                             <div>
                                <Select 
                                name = 'team' 
                                options = {['Equipe 1','Equipe 2','Equipe 3', 'Equipe 4' ]} //database
                                value = {register.team}
                                handleChange = {handleChange}
                                />
                                <Select 
                                name = 'user' 
                                options = {['P000617 - XXXX','P000294 - XXXX','P000131 - XXXX', 'P000530 - XXXX' ]} //database
                                value = {register.user}
                                handleChange = {handleChange}
                                />
                                <Select 
                                name = 'structure' 
                                options = {['97801','97802','97803', '97804' ]} //database
                                value = {register.structure}
                                handleChange = {handleChange}
                                /> 
                              
                            </div>
                            }
                            {isUserPermitted(ELP,  register.function) &&
                             <div>
                                <Select 
                                name = 'team' 
                                options = {['Equipe 1','Equipe 2','Equipe 3', 'Equipe 4' ]} //database
                                value = {register.team}
                                handleChange = {handleChange}
                                />
                                <Select 
                                name = 'structure' 
                                options = {['97801','97802','97803', '97804' ]} //database
                                value = {register.structure}
                                handleChange = {handleChange}
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
        </div>          
                   
    )
}


export default RegisterUser;


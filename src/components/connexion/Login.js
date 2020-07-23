import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { SnackbarContent } from '@material-ui/core';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import './login.css';


const Login = () => {
    const { user, logUser } = useContext(UserContext)
   
    const [ login, setLogin ] = useState({idgasi: '' , password: ''});

    const history = useHistory();
    

 const  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLogin({...login, [name]: value })
    
  }

    useEffect(() => {
        if (Cookies.get('authToken')) 
        {history.push({pathname: '/home/main'})}
        else {history.push({pathname: '/'})}
    }
    , [user,history])

//     useEffect(() => {
//    console.log(user)
//     }, [user])


    const log= (event) => {
        event.preventDefault();
        logUser(login)
    }


      return (
        <div className="login">
        <div className="container">
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>Login</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={log}>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                </div>
                                <input type="text" className="form-control" placeholder="idgasi" required
                                name="idgasi" value={login.idgasi} onChange={handleChange}>
                                </input>
                                
                            </div>    
                           
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div>
                                <input type="password" className="form-control" placeholder="password" required
                                name="password" value={login.password} onChange={handleChange}>
                                </input>
                            </div>
                            <div className="card-footer">
                                <div className="d-flex justify-content-center links">
                                <input type="submit" value="Valider" className="btn float-right login_btn"></input>
                                </div>
                            </div> 
                        </form>
                    </div>
                    <div>
				        <div className="d-flex justify-content-center links">
                        <Link className="btn float-right login_btn" to="/register">Créer compte</Link>
				        </div>
			        </div>
                    <div>
				        <div className="d-flex justify-content-center links">
                        {user.flash &&  <SnackbarContent message={user.flash} />}
				        </div>
			        </div>
                </div>
            </div>
        </div>
        <div> 
                  
               </div>
        </div>          
                   
    )
}

export default Login;


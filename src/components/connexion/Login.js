import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { SnackbarContent } from '@material-ui/core';
import './login.css';


const Login = () => {
    const { user, logUser } = useContext(UserContext)
   
    const [ login, setLogin ] = useState({idgasi: '' , password: ''});
    

 const  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLogin({...login, [name]: value })
    
  }

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
                        <h3>Login to your Account</h3>
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
                                <input type="submit" value="Login" className="btn float-right login_btn"></input>
                                </div>
                            </div> 
                        </form>
                    </div>
                    <div>
				        <div className="d-flex justify-content-center links">
                        <Link className="btn float-right login_btn" to="/register">Don't have an account? Register</Link>
				        </div>
			        </div>
                    <div>
				        <div className="d-flex justify-content-center links">
                        <button type="submit" className="btn float-right login_btn" to="">Forgotten your password? Recover password</button>
				        </div>
			        </div>
                </div>
            </div>
        </div>
        <div> 
                   {user.flash &&  <SnackbarContent message={user.flash} />}
               </div>
        </div>          
                   
    )
}

export default Login;


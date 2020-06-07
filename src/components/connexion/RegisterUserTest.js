import React from 'react';
import SelectUseForm from '../shared/Select';
// import { isUserPermitted } from '../../utils/permissions';
// import { CONSEILLER, ELP } from '../../utils/permissionsTypes';
import { useForm } from 'react-hook-form'
import './registerUser.css';

const RegisterUserTest = () => {

    const{register,handleSubmit}=useForm()

    // const [ functionUser, setFunctionUser ] = useState('');

    const onSubmit = (data) => {
        console.log(data)
    }

    // const  handleChange = (event) => {
    //     setFunctionUser( event.target.value )
    //     console.log(functionUser)
    //   }

      return (
        <div className="login">
        <div className="container">
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>Register</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                </div>
                                <input type="text" className="form-control" placeholder="idgasi"
                                name="idgasi" ref={register}>
                                </input>
                            </div>    
                           
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div>
                                <input type="text" className="form-control" placeholder="name"
                                name="name" ref={register}>
                                </input>
                            </div>
                            
                                <SelectUseForm 
                            //    handleChange = {handleChange}
                               name = 'function' 
                               options = {['Conseiller','ELP','DTNE', 'DTSO', 'DR' ]} //database
                               register={register}
                                />  
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div>
                                <input type="password" className="form-control" placeholder="password"
                                name="password" ref={register}>
                                </input>
                            </div>
                            {/* {isUserPermitted(CONSEILLER, functionUser) && */}
                             <div>
                                <SelectUseForm 
                                name = 'team' 
                                options = {['Equipe 1','Equipe 2','Equipe 3', 'Equipe 4' ]} //database
                                register={register}
                                />
                                   <SelectUseForm 
                                name = 'user' 
                                options = {['P000617 - XXXX','P000294 - XXXX','P000131 - XXXX', 'P000530 - XXXX' ]} //database
                                register={register}
                                />
                                    <SelectUseForm 
                                name = 'structure' 
                                options = {['97801','97802','97803', '97804' ]} //database
                                register={register}
                                /> 
                              
                            </div>
                            {/* } */}
                            {/* {isUserPermitted(ELP,  functionUser) && */}
                             <div>
                                <SelectUseForm 
                                name = 'team' 
                                options = {['Equipe 1','Equipe 2','Equipe 3', 'Equipe 4' ]} //database
                                register={register}
                                />
                                <SelectUseForm 
                                name = 'structure' 
                                options = {['97801','97802','97803', '97804' ]} //database
                                register={register}
                                /> 
                              
                            </div>
                            {/* } */}


                            <div className="form-group">
                                <input type="submit" value="Register" className="btn float-right login_btn"></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>          
                   
    )
}


export default RegisterUserTest;


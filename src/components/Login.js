// https://blog.logrocket.com/handling-user-authentication-redux-toolkit/

import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Input from "./form/Input";

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../redux/actions/userAction'


const Login = () => {
    // Redux
    const { loading, userInfo, error } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
  
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [ jwtToken, setJwtToken ] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertClassName, setAlertClassName] = useState("d-none");
    // const { setAlertClassName } = useOutletContext();
    // const { setAlertMessage } = useOutletContext();
    // const { toggleRefresh } = useOutletContext();
    
    // redirect authenticated user to keywords page
    useEffect(() => {
        if (userInfo) {
            navigate('/keywords')
        }
    }, [navigate, userInfo])
    
    
    const submitForm = (data) => {
      dispatch(userLogin(data))
      navigate("/keywords");
    }

    return(
        <div className="col-md-6 offset-md-3">
            <h2>Login</h2>
            <hr />

            <form onSubmit={handleSubmit(submitForm)}>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                    type='email'
                    className='form-input form-control'
                    {...register('email')}
                    required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                    type='password'
                    className='form-input form-control'
                    {...register('password')}
                    required
                    />
                </div>
                {/* <Input
                    title="Email Address"
                    type="email"
                    className="form-control"
                    name="email"
                    autoComplete="email-new"
                    {...register('email')}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <Input
                    title="Password"
                    type="password"
                    className="form-control"
                    name="password"
                    autoComplete="password-new"
                    {...register('password')}
                    onChange={(event) => setPassword(event.target.value)}
                /> */}

                <hr />

                <input 
                    type="submit"
                    className="btn btn-primary"
                    value="Login"
                />


            </form>
        </div>
    )
}

export default Login;
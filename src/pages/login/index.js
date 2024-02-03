import React, { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/index.ts';
import "./index.scss";
import { Link } from 'react-router-dom';

const reducer = (state,action) => {
    return {
        ...state,
        ...action
    }
};

const initialState = {
    username: 'admin001@mailinator.com',
    password: 'succ@123'
}

const PageLogin = () => {
    const reduxDispatch = useDispatch();
    const [state, dispatch] = useReducer(reducer, initialState);
    const { username, password } = state;

    const loginFn = e => {
        e.preventDefault();
        reduxDispatch(login({ username, password }));
    };

    return (
        <div className='login-wrap'>
            <div className='logo-container'>
                <img src='./logo.png' alt='LOGO' />
            </div>
            <form className='login-box' onSubmit={loginFn}>
                <h3>Login</h3>
                <label className='form-group'>
                    <div className='form-label'>Username</div>
                    <input className='form-control' type="text" value={username} onChange={e=>dispatch({username:e?.target?.value})} placeholder="Username" />
                </label>
                <label className='form-group'>
                    <div className='form-label'>Password</div>
                    <input className='form-control password' type="password" value={password} onChange={e=>dispatch({password:e?.target?.value})} placeholder="Password" />                    
                </label>
                <div className='login-footer'>
                    <Link to="/signup">Signup</Link>
                    <button className='btn-primary' type="submit">Login</button>
                </div>
            </form>
        </div>
    );
};

export default PageLogin;

import React from 'react';
import { logOut } from '../../store/slices/auth.ts';
import "./index.scss";
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';

const Header = () => {
    const reduxDispatch = useAppDispatch();
    const { userDetails } = useAppSelector(state => state.auth);
    const navigate = useNavigate();

    const handleLogout = () => {
        reduxDispatch(logOut());
        navigate('/');
    }

    return <header>
        <div className='header-logo'>
            <img src='./logo.png' alt="LOGO" />
        </div>
        <ul className='main-nav'>
            <li><Link to="/">Home</Link></li>
            {userDetails?.type === 1 ? <li><Link to="/users">Users</Link></li> : null}
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/purchases">Purchases</Link></li>
        </ul>
        <button className='btn-primary' type="button" onClick={()=>handleLogout()}><span className="material-symbols-outlined">logout</span></button>
    </header>;
};

export default Header;

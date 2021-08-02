import React from 'react';
import './header.css';
import logo from '../media/milk_spilt_logo.png';
import { Link, useHistory } from 'react-router-dom';

const Header = () => {
    const history = useHistory();

    const routeChange = () =>{ 
    history.push('/askQuestion');
    }

    return (
        <header className='home-header'>
            <div className='logo-area'>
                <Link to="/" ><img src={logo} alt="Milk Spilt Logo"/></Link> 
                <Link to="/" className='co-name'>Milk Spilt</Link> 
            </div>
            <div className='search-area'>
                <form className='search'>
                    <input type='text' placeholder='Search...'/>
                </form>
                <button onClick={routeChange}>Ask Question</button>
            </div>
            <div className='login-area'>
                <button>Log In｜Sign Up</button>
            </div>
        </header>
    );
}

export default Header;
//rafce + Enter

import React from 'react';
import { Link } from 'react-router-dom';
//import Spinner from '../Spinner/Spinner';

const NavBar = () => {
  return (
    <React.Fragment>
        <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
            <div className="container">
                <Link to={'/'} className='navbar-brand'>
                    <i className='fa fa-mobile text-warning'>{' '}
                      <span className='text-light'>Contact</span>{' '}<span className='text-warning'>manager</span>
                    </i>
                </Link>
            </div>
        </nav>
    </React.Fragment>
    
  )
};

export default NavBar;
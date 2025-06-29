import React from 'react';
import { Link, NavLink } from 'react-router';
import ProfastLogo from '../ProfastLogo/ProfastLogo';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()

  }

  const navItems = <>

    <li><NavLink to='/'>Home</NavLink></li>
    <li><NavLink to='/covarage'>Coverage</NavLink></li>
    <li><NavLink to='/sendPercel'>Send A Percel</NavLink></li>
    {
      user && <> <li><NavLink to='/dashBoard'>DashBoard</NavLink></li></>
    }

    <li><NavLink to='/about'>Pricing</NavLink></li>
    <li><NavLink to='/about'>Be a Rider</NavLink></li>
  </>


  return (
    <div className="navbar bg-base-100 shadow-sm p-3 rounded-2xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {

              navItems
            }
          </ul>
        </div>

        <ProfastLogo></ProfastLogo>

      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {
            navItems
          }
        </ul>
      </div>
      <div className="navbar-end gap-4">
        {
          user ? <button className='btn ' onClick={handleLogout}>Logout</button> : <Link to='/login'><button className='btn '>Sign In</button></Link>
        }

        <button className='btn bg-[#CAEB66] text-black font-bold'>Be a rider</button>
      </div>
    </div>
  );
};

export default Navbar;
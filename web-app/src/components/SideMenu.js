import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './styles/SideMenu.css';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';

function SideMenu({activeLink}) {
  const [isOpen, setIsOpen] = useState(false);
  // const [cookies,removeCookie] = useCookies(['']);

  const [cookies, setCookie, removeCookie] = useCookies(['gg_token']);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const logout=(e)=>{
    console.log('deleting');
    removeCookie("gg_token")
    // window.location.reload();
    // let gg_token=cookies.gg_token
    // console.log(gg_token)
    navigate('/login')
  }
  


    useEffect(()=>{
      let gg_token=cookies.gg_token
        if(!gg_token){
          navigate('/login');
        }
    },[])



  return (
    <div className={`side-menu ${isOpen ? 'open' : ''}`}>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <nav>
        <ul>
          <li>
            <NavLink exact to="/" activeClassName="active-link" 
            className={activeLink==='home'?'active-link':""}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/plan-payments" activeClassName="active-link"
            className={activeLink==='plans'?'active-link':""}>
              Plan & Payments
            </NavLink>
          </li>
          <li>
            <NavLink to="/usage" activeClassName="active-link"
            className={activeLink==='usage'?'active-link':""}>
              Usage
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" activeClassName="active-link"
            className={activeLink==='settings'?'active-link':""}>
              Settings
            </NavLink>
          </li>
          <li className='logoutBtn' onClick={logout}>
              Logout
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SideMenu;

// src/Navbar.js
import React, { useState } from 'react';
import './styles/Navbar.css'
import Logo from './Logo'
import {Link} from 'react-router-dom'
import { Link as ScrollLink, Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Logo bottom='20px'/>
      </div>
      <div className={`menu-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li style={{cursor:'pointer'}}>
        <ScrollLink  to="specialty" spy={true} smooth={true}>
        Explore
        </ScrollLink>
        </li>
        {/* <li><a href='#specialty'></a></li> */}
        <li><Link to="https://app.gazeguard.io" target='_blank'>My Account</Link></li>
        <li style={{cursor:'pointer'}}>
        <ScrollLink  to="about" spy={true} smooth={true}>
        About
        </ScrollLink>
        </li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="https://chromewebstore.google.com/detail/gaze-guard-media-detector/kcohnlgnpfkaapflhnhkgojlnnppfajl?authuser=3&hl=en"
        target='_blank'>
            <button id='installBtn'>Install</button>
        </Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
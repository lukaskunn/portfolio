import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import './styles.css';

function PageHeader() {
    const [scrolled, setScrolled] = useState(false);

    const changeBackground = () => {
        if(window.scrollY >= 200){
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    }
    
    useEffect(() => {
        window.addEventListener('scroll', changeBackground);
    })
    
    let x=['page-header'];
    if(scrolled){
        x.push('scrolled');
    }

    return (
        <div className={x.join(" ")}>
            <div className="logo">
                <h3>Lucas OLIVEIRA</h3>
            </div>
            <div className="menu">
                <HashLink smooth to="/#home" className="menu-item">Home</HashLink>
                <HashLink smooth to="/#about" className="menu-item">About</HashLink>
                <HashLink smooth to="/#services" className="menu-item">Services</HashLink>
                <HashLink smooth to="/#projects" className="menu-item">Projects</HashLink>
                <HashLink smooth to="/#contact" className="menu-item">Contacts</HashLink>
            </div>
        </div>
    );
}

export default PageHeader;
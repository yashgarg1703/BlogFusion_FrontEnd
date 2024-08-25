import { NavLink } from "react-router-dom";
import { useState } from "react";
import './Navbar.css'
import { useAuth } from "../store(context API)/authContextAPI";

const Navbar = () => {
    const { isToken } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="navbar-container">
            <div className="logo-brand">
                <h1>BlogFusion</h1>
                <button className="hamburger" onClick={toggleMenu}>
                &#9776;
            </button>
            </div>
           
            <div > 
            <ul className={`navbar-list ${isOpen ? 'open' : ''}`}>
                <li className="navbar-content">
                    <NavLink exact to="/" activeClassName="active-link" onClick={toggleMenu}> Home </NavLink>
                </li>
                <li className="navbar-content">
                    <NavLink to="/blogs" activeClassName="active-link" onClick={toggleMenu}> Blogs </NavLink>
                </li>
                <li className="navbar-content">
                    <NavLink to="/createBlogs" activeClassName="active-link" onClick={toggleMenu}>Write Blog</NavLink>
                </li>
                <li className="navbar-content">
                    <NavLink to="/contact" activeClassName="active-link" onClick={toggleMenu}> Contact </NavLink>
                </li>
                {isToken ? (
                    <>
                        <li className="navbar-content">
                            <NavLink to="/dashboard" activeClassName="active-link" onClick={toggleMenu}>Dashboard</NavLink>
                        </li>
                    </>
                ) : (
                    <>
                        
                        <li className="navbar-content">
                            <NavLink to="/login" activeClassName="active-link" onClick={toggleMenu}> LogIn </NavLink>
                        </li>
                    </>
                )}
            </ul>
            </div>
        </div>
    );
}

export default Navbar;

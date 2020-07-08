import React, { useContext, useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";

export const Header = () => {
    const { isLoggedIn, logout } = useContext(UserProfileContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand tag={RRNavLink} to="/">GiFTER</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/">Feed</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/posts/add">New Post</NavLink>
                                </NavItem>
                            </>
                        }
                        {!isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                                </NavItem>
                            </>
                        }
                    </Nav>
                    {isLoggedIn &&
                        <Nav navbar>
                            <NavItem>
                                <a aria-current="page" className="nav-link"
                                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                            </NavItem>
                        </Nav>
                    }
                </Collapse>
            </Navbar>
        </div>
    );
};

{/* <nav className="navbar navbar-expand navbar-dark bg-info">
<Link to="/" className="navbar-brand">
    GiFTER
</Link>
<ul className="navbar-nav mr-auto">
    <li className="nav-item">   
        <Link to="/" className="nav-link">
            Feed
        </Link>
    </li>
    <li className="nav-item">
        <Link to="/posts/add" className="nav-link">
            New Post
        </Link>
    </li>
</ul>
</nav> */}
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FaHome, FaUtensils, FaSignInAlt } from 'react-icons/fa';

const Navigation = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('');

    useEffect(() => {
        // Get user role from localStorage
        const userRole = localStorage.getItem('role');
        setRole(userRole);
    }, []);

    const handleLogout = () => {
        // Clear local storage
        localStorage.clear();

        // Navigate to login page
        navigate('/');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
            <Navbar.Brand as={NavLink} to="/" className="ms-3 fw-bold">
                Gallery Cafe
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto me-3">
                    {/* Common Links for All Roles */}
                    <Nav.Link as={NavLink} to="/home" exact className="px-3">
                        <FaHome className="me-2" />
                        Home
                    </Nav.Link>
                    {/* <Nav.Link as={NavLink} to="/menu" className="px-3">
                        <FaUtensils className="me-2" />
                        Menu
                    </Nav.Link> */}

                    {/* Admin-Specific Links */}
                    {role === 'admin' && (
                        <>
                            <NavDropdown title="Admin" id="admin-dropdown" className="px-3">
                                <NavDropdown.Item as={NavLink} to="/allreservation">
                                    All Reservations
                                </NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/addmenu">
                                    Add Menu Item
                                </NavDropdown.Item>
                            </NavDropdown>
                               <Nav.Link as={NavLink} to="/menu" className="px-3">
                        <FaUtensils className="me-2" />
                        Menu
                    </Nav.Link> 
                           
                        </>
                    )}

                    {/* Operational-Specific Links */}
                    {role === 'operational' && (
                        <NavDropdown title="User" id="user-dropdown" className="px-3">
                            <NavDropdown.Item as={NavLink} to="/allreservation">
                                Reservations
                            </NavDropdown.Item>
                        </NavDropdown>
                    )}

                    {/* Logout Link (Visible to All) */}
                    <Nav.Link onClick={handleLogout} className="px-3">
                        <FaSignInAlt className="me-2" />
                        Logout
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;

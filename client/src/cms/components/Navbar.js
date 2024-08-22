import React from "react";
import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

import logo from "../../assets/image/logo.png";

function Navbar() {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate("/cms/login");
    };

    // get the username
    const { auth } = useAuth();
    const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
    const username = decoded?.UserInfo?.username || "";

    return (
        <nav className="nav">
            <div>
                <Link to="/">
                    <img src={logo} className="logo" />
                </Link>
                <h3>{username}</h3>
            </div>
            <ul>
                <li className="active">
                    <Link to="/cms/">Home</Link>
                </li>
                <li>
                    <Link to="/cms/register">Add User</Link>
                </li>
                <li>
                    <Link to="/cms/editor">Editors Page</Link>
                </li>
                <li>
                    <Link to="/cms/lounge"> Lounge </Link>
                </li>
                <li>
                    <Link to="/cms/admin">Admin Page</Link>
                </li>
                <li>
                    <a onClick={signOut}>Sign Out</a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;

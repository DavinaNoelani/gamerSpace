import React from "react";
import { Link } from 'react-router-dom';

const SideNav = () => {


    return (
        <>
            <div className="sidenav-container">
                <div id="sidenav">
                    <Link to="/admin" id="about" className="linkTo">Admin</Link>
                    <Link to="/blog" id="blog" className="linkTo">Blog</Link>
                    <Link to="/tips" id="tips" className="linkTo">FAQs</Link>
                    <Link to="/contact" id="contact" className="linkTo">&#9993;</Link>
                </div>
            </div>
        </>
    )
}

export default SideNav
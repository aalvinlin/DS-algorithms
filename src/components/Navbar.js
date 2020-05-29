import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {

    return (
        <nav>
            <NavLink to="/home">Learn</NavLink>
            <NavLink to="/try">Try</NavLink>
            <NavLink to="/investigate">Investigate</NavLink>
        </nav>
    )

}

export default Navbar;
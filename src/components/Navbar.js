import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {

    return (
        <nav>
            <NavLink to="/dbscan/learn">Learn</NavLink>
            <NavLink to="/dbscan/try">Try</NavLink>
            <NavLink to="/dbscan/investigate">Investigate</NavLink>
        </nav>
    )

}

export default Navbar;
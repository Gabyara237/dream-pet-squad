import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <div className="navbar-container">
            <ul className="nav-links">
                <li className="menu-item"><Link className="menu-link" to="/">Home</Link></li>
                <li className="menu-item"><Link className="menu-link" to="/">Create a Pet</Link></li>
                <li className="menu-item"><Link className="menu-link" to="/">Summary</Link></li>
            </ul>
        </div>
    )
};

export default Nav;
import { Outlet } from "react-router-dom";
import Header from "./Header"
import Nav  from "./Nav" 


const Layout = () =>{

    return (
        <div className="container">
            <div className="left">
                <div className="nav-container">
                    <div className="header"><Header/></div>
                    <div className="nav-bar"><Nav/></div>
                </div>
            </div>
            <div className="right">
                <Outlet/>
            </div>
        </div>

    )
};

export default Layout;
import Logo from '../assets/Logo.png';


const Header=() =>{
    return(
        <header className='header'>
            <img src={Logo} alt="Logo" className='logo'/>
            <h1 className='name-web'>Dream Pet Squad</h1>    
            
        </header>
    )
};

export default Header;
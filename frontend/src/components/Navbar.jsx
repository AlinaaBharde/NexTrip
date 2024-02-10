import { Avatar, Dropdown, Navbar as FlowbiteNavbar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import Logo from '../images/newlogo.png';
import '../styles/colorgradient.css';
import Headroom from 'react-headroom';
import srcimg from '../images/avatar.jpg';

function NavbarComponent() {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleLogout = () => {
        logout();
    };

    return (
        <div>
            <Headroom disable>
                <FlowbiteNavbar fluid rounded className='fixed top-0 left-0 w-full z-50 h-20 pt-1 bg-transparent' style={{ minWidth: '350px' }}>                    
                        <FlowbiteNavbar.Brand href="/">
                            <Link to={'/'}>
                                <img src={Logo} className="mr-0 ml-12 mt-0 h-16 lg:h-20 w-auto " alt="Logo" style={{ 'backgroundColor': 'transparent' }} />
                            </Link>
                        </FlowbiteNavbar.Brand>
                    <div className="flex flex-col mr-6  md:h-12 sm:mr-10">
                        {user ? (
                            <Dropdown
                                arrowIcon={false}
                                inline
                                label={<Avatar img={srcimg} rounded style={{ 'color': '#5F2EEA' }} />}
                                className='border-none'
                            >
                                <Dropdown.Header>
                                    <span className="block text-sm">{user.username}</span>
                                    <span className="block truncate text-sm font-medium">{user.email}</span>
                                </Dropdown.Header>
                                <Dropdown.Item as={Link} to='/yourPlans'>Your Plans</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
                            </Dropdown>
                        ) : (
                            <button className='bg-[#143d8e] text-black border-none text-center align-middle hover:bg-[#137dc7] hover:text-white'>
                                <Link to='/signup' style={{ 'font': 'poppins' }} className='text-white hover:text-black'>SignUp</Link>
                                <FlowbiteNavbar.Toggle className='hidden'/>
                            </button>
                        )}
                    </div>
                </FlowbiteNavbar>
            </Headroom>
        </div>
    );
}

export default NavbarComponent;

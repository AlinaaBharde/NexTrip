import { Avatar, Dropdown, Navbar as FlowbiteNavbar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import Logo from '../images/travelLogo.png';
import '../styles/colorgradient.css';

function NavbarComponent() {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleLogout = () => {
        logout();
    };

    return (
        <div>
            <FlowbiteNavbar fluid rounded className='fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50 h-20 pt-4 shadow-sm  bg-gradient-to-bl from-cyan-100 via-white to-gray-300 background-animate' style={{ minWidth: '350px' }}>
                <FlowbiteNavbar.Brand href="/">
                    <img src={Logo} className="mr-4 ml-6 mt-0 h-12 lg:h-15 " alt="Logo" style={{'backgroundColor': 'transparent'}}/>
                    <Link to={'/'} className="self-center whitespace-nowrap text-7xl font-bold mt-0" style={{ 'color': '#5F2EEA', 'font': 'poppins' }}>Trip Planner</Link>
                </FlowbiteNavbar.Brand>
                <div className="flex md:order-2 mr-10 ">
                    {user ? (
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={<Avatar rounded style={{ 'color': '#5F2EEA' }} />}
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
                        <>
                            <FlowbiteNavbar.Link href='/signup' style={{ 'font': 'poppins' }}>Login</FlowbiteNavbar.Link>
                            <FlowbiteNavbar.Toggle />
                        </>
                    )}
                </div>
            </FlowbiteNavbar>
        </div>
    );
}

export default NavbarComponent;



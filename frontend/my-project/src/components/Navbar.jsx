import { Navbar as FlowbiteNavbar } from 'flowbite-react';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleLogout = () => {
        logout();
    };

    return (
        <FlowbiteNavbar fluid rounded>
            <FlowbiteNavbar.Brand href="/">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Trip Planner
                </span>
            </FlowbiteNavbar.Brand>
            <FlowbiteNavbar.Toggle />
            <FlowbiteNavbar.Collapse>
                <FlowbiteNavbar.Link active={true} href="/">
                    Home
                </FlowbiteNavbar.Link>
                {user ? (
                    <div className="flex items-center space-x-4">
                        <span>{user.email}</span>
                        <button onClick={handleLogout}>Log out</button>
                    </div>
                ) : (
                    <div className="flex items-center space-x-4">
                        <a href="/login">Login</a>
                        <a href="/signup">Signup</a>
                    </div>
                )}
            </FlowbiteNavbar.Collapse>
        </FlowbiteNavbar>
    );
};

export default Navbar;



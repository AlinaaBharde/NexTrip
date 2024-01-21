import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import Logo from '../images/travelLogo.jpg';
import userContext from '../contexts/userContext';
import React from 'react';
import { Link } from 'react-router-dom';

function NavbarComponent() {
  const { isuserAuthenticated, username, email } = React.useContext(userContext);

  // const navbarStyle = {
  //   // position: 'fixed',
  //   top: 0,
  //   left: 0,
  //   width: '100%',
  //   zIndex: 1000, // Adjust the value as needed
  // };

  return (
    <div  >
      <Navbar fluid rounded className='  top-0 left-0 w-full bg-white border-b border-gray-200 z-50 h-20 pt-4 shadow-sm  ' style={{minWidth: '350px'}}>
        <Navbar.Brand>
          <img src={Logo} className="mr-4 ml-6 mt-0 h-12 lg:h-15" alt="Logo"  />
          <Link to={'/'} className="self-center whitespace-nowrap text-7xl font-bold mt-0" style={{ 'color': '#5F2EEA', 'font': 'poppins' }}>Trip Planner</Link>
        </Navbar.Brand>
        <div className="flex md:order-2 mr-10 ">
          {isuserAuthenticated ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar rounded style={{'color': '#5F2EEA'}} />}
            >
              <Dropdown.Header>
                <span className="block text-sm">{username}</span>
                <span className="block truncate text-sm font-medium">{email}</span>
              </Dropdown.Header>
              <Dropdown.Item href='/yourPlans'>Your Plans</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <>
              <Navbar.Link href='signup' style={{ 'font': 'poppins' }}>Login/Signup</Navbar.Link>
              <Navbar.Toggle />
            </>
          )}
        </div>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
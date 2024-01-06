import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { FaPlaneDeparture } from "react-icons/fa6";


function navbar() {

  return (
    <div ><Navbar fluid rounded  className='fixed top-0 left-0 w-full bg-white border-b border-gray-200  z-50 h-20 pt-4'  >
      <Navbar.Brand >
        <FaPlaneDeparture className="mr-4 ml-6 h-8 lg:h-15" alt="Logo" />
        <span className="self-center whitespace-nowrap text-7xl font-bold " style={{'color': '#5F2EEA', 'font': 'poppins'}}>Trip Planner</span>
      </Navbar.Brand>
      <div className="flex md:order-2 mr-10">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Varun Sriram</span>
            <span className="block truncate text-sm font-medium">name@mail.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Your Plans</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className='ms-auto mr-10'>
        <Navbar.Link href="#" style={{'font': 'poppins'}} >
          Home
        </Navbar.Link>
        <Navbar.Link href="#" style={{'font': 'poppins'}} >Login/Signup</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
}

export default navbar;
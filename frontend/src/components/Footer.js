import { Footer } from 'flowbite-react';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';
import { FooterDivider } from 'flowbite-react';
import Logo from '../images/travelLogo.jpg';

export default function footer() {
    const Year = new Date().getFullYear();

  return (
    <Footer container className=' pt-0 pl-6 pr-6 pb-6 drop-shadow-lg border' style={{
      backgroundColor: 'white'
    }}>
      <div className="w-full mt-0">
        <FooterDivider />
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className='font-bold text-xl' style={{color: '#5F2EEA' , font:'poppins'}}>
            <img src={Logo} className='mr-4 ml-4 h-12 lg:h-15' name='Trip Planner' style={{color: 'black'}} alt='logo'/>Trip Planner
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6" >
            <div >
              <Footer.Title title="about" style={{'color': '#5F2EEA'}}/>
              <Footer.LinkGroup col>
                <Footer.Link href="#">Trip Planner</Footer.Link>
                <Footer.Link href="#">Tailwind CSS</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" style={{'color': '#5F2EEA'}}/>
              <Footer.LinkGroup col>
                <Footer.Link href="#">Github</Footer.Link>
                <Footer.Link href="#">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" style={{'color': '#5F2EEA'}}/>
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="Trip Planner™" year={Year} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
}

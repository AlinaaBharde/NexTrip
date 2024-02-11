import { Footer } from 'flowbite-react';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';
import { FooterDivider } from 'flowbite-react';
import Logo from '../images/travelLogo.png';

export default function footer() {
  const Year = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5]">
      <div className='flex-grow bg-[#f5f5f5]' />
      <Footer container className='pt-4 pl-6 pb-6 pr-6 z-20 drop-shadow-lg border w-full bottom-0' style={{
        backgroundColor: 'white'
      }}>
        <div className="w-full mt-0">

          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div className='font-bold text-xl' style={{ color: '#5F2EEA', font: 'poppins' }}>
              <img src={Logo} className='mr-4 ml-4 h-12 lg:h-15' name='Trip Planner' style={{ color: 'black' }} alt='logo' />NexTrip
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6" >
              <div >
                <Footer.Title title="about" style={{ 'color': '#5F2EEA' }} />
                <Footer.LinkGroup col>
                  <Footer.Link href="#">NexTrip</Footer.Link>
                  <Footer.Link href="#">Tailwind CSS</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Follow us" style={{ 'color': '#5F2EEA' }} />
                <Footer.LinkGroup col>
                  <Footer.Link href="#">Github</Footer.Link>
                  <Footer.Link href="#">Discord</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Legal" style={{ 'color': '#5F2EEA' }} />
                <Footer.LinkGroup col>
                  <Footer.Link href="#">Privacy Policy</Footer.Link>
                  <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <FooterDivider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright href="#" by="Neural Nexus™" year={Year} />
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
    </div>

  );
}

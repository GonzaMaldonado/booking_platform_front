import { Link } from 'react-router-dom'
import Home from '../assets/home.png'
import Booking from '../assets/booking.png'
import Login from '../assets/login.png'
import Register from '../assets/register.png'

// eslint-disable-next-line react/prop-types
function SideBar({visible, toggleSidebar}) {

  return (
    <nav className='fixed top-0 left-0 h-screen'>

      <div className='flex flex-col fixed top-0 left-0 z-40 pt-5 pl-9' onClick={toggleSidebar}>
          <div className='h-1 w-8 mb-1 bg-white'></div>
          <div className='h-1 w-8 mb-1 bg-white'></div>
          <div className='h-1 w-8 mb-1 bg-white'></div>
      </div>
      <div className='bg-white rounded-full flex flex-col fixed top-16 left-8 pt-10 pl-10' onClick={null}>
        <img src="#" alt="" />
      </div>

      <ul className={`transition-width duration-1000 flex flex-col font-bold h-screen fixed pt-20 pl-2 justify-center`}>
        <li className="m-1 p-5">
          <Link to={'/'}>
            <img src={Home} alt="Home" className={`${visible && 'inline'} w-10`} />
            <div className={`${visible ? 'inline' : 'hidden'} text-white hover:text-salmon w-full sm:w-32 m-1`}>Inicio</div>
          </Link>
        </li>
        <li className="m-1 p-5">
          <Link to={'#'}>
            <img src={Booking} alt="Booking" className={`${visible && 'inline'} w-9`} />
            <div className={`${visible ? 'inline' : 'hidden'} text-white hover:text-salmon w-full sm:w-32 m-1`}>Reservas</div>
          </Link>
        </li>
        <li className="m-1 p-5">
          <Link to={'#'}>
            <img src={Login} alt="Login" className={`${visible && 'inline'} w-9`} />
            <div className={`${visible ? 'inline' : 'hidden'} text-white hover:text-salmon w-full sm:w-32 m-1`}>Login</div>
          </Link>
        </li>
        <li className="m-1 p-5">
          <Link to={'#'}>
            <img src={Register} alt="Register" className={`${visible && 'inline'} w-9`} />
            <div className={`${visible ? 'inline' : 'hidden'} text-white hover:text-salmon w-full sm:w-32 m-1`}>Register</div>
          </Link>
        </li>
      </ul>
    </nav>
  );

}


export default SideBar;
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import { jwtDecode } from 'jwt-decode'
import Home from '../assets/home.png'
import Booking from '../assets/booking.png'
import Login from '../assets/login.png'
import Register from '../assets/register.png'
import Logout from '../assets/logout.png'
import User from '../assets/user.png'

const baseURL = import.meta.env.VITE_BACKEND_URL

// eslint-disable-next-line react/prop-types
function SideBar({visible, toggleSidebar}) {
  
  const token = useAuthStore.getState().access;
  const { isAuth } = useAuthStore()

  let user_id
  let isAdmin
  let photo
  //let role

  if(isAuth) {
    const tokenDecoded = jwtDecode(token)
    user_id = tokenDecoded.user_id
    isAdmin = tokenDecoded.is_staff
    photo = tokenDecoded.photo
    //role = tokenDecoded.role
  }

  
  function logOutFun() {
    useAuthStore.getState().logout()
  }

  return (
    <nav className='fixed top-0 left-0 h-screen'>

      <div className='flex flex-col fixed top-7 left-9 z-40' onClick={toggleSidebar}>
          <div className='h-1 w-8 mb-1 bg-white'></div>
          <div className='h-1 w-8 mb-1 bg-white'></div>
          <div className='h-1 w-8 mb-1 bg-white'></div>
      </div>
      {isAuth && (
        <Link to={`profile/${user_id}`} className={`${visible ? 'top-4 left-24' : 'top-20 left-7'} bg-bordo rounded-full fixed transition-all duration-1000`}>
          {photo == undefined || photo == null || photo == '' ? (
            <img
              className="h-12 w-12 rounded-full"
              src={User}
              alt={`Foto de usuario`}
            />
            ) : (
              <img
                className="h-12 w-12 rounded-full"
                src={`${baseURL}${photo}`}
                alt={`Foto de usuario`}
              />
            )}
        </Link>
      )}


      <ul className={`transition-width duration-1000 flex flex-col font-bold h-screen fixed pt-20 pl-2 justify-center`}>
        <li className="m-1 p-5">
          <Link to={'/'}>
            <img src={Home} alt="Home" className='inline w-10' />
            <strong className={`${!visible && 'hidden'} text-white hover:text-salmon ml-3`}>Home</strong>
          </Link>
        </li>
        <li className="m-1 p-5">
          <Link to={'#'}>
            <img src={Booking} alt="Booking" className='inline w-9' />
            <strong className={`${!visible && 'hidden'} text-white hover:text-salmon ml-3`}>Bookings</strong>
          </Link>
        </li>
        {isAdmin && (
          <li className="m-1 p-5">
            <Link to={'offerer/'}>
              <img src={Booking} alt="Offerer" className='inline w-9' />
              <strong className={`${!visible && 'hidden'} text-white hover:text-salmon ml-3`}>Offerer</strong>
            </Link>
          </li>
        )}
        {isAdmin && (
          <li className="m-1 p-5">
            <Link to={`${baseURL}/admin/`}>
              <img src={Booking} alt="Admin" className='inline w-9' />
              <strong className={`${!visible && 'hidden'} text-white hover:text-salmon ml-3`}>Admin</strong>
            </Link>
          </li>
        )}
        {isAuth ? (
          <li className="m-1 p-5">
            <Link to={'/'}>
              <img src={Logout} alt="Logout" className='inline w-8' onClick={logOutFun} />
              <span onClick={logOutFun} className={`${!visible && 'hidden'} text-white hover:text-salmon ml-3`}>
                Sign out
              </span>
            </Link>
          </li>
        ) : (
          <>
          <li className="m-1 p-5">
            <Link to={'/login'}>
              <img src={Login} alt="Login" className='inline w-9' />
              <strong className={`${!visible && 'hidden'} text-white hover:text-salmon ml-3`}>Login</strong>
            </Link>
          </li>
          <li className="m-1 p-5">
            <Link to={'/register'}>
              <img src={Register} alt="Register" className='inline w-9' />
              <strong className={`${!visible && 'hidden'} text-white hover:text-salmon ml-3`}>Register</strong>
            </Link>
          </li>
          </>
        )}
        
      </ul>
    </nav>
  );

}


export default SideBar;
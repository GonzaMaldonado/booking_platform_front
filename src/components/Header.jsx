import { useState } from "react"

const Header = () => {

  const [visible, setVisible] = useState(true)

  return (
    <nav className="absolute z-20 w-full">

      <div className={`flex flex-col fixed top-0 left-0 z-40 p-5`} onClick={() => setVisible(!visible)}>
        <div className={`${visible && ''} h-1 w-8 mb-1 bg-white transition duration-500`}></div>
        <div className={`${visible && ''} h-1 w-8 mb-1 bg-white transition duration-500`}></div>
        <div className={`h-1 w-8 mb-1 bg-white transition duration-500`}></div>

       
      </div>

      <div className="flex relative">
        <ul className={`${visible ? 'w-full sm:w-48' : 'w-0'} transition-width duration-500 flex flex-col font-bold h-screen fixed pt-20 left-0 bg-half-transparent justify-center items-center`}>
          <li className={`${visible ? 'flex' : 'hidden'} text-white hover:text-salmon w-full sm:w-32 m-1 p-5 justify-center`}>Inicio</li>
          <li className={`${visible ? 'flex' : 'hidden'} text-white hover:text-salmon w-full sm:w-32 m-1 p-5 justify-center`}>Reservas</li>
          <li className={`${visible ? 'flex' : 'hidden'} text-white hover:text-salmon w-full sm:w-32 m-1 p-5 justify-center`}>Login</li>
          <li className={`${visible ? 'flex' : 'hidden'} text-white hover:text-salmon w-full sm:w-32 m-1 p-5 justify-center`}>Register</li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
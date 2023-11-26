import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { loginReq } from "../api/users"
import { Link, useNavigate, Navigate } from "react-router-dom"
import { toast } from 'react-hot-toast'
import Logo from '../assets/booking.png'
import Loader from "../components/Loader"
//import { useAuthStore } from "../store/auth";


const Login = () => {

  const navigate = useNavigate()
  //const { isAuth } = useAuthStore();
  //const setToken = useAuthStore((state) => state.setToken);

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  
  const loginMutation = useMutation({
    mutationFn:() => loginReq(username, password),
    onSuccess:(res) => {
      //setToken(res.data.access, res.data.refresh);
      toast.success("Login successfully");
      navigate("/")
    },
    onError: (error) => {
      toast.error("There was an error, please try to login again")
      console.log(error);
    }
  }) 
  
  const handleSubmit = (event) => {
    event.preventDefault()
    loginMutation.mutate();
  }

  if (loginMutation.isLoading) return <Loader />
  //if (isAuth) return (<Navigate to="/" />)

  return (
    <div className="flex min-h-full items-center justify-center py-2 px-3 sm:px-6 lg:px-8">
      <div className='p-2'>
        <div className="w-[300px] max-w-md space-y-2 md:w-[400px] lg:w-[400px]">
            <img className="mx-auto text-sky-600 h-20 w-20 rounded-full" src={Logo} alt="logo"/>
            <h2 className="text-center text-3xl lg:text-4xl text-grey font-bold"> Login </h2>
          {loginMutation.error && <div> <p className="font-bold text-red-700" > {loginMutation.error.response.data.detail} </p> </div> 
          }
          <form className="p-3 space-y-2 md:space-y-4" onSubmit={handleSubmit}>

              <label htmlFor="username" className="block text-sm lg:text-base font-medium text-gray-900 dark:text-white">UserName</label>
              <input type="username" name="username" id="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your username"/>

              <label htmlFor="password" className="block text-sm lg:text-base font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password" name="password" id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>

              <button type='submit' className="bg-bordo w-full hover:bg-red-950 p-2 rounded-full text-white font-bold">
                  Login
              </button>
          </form>

          <div className="flex items-center justify-between text-sm lg:ml-5">
              <Link to={'/register'}>
                Don`t have an account?
                <span className='hover:text-rojo-claro ml-2 transition-colors'>
                  Sign up here!
                </span>
              </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
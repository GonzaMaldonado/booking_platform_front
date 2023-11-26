import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { registerReq } from "../api/users"
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-hot-toast'
import Logo from '../assets/register.png'
import Loader from "../components/Loader"

const Register = () => {
  
  const navigate = useNavigate()

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  });
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };


  const registerMutation = useMutation({
    mutationFn:() => registerReq(values.username, values.email, values.password, values.confirm_password),
    onSuccess:() => {
      navigate("/")
    },
    onError: (error) => {
      if (typeof error === 'string') {
        toast.error(error);
      } else {
        toast.error('An error occurred');
      }
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    if (values.password !== values.confirm_password) {
      return toast.error('Passwords does not match')
    } else {
      registerMutation.mutate()
    }
  }

  if (registerMutation.isLoading) return <Loader />

  return (
  <div className="flex min-h-full items-center justify-center py-2 px-3 sm:px-6 lg:px-8">
    <div className="w-[300px] max-w-md md:w-[400px] lg:w-[400px]">
      <img className="mx-auto text-red-claro h-20 w-20 rounded-full" src={Logo} alt="logo"/>
      <h2 className="text-center text-3xl lg:text-4xl text-grey font-bold"> Register </h2>
      {registerMutation.error && <div> <p className="font-bold text-red-700 p-2" > {registerMutation.error.response.data.message} </p> </div> }
      <form className="p-3 space-y-2 md:space-y-2" onSubmit={handleSubmit}>

          <label htmlFor="username" className="block text-sm lg:text-base font-medium text-gray-900 dark:text-white">UserName</label>
          <input type="text" name="username" id="username" 
            value={values.username}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your username"/>
          {registerMutation.error && <div> <p className="font-bold text-red-700" > {registerMutation.error.response.data.error?.username} </p> </div> }

          <label htmlFor="email" className="block text-sm lg:text-base font-medium text-gray-900 dark:text-white">Email</label>
          <input type="email" name="email" id="email" 
            value={values.email}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50" placeholder="your email"/>
          {registerMutation.error && <div><p className="font-bold text-red-700" >{registerMutation.error.response.data.error?.email}</p></div>}

          <label htmlFor="password" className="block text-sm lg:text-base font-medium text-gray-900 dark:text-white">Password</label>
          <input type="password" name="password" id="password" 
            value={values.password}
            onChange={handleChange}
            required
            placeholder="••••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          {registerMutation.error && <div> <p className="font-bold text-red-700" > {registerMutation.error.response.data.error?.password} </p> </div> }

          <label htmlFor="confirm_password" className="block text-sm lg:text-base font-medium text-gray-900 dark:text-white">Confirm Password</label>
          <input type="password" name="confirm_password" id="confirm_password" 
            value={values.confirm_password}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••••"/>
            {registerMutation.error && <div> <p className="font-bold text-red-700" > {registerMutation.error.response.data.error?.confirm_password} </p> </div> }

        <button type='submit' className="bg-bordo my-2 w-full hover:bg-red-950 p-2 px-5 rounded-full text-white font-bold">
          Register
        </button>
      </form>

      <div className="flex items-center justify-between text-sm lg:ml-5">
          <Link to={'/login'}>
            Have an account?
            <span className='hover:text-rojo-claro ml-2 transition-colors'>
              Sign in here!
            </span>
          </Link>
      </div>

    </div>
</div>
)}

export default Register